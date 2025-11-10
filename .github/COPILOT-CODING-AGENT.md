# Copilot Coding Agent Onboarding — jobs4all

This file is a lightweight, human-maintained onboarding guide for the Copilot coding agent and other automated coding assistants. It documents what the agent should do, where to look, how to run and test the project, and safe limits for automated changes.

## Purpose
- Help the Copilot coding agent quickly understand and contribute to this repository.
- Provide clear run, test, and file-location instructions so automated changes are small, safe, and verifiable.

## Quick repository summary
- Project name: jobs4all
- Current README is minimal. The repository does not include explicit language/build metadata in the README; the agent should detect the language/tools by looking for common files (package.json, pyproject.toml, requirements.txt, Pipfile, setup.py, go.mod, Cargo.toml, Gemfile).

## Contract (what the agent should aim for)
- Inputs: repository files and this onboarding guide.
- Outputs: small, focused commits/patches that implement clear tasks (feature, bugfix, tests, docs), with passing local tests where possible.
- Error modes: missing build/test commands, failing tests, ambiguous requirements—stop and raise a question for a maintainer.
- Success criteria: changes include tests (where applicable), build and/or test run locally without regressions, PR description describes changes and verification steps.

## First checks the agent MUST perform
1. Detect language and package manager by checking for these files (stop at the first match):
   - `package.json` (Node/JS/TS)
   - `pyproject.toml`, `requirements.txt`, `setup.py`, `Pipfile` (Python)
   - `go.mod` (Go)
   - `Cargo.toml` (Rust)
   - `Gemfile` (Ruby)
   - `pom.xml` or `build.gradle` (Java)
2. If none are found, search for obvious entrypoints: `main.py`, `app.py`, `src/`, `server/`, `index.js`, `manage.py`.
3. Search for tests (`test`, `tests`) and CI files (`.github/workflows/`, `.gitlab-ci.yml`, `azure-pipelines.yml`).
4. Look for a `README.md` or `CONTRIBUTING.md` with run/test instructions. If absent, the agent should add proposed run/test commands here and ask for confirmation.

## Typical commands to try (agent should only run these locally inside the workspace and detect presence first)
- Node (if `package.json` exists):
  - Install: `npm ci` or `npm install`
  - Test: `npm test` or `npm run test`
- Python (if `pyproject.toml` / `requirements.txt`):
  - Create venv: `python -m venv .venv && source .venv/bin/activate`
  - Install: `pip install -r requirements.txt` or `pip install -e .` for editable installs
  - Test: `pytest -q`
- Go: `go test ./...`
- Rust: `cargo test`

If the agent cannot determine exact commands, it should not guess dangerous operations (like modifying CI/master branch) and should add a short note to this file asking the maintainers to provide the canonical commands.

## Testing and validation policy
- Always run the project's tests after making changes. If no tests exist, add tests for changed behavior.
- If tests are slow or require external services, stop and request instructions or a test harness that the agent can run locally (e.g., a fixture or mocked environment).

## Safe automation rules
- Keep changes small and focused (one logical change per PR).
- Avoid changes to CI workflows, security settings, or release pipelines without explicit human approval.
- Don't add or exfiltrate secrets. If credentials are required for tests, add mocks or skip tests instead.
- Create a draft PR and request a human reviewer; do not merge automatically.

## Files and locations of interest
- Source code: `src/`, `app/`, `server/`, or any top-level `*.py`, `*.js`, `*.ts` files.
- Tests: `tests/`, `test/`.
- CI: `.github/workflows/`.
- Docs: `README.md`, `docs/`, `CONTRIBUTING.md`.
- Package metadata: `package.json`, `pyproject.toml`, `setup.py`.

## Suggested PR template for the agent to populate
- Short description of the change.
- Files changed and rationale.
- How to run and test locally (commands used).
- Checklist: tests added, local tests passed, linting run (if applicable).

## Canonical Commands (Updated for jobs4all)

This is a **full-stack Node.js application** with React frontend and Express backend.

### Language/Stack Detection
- **Frontend**: React (detected by `client/package.json`)
- **Backend**: Node.js/Express (detected by `server/package.json`)
- **Database**: MongoDB (connection in `server/config/db.js`)

### Installation
The project has two separate `package.json` files (client and server):

**Backend (server):**
```bash
cd server
npm install
```

**Frontend (client):**
```bash
cd client
npm install
```

### Environment Setup
1. Copy `.env.example` to `.env` in the root directory
2. Update MongoDB URI and JWT secret in `.env`

### Running the Application

**Backend Server (Terminal 1):**
```bash
cd server
npm run dev  # Development mode with nodemon
# OR
npm start    # Production mode
```
The backend runs on `http://localhost:5000`

**Frontend (Terminal 2):**
```bash
cd client
npm start
```
The frontend runs on `http://localhost:3000`

### Database Seeding
To populate the database with sample data:
```bash
cd server
npm run seed
```

### Testing
Currently, no automated tests are configured. Manual testing via:
- Backend: Test API endpoints at `http://localhost:5000/api/*`
- Frontend: Test UI at `http://localhost:3000`

### Build Commands
**Frontend Production Build:**
```bash
cd client
npm run build
```

## Contact / Maintainers
- If `CODEOWNERS` or `MAINTAINERS` files exist, prefer contacting those addresses.
- If none exist, open an issue to request guidance before large or risky changes.

## Assumptions made for this repo onboarding
- The current `README.md` is very short; the language and tooling are unknown. The agent must detect tooling automatically and verify any commands before running them.

## Next steps for the agent (when asked to 'Onboard this repo')
1. Run detection steps listed above.
2. Populate the canonical commands section in this file if found from other files (e.g., `package.json` scripts or a `pyproject.toml`), but mark them as "inferred" and ask for confirmation.
3. Add a small smoke-test change with a passing test and open a draft PR for human review (only if configured to create PRs).

---

Thank you — this file is intended to be short and actionable. Maintain it alongside the README.
