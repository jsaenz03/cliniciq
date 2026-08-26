#!/usr/bin/env python3
"""Generate all ClinicIQ policy PDFs (RACGP 6th edition).

Usage:
    python3 scripts/generate_policies.py

Outputs all PDFs to downloads/templates/. Each policy is authored in its own
module under scripts/policies/p_*.py and rendered via scripts/policies/renderer.py
using reportlab (Helvetica, A4, 24/18/12pt hierarchy matching the original
WeasyPrint output, plus a 6th-edition Version Control footer block).

Run from the project root.
"""

from __future__ import annotations

import os
import sys

# Make the policies package importable regardless of CWD.
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)            # so `import policies.renderer` works
sys.path.insert(0, os.path.join(HERE, "policies"))  # so `import renderer` works

import renderer  # noqa: E402

# All policy modules in display order (matches downloads.html layout).
POLICY_MODULES = [
    # --- Clinical / medications / infection ---
    "p_infection_control",
    "p_cold_chain",
    "p_medication_management",
    "p_safe_quality_medicines",
    "p_chronic_disease",
    "p_preventive_health",
    # --- Governance / quality / risk ---
    "p_clinical_risk",
    "p_complaints",
    "p_pipqi",
    "p_incident_reporting",
    # --- Information / digital ---
    "p_privacy",
    "p_it_security",
    "p_digital_health_records",       # new for 6th ed
    "p_ai_governance",                # new for 6th ed
    "p_patient_demographics",         # new for 6th ed
    # --- People / access / continuity ---
    "p_clear_roles",
    "p_staff_induction",
    "p_staff_training_emergency",
    "p_staff_training_equipment",
    "p_emergency_response",
    "p_equipment_maintenance",
    "p_after_hours",
    "p_appointments",
    # --- Sustainability (new for 6th ed) ---
    "p_environmental_sustainability",
]


def main() -> int:
    project_root = os.path.dirname(HERE)
    out_dir = os.path.join(project_root, "downloads", "templates")
    print(f"Output directory: {out_dir}")

    # Import each module and render. The renderer reads TITLE/FILENAME/SECTIONS/OWNER
    # from the module-level scope.
    import importlib

    ok = 0
    failures = []
    with renderer.batch() as page:
        for mod_name in POLICY_MODULES:
            mod = importlib.import_module(mod_name)
            title = mod.TITLE
            filename = mod.FILENAME
            owner = getattr(mod, "OWNER", "Practice Manager")
            renderer.build_section_list(mod.SECTIONS)
            try:
                path = renderer.render_policy(title, filename, out_dir, owner=owner, page=page)
                size = os.path.getsize(path)
                print(f"  OK   {filename}.pdf ({size // 1024} KB)")
                ok += 1
            except Exception as exc:  # noqa: BLE001
                failures.append((filename, str(exc)))
                print(f"  FAIL {filename}: {exc}")

    print(f"\nRendered {ok}/{len(POLICY_MODULES)} policies.")
    if failures:
        print("Failures:")
        for name, err in failures:
            print(f"  - {name}: {err}")
        return 1

    # --- Self-verification (completeness audit) ---
    print("\n--- Self-verification ---")
    try:
        import fitz  # PyMuPDF
    except ImportError:
        print("PyMuPDF (fitz) not available; skipping content checks. Install with: pip install pymupdf")
        return 0

    required = {mod.FILENAME for mod in (importlib.import_module(m) for m in POLICY_MODULES)}
    existing = {f[:-4] for f in os.listdir(out_dir) if f.endswith(".pdf")}
    missing = required - existing
    extra = existing - required
    if missing:
        print(f"  MISSING PDFs: {sorted(missing)}")
    if extra:
        print(f"  (note: extra PDFs already present in output dir: {sorted(extra)})")

    bad = []
    for name in sorted(required):
        path = os.path.join(out_dir, f"{name}.pdf")
        doc = fitz.open(path)
        text = "".join(pg.get_text() for pg in doc)
        checks = {
            "6th edition": "6th edition" in text,
            "effective date": renderer.EFFECTIVE_DATE in text,
            "version block": "Version Control" in text,
            "no leaked markup": "<b>" not in text and "<i>" not in text,
            "no 5th ed leftover": "5th edition" not in text,
            "no literal 'bullet'": "\nbullet\n" not in text and not text.startswith("bullet\n"),
            "no draft language": not any(
                phrase in text
                for phrase in (
                    "draft for consultation",
                    "in development",
                    "anticipated under",
                    "Standard 1 —",
                    "Standard 2 —",
                    "Standard 3 —",
                    "Standard 4 —",
                    "draft 6th",
                )
            ),
        }
        # Orphan-heading check: no page's last text line should be a numbered
        # section heading (e.g. "12. Education and Training" stranded at bottom).
        for pg in doc:
            blocks = [b for b in pg.get_text("dict")["blocks"] if "lines" in b]
            if not blocks:
                continue
            last_spans = blocks[-1]["lines"][-1]["spans"]
            last_text = last_spans[-1]["text"].strip() if last_spans else ""
            is_heading_like = (
                len(last_text) > 2
                and last_text[0].isdigit()
                and "." in last_text[:4]
                and last_spans[-1]["font"].lower().endswith("bold")
            )
            if is_heading_like:
                checks["no orphan heading"] = False
                break
        failed = [k for k, v in checks.items() if not v]
        if failed:
            bad.append((name, failed))
    if bad:
        print("  Content check failures:")
        for name, failed in bad:
            print(f"    - {name}: {failed}")
        return 1
    print(f"  All {len(required)} PDFs pass: cite 6th edition, dated {renderer.EFFECTIVE_DATE}, "
          f"have Version Control block, no leaked markup, no literal 'bullet', "
          f"no orphan headings, no '5th edition' leftovers, no draft language.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
