# Spiritual Gifts Test Application

A web application designed to help members identify their spiritual gifts through a structured assessment.

## Tech Stack

- **Backend:** Python (Flask)
- **Frontend:** Vanilla JavaScript, HTML, Pico.css
- **Visualization:** Chart.js
## Testing

- **Backend:** Use `pytest` for scoring logic and API endpoints. Run via `export PYTHONPATH=. && venv/bin/pytest`.
- **Frontend/E2E:** Use Playwright for UI verification. 
- **Guidance:** Follow the `browser-automation-testing` skill for triangulating UI bugs using Network, Console, DOM, and Visual evidence.


## Architecture

The application is implemented as a Single-Page Application (SPA) to provide a seamless, interactive flow from the survey to the results.

## Project Structure

- `docs/`: Contains implementation plans and documentation.
    - `superpowers/specs/`: Design specifications.
    - `superpowers/plans/`: Implementation plans.
- `references/`: Contains the source materials for the spiritual gifts assessment.
    - `spiritual-gifts-list.md`: Definitions and descriptions of the spiritual gifts.
    - `spiritual-gifts-survey.md`: The 80-item survey and scoring instructions.
- `src/`: Source code for the application.
- `venv`: Python virtual environment to use.

## Key Resources

- [Design Document](docs/superpowers/specs/2026-05-07-spiritual-gifts-assessment-design.md)
- [Implementation Plan](docs/superpowers/plans/2026-05-08-spiritual-gifts-assessment.md)
- [Spiritual Gifts List](references/spiritual-gifts-list.md)
- [Spiritual Gifts Survey](references/spiritual-gifts-survey.md)

## Development Guidelines

- Prioritize simplicity and ease of use for church members.
- Maintain a seamless SPA experience with minimal page reloads.
- Use Pico.css for a clean, minimal aesthetic with low complexity.

## Deployment

- **Heroku**: The application is configured for Heroku deployment using `gunicorn` and a `Procfile`.
- **Entry Point**: Gunicorn invokes the app factory via `web: gunicorn src.app:create_app()`.

## Development Pitfalls

- **Worktree Isolation**: Remember that `git worktree` only clones tracked files. Untracked resources (e.g., `references/`, `venv/`) must be manually copied or referenced by absolute path from the main repository.
- **TDD Discipline**: Run tests after every task, not just at the end of a feature. This catches spec-test mismatches (e.g., payload structure) early.
- **Merge Verification**: Never rely on test results alone to verify a merge. Always check `git log` on the destination branch to confirm the feature commits are present.
- **Test Context**: When running tests after a merge or branch switch, verify the `rootdir` in the `pytest` output to ensure you are testing the intended target, not a cached worktree.
- **Worktree Cleanup**: Always `cd` to the main repository root before executing `git worktree remove` to avoid CWD-related deletion failures.
