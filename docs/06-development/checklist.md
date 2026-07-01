# Development Checklists

## Purpose

Provide actionable checklists for developers, reviewers, and release operators.

## Scope

Pre-merge developer work, PR review, and production release validation.

## Responsibilities

Contributors complete developer checklist; reviewers complete review checklist; release owner completes release checklist.

---

## Developer Checklist

Before opening a PR:

### Planning

- [ ] Read [engineering architecture](../01-architecture/engineering-architecture.md) and relevant feature docs
- [ ] Confirm ADR if architectural decision introduced
- [ ] Branch named per [branching.md](./branching.md)

### Implementation

- [ ] Changes scoped to task; no unrelated refactors
- [ ] Server/Client boundaries correct
- [ ] Inputs validated (Zod) at trust boundaries
- [ ] No secrets or API keys in client code
- [ ] Error and loading states implemented
- [ ] a11y: labels, focus, contrast, keyboard path

### Quality

- [ ] `pnpm lint` passes
- [ ] `pnpm check-types` passes
- [ ] `pnpm build` passes (at least `--filter=web`)
- [ ] Unit/integration tests added or updated
- [ ] E2E updated for user-facing flows (when applicable)

### Documentation

- [ ] `docs/` updated if behavior or architecture changed
- [ ] `.env.example` updated for new env vars
- [ ] Feature `tasks.md` items referenced in PR description

### PR

- [ ] Descriptive title and summary
- [ ] Links to acceptance criteria or issue
- [ ] Screenshots/recording for UI changes
- [ ] Migration notes if Prisma schema changed

---

## Review Checklist

Reviewer agent or human:

### Correctness

- [ ] Logic matches feature spec and acceptance criteria
- [ ] Edge cases handled (empty, error, unauthorized)
- [ ] No obvious bugs or race conditions

### Architecture

- [ ] Follows [monorepo](../01-architecture/monorepo.md) boundaries
- [ ] LLM calls only via AI gateway
- [ ] Prisma not used in Client Components
- [ ] ADR present if needed

### Security

- [ ] Input validation on server
- [ ] Auth on admin routes
- [ ] Rate limits on public AI/forms where applicable
- [ ] No sensitive data in logs

### Quality

- [ ] Tests adequate for change risk
- [ ] No disable of lint/a11y without justification
- [ ] Performance considerations (N+1 queries, large bundles)

### Documentation

- [ ] Docs accurate and not duplicated unnecessarily
- [ ] Commit messages / PR title follow conventions

### Verdict

- [ ] **Approve** / **Request changes** with explicit blockers listed

---

## Release Checklist

Before/after deploying `main` to production:

### Pre-deploy

- [ ] CI green on commit being deployed
- [ ] Database migrations reviewed (`prisma migrate deploy` plan)
- [ ] Env vars set on target environment
- [ ] Changelog or release notes (if tagged release)
- [ ] Feature flags default safe state

### Deploy

- [ ] Docker image built and pushed (GitHub Actions on `main`)
- [ ] `deploy.sh` completed successfully on EC2 (or Dokploy equivalent)
- [ ] Migrations applied without error
- [ ] Health endpoint returns 200

### Post-deploy smoke tests

- [ ] Landing page loads
- [ ] Sample project/article page loads
- [ ] Contact form or chat smoke (if live)
- [ ] Admin login works (if released)
- [ ] No error spike in logs

### Rollback readiness

- [ ] Previous image tag noted (`github.sha` or `latest-1`)
- [ ] Rollback procedure understood ([deployment](../07-deployment/deployment.md))
- [ ] Stakeholder notified if incident

### Monitoring

- [ ] Check dashboards/alerts for 15–30 minutes post-deploy
- [ ] Token/cost metrics normal for AI features

---

## Best Practices

- Copy checklist into PR description for large features
- Do not skip release checklist for "small" deploys touching DB or auth

## Examples

Developer opens PR only after local `pnpm build` passes.

Reviewer blocks merge for missing server validation on contact form.

## Anti-patterns

- Rubber-stamping review checklist
- Deploying Friday without monitoring plan

## Future Improvements

- PR template embedding checklists
- Automated checkbox linking to CI status

## References

- [Workflow](./workflow.md)
- [Branching](./branching.md)
- [Reviewer Agent](../03-agents/reviewer.md)
- [Testing Standards](../05-standards/testing.md)
