# Implementation Plan: Verdant Café Website Recreation

**Branch**: `001-recreate-this-website` | **Date**: 2025-09-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/Users/jsaenz/cafegreen/specs/001-recreate-this-website/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Recreate a luxury coffee shop website (Verdant Café) with elegant design, comprehensive menu display, and smooth user experience. Frontend is already production-ready, requiring assessment and potential fixes including a broken filter in the menu section. Tech stack: HTML/CSS/JS only, keeping implementation simple while maintaining professional quality.

## Technical Context
**Language/Version**: HTML5, CSS3, ES6+ JavaScript
**Primary Dependencies**: None (vanilla tech stack)
**Storage**: Static files, no database required
**Testing**: Manual browser testing, basic DOM validation
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: single (frontend-only static website)
**Performance Goals**: <3s load time, 60fps animations, mobile-optimized
**Constraints**: Simple tech stack only, no frameworks, production-ready quality
**Scale/Scope**: Single-page website with menu filtering, responsive design

**Additional Context**: Frontend already production-ready. Need to assess current state and fix broken filter in menu section.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (single static website)
- Using framework directly? YES (vanilla HTML/CSS/JS)
- Single data model? YES (static content in HTML)
- Avoiding patterns? YES (no complex patterns needed for static site)

**Architecture**:
- EVERY feature as library? N/A (static website, no libraries needed)
- Libraries listed: None (vanilla implementation)
- CLI per library: N/A (no libraries)
- Library docs: N/A (no libraries)

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Manual testing approach for static site
- Git commits show tests before implementation? Manual browser testing
- Order: Contract→Integration→E2E→Unit strictly followed? Manual validation
- Real dependencies used? N/A (static files only)
- Integration tests for: N/A (no integrations)
- FORBIDDEN: Implementation before test, skipping RED phase - Manual testing approach

**Observability**:
- Structured logging included? Console logging for JS errors
- Frontend logs → backend? N/A (no backend)
- Error context sufficient? Browser developer tools

**Versioning**:
- Version number assigned? 1.0.0
- BUILD increments on every change? Manual versioning
- Breaking changes handled? Manual testing validation

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Static website structure (files in root directory)

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/bash/update-agent-context.sh claude` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate minimal task list for single CSS fix + validation
- Primary task: Add `.hidden` CSS rule to fix menu filtering
- Secondary tasks: Browser/device validation testing
- Documentation tasks: Update status in contracts

**Specific Tasks Planned**:
1. **CSS Fix Task**: Add `.hidden { display: none !important; }` to styles.css
2. **Menu Filter Validation**: Test all filter categories work correctly
3. **Cross-Browser Testing**: Validate on Chrome, Firefox, Safari, Edge
4. **Mobile Testing**: Validate responsive behavior maintained
5. **Performance Check**: Ensure fix doesn't impact load times
6. **Documentation Update**: Mark menu filtering as complete in contracts

**Ordering Strategy**:
- Fix first (CSS rule addition)
- Validate functionality (filter testing)
- Cross-platform testing
- Documentation updates

**Estimated Output**: 6-8 focused tasks in tasks.md (not 25-30 due to minimal scope)

**Context**: Frontend is production-ready except for one missing CSS rule. Task list will be focused and minimal rather than comprehensive development tasks.

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none - simple static site)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*