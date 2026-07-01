# Branching Strategy

## Purpose

Define Git branching, naming, commits, and pull request workflow for the monorepo.

## Scope

All contributors and AI agents committing to this repository.

## Responsibilities

| Role | Responsibility |
|------|----------------|
| Contributors | Follow branch and commit conventions |
| Reviewers | Enforce PR quality and CI gates |
| CI | Deploy `main` to production (EC2 pipeline) |

---

## Git Flow

### Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready; deploys on push |
| `cursor/<description>-<id>` | Agent feature branches |
| `feature/<description>` | Human feature branches (optional) |
| `fix/<description>` | Bug fixes |

**Rules:**

- Never force-push to `main`
- Short-lived branches; merge within days when possible
- Rebase or merge from `main` frequently to reduce conflicts

### Agent branches

Cloud agents use:

```bash
git checkout -b cursor/<descriptive-name>-<suffix>
```

Example: `cursor/project-documentation-system-2ef0`

---

## Branch Naming

- Lowercase kebab-case
- Descriptive: `cursor/digital-twin-streaming-2ef0` not `cursor/fix-2ef0`
- Include ticket/issue ID when applicable: `feature/42-contact-form`

---

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) style:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Use |
|------|-----|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change without behavior change |
| `test` | Tests |
| `chore` | Tooling, deps |
| `ci` | CI/CD changes |

### Examples

```
feat(web): add contact form Server Action
docs(adr): accept pgvector RAG decision
fix(ai): handle stream timeout gracefully
chore(deps): bump next to 16.2.1
```

- Imperative mood: "add" not "added"
- Scope optional but helpful: `web`, `ui`, `database`, `ai`, `deploy`

---

## PR Workflow

1. **Create branch** from latest `main`
2. **Implement** with tests and doc updates
3. **Push** `git push -u origin <branch>`
4. **Open PR** to `main` with:
   - Summary of changes
   - Link to feature `acceptance.md` or issue
   - Screenshots for UI changes
   - Notes on migrations/env vars
5. **CI** must pass
6. **Review** — address feedback
7. **Squash or merge** per repo preference (squash keeps history clean)
8. **Delete branch** after merge

### PR title

Match conventional commit format for squash merge clarity.

### Draft PRs

Use for work-in-progress; mark ready when CI green and self-reviewed.

---

## Release Tags (optional)

For significant releases:

```bash
git tag -a v1.0.0 -m "v1.0.0 — initial portfolio launch"
git push origin v1.0.0
```

Align with roadmap milestones when helpful.

---

## Best Practices

- Commit often locally; push at end of logical units
- One concern per commit when possible
- Include `docs/` changes in same PR as behavior changes
- Pull `main` before opening PR

## Examples

**Good PR:** `feat(web): projects list and detail` + links `02-features/projects/acceptance.md`.

**Bad PR:** 50 files, no description, failing lint.

## Anti-patterns

- Long-lived branches diverging weeks from `main`
- Commit messages like "wip" or "fix stuff" on merge to main
- Direct commits to `main` bypassing review (except emergencies)

## Future Improvements

- Branch protection rules requiring review + CI
- Auto-delete merged branches on GitHub

## References

- [Workflow](./workflow.md)
- [Checklist](./checklist.md)
- [Deployment](../07-deployment/deployment.md)
