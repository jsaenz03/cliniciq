# Free Accreditation Checklist (source)

Print-ready A4 checklist aligned to the RACGP Standards for General Practices
6th edition, served from the downloads page at
`/downloads/checklists/Free_Accreditation_Checklist.pdf`.

Build (headless Chrome, same pipeline as the acred-agent forms pack):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=../../downloads/checklists/Free_Accreditation_Checklist.pdf \
  checklist.html
```

- `shared.css` holds the navy/green palette, table/checkbox styling and the
  Lexend / Source Sans 3 fonts (copied from
  `~/acred-agent/gp-accreditation-guide/assets/fonts/`).
- Edition facts (surveys currently against the 5th edition; 6th edition
  released 26/08/2026; ACSQHC transition TBA) verified against
  racgp.org.au / safetyandquality.gov.au / agpal.com.au on 07/10/2026.
  Re-verify before content edits.
