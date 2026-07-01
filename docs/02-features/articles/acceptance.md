# Articles — Acceptance Criteria

## Purpose

Testable definition of done for **Articles** releases.

## Scope

Functional, non-functional, and quality requirements for this feature. Global DoD also applies from [roadmap](../../00-product/roadmap.md).

## Responsibilities

| Role | Responsibility |
|------|----------------|
| Implementing engineer / agent | Satisfy all criteria before merge |
| QA agent | Verify criteria with manual and automated tests |
| Reviewer | Confirm criteria met in PR review |

## Functional Requirements

- [ ] Feature routes for Articles are reachable and return HTTP 200
- [ ] Page metadata (title, description) is set for SEO
- [ ] Layout is responsive at mobile, tablet, and desktop breakpoints
- [ ] Keyboard navigation works for all interactive controls
- [ ] Color contrast meets WCAG 2.2 AA
- [ ] No critical accessibility violations in axe/Lighthouse
- [ ] Loading and error states are implemented
- [ ] Lint, typecheck, and build pass in CI
- [ ] List page shows published items only
- [ ] Detail page renders content with correct slug
- [ ] Unpublished drafts are not publicly accessible

## Non-Functional Requirements

- [ ] Lighthouse Performance ≥ 90 on primary page (where applicable)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] No PII logged at info level without redaction
- [ ] Feature documented if behavior differs from this spec

## Test Plan

| Type | Coverage |
|------|----------|
| Unit | Utils, validation schemas, query helpers |
| Integration | Server Actions, database operations |
| E2E | Primary user flow (Playwright) |
| a11y | axe-core in CI or manual audit |

## Best Practices

- Write E2E test for primary flow before marking feature complete
- Link PR to this file in description
- Update criteria when scope changes (with review)

## Examples

**Done:** All checkboxes pass; E2E green in CI.

**Not done:** UI works locally but citations missing in digital-twin.

## Anti-patterns

- "Works on my machine" without CI evidence
- Skipping a11y because visual review looks fine
- Accepting hardcoded placeholder content as final

## Future Improvements

- Visual regression tests for key pages
- Contract tests for AI stream event shapes

## References

- [Brief](./brief.md)
- [UX](./ux.md)
- [Technical](./technical.md)
- [Testing Standards](../../05-standards/testing.md)
