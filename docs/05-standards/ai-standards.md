# AI Standards

## Purpose

Standards for prompt design, retrieval, model selection, guardrails, rate limiting, and cost control across AI features.

## Scope

All LLM and embedding usage via `@repo/ai`. See [AI architecture](../01-architecture/ai.md) and [RAG architecture](../01-architecture/rag.md).

## Responsibilities

AI agent and reviewers enforce these standards for AI-related changes.

---

## Prompt Design

- Version every system prompt (`v1`, `v2`, …)
- Store prompts as TypeScript templates, not scattered strings
- Instructions must require:
  - Citing source indices for factual claims
  - Admitting insufficient context
  - Staying in persona (portfolio owner digital twin)
- Keep system prompt under ~1500 tokens where possible
- Evaluate prompt changes against golden question set

```typescript
export const DIGITAL_TWIN_SYSTEM_V1 = `
You are the digital twin of [Owner Name], an AI engineer.
Answer only using provided sources. Cite as [n].
If sources are insufficient, say so clearly.
`;
```

---

## Retrieval

| Parameter | Guideline |
|-----------|-----------|
| Chunk size | ~512 tokens, 64 overlap |
| top_k | 5–10; tune via eval |
| Similarity threshold | ≥ 0.65–0.75 (calibrate) |
| Max context tokens | ~3000 for retrieval block |
| Sources | Published content only |

- Log `chunkIds` and scores per request
- Re-ingest on publish/update/delete
- Never retrieve from admin-only tables

---

## Model Selection

| Use case | Default model tier |
|----------|-------------------|
| Embeddings | `text-embedding-3-small` |
| Digital twin chat | Cost-efficient chat model (e.g., `gpt-4o-mini`) |
| Eval / offline | Same as production unless comparing |

- Model IDs from environment variables
- Document price table for cost estimation
- Upgrade path: feature flag in admin before changing default

---

## Guardrails

- Max user message characters (e.g., 2000)
- Max output tokens per request (`AI_MAX_TOKENS`)
- Blocked phrase list for abuse (config file)
- Refuse medical/legal/financial advice beyond portfolio context
- No code execution or tool use without explicit ADR
- Optional: provider moderation API on input

---

## Rate Limiting

| Endpoint | Limit (starting point) |
|----------|------------------------|
| Chat per IP | 20 requests / minute |
| Chat per session | 100 messages / day |
| Ingestion jobs | Queue with concurrency 2 |

- Return `429` with `Retry-After` header
- Log rate limit hits for abuse monitoring

---

## Cost Control

- Record `promptTokens`, `completionTokens`, estimated USD per request
- Daily spend alert threshold (configurable)
- Truncate conversation history to fit token budget (FIFO)
- Cache content hashes to skip re-embedding unchanged text
- No unbounded auto-retry on provider errors

---

## Streaming

- Use normalized `ChatChunk` protocol (text, citation, done, error)
- Timeout provider calls (30s default)
- Close streams on client disconnect to save tokens where provider allows

---

## Best Practices

- Single gateway entry point — no direct SDK in features
- Redact PII from eval datasets and logs
- Run eval suite before prompt version bumps
- Document failure modes in feature technical specs

## Examples

**Citation:** Assistant says "Built with Next.js [1]" → UI links to source [1].

**Refusal:** No chunks above threshold → "I don't have information about that in my published work."

## Anti-patterns

- Increasing `temperature` to fix retrieval gaps
- Logging full system prompts with user PII in production
- Hardcoding API keys in source
- Skipping rate limits on "internal" staging (bad habit)

## Future Improvements

- Automated cost dashboards per feature
- LLM-as-judge eval with human audit sample
- Prompt injection regression tests

## References

- [AI Architecture](../01-architecture/ai.md)
- [RAG Architecture](../01-architecture/rag.md)
- [Observability](../08-observability/observability.md)
- [AI Agent](../03-agents/ai.md)
- [ADR-0005](../04-adr/0005-rag.md)
