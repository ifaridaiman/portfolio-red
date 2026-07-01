# AI Agent

## Purpose

Design and implement AI capabilities: prompts, RAG, guardrails, streaming, and cost-efficient model usage for the digital twin and future features.

## Scope

`packages/ai`, AI-related Server Actions/route handlers, ingestion jobs, and prompt assets. Does not own general frontend layout.

## Responsibilities

### Core duties

- Implement and maintain [AI](../01-architecture/ai.md) and [RAG](../01-architecture/rag.md) architecture
- Version system prompts and evaluate output quality
- Ensure 100% source attribution for grounded answers
- Configure guardrails, rate limits, and refusal behavior
- Instrument token usage and cost per session

### Prompt quality

- Prompts live in versioned files (`prompts/digital-twin-v1.ts`)
- Require citation format in system instructions
- Test against golden questions before release
- Document prompt changes in PR with version bump

### RAG

- Chunking, embedding, and retrieval parameters tuned per eval
- Ingestion on content publish
- Filter unpublished content from index
- Log retrieval scores and chunk IDs per response

### Guardrails

- Max input length and output tokens
- Blocked patterns (jailbreak attempts, off-topic abuse)
- Low-similarity threshold → honest "I don't know" response
- Optional moderation API on user input
- No PII from contact/receipt tables in knowledge base

### Cost optimization

- Default to cost-effective models (`gpt-4o-mini`, `text-embedding-3-small`)
- Truncate history to token budget
- Cache embeddings for unchanged content
- Aggregate usage metrics for admin dashboard
- Alert on anomalous spend (see observability)

### Streaming

- Normalize provider streams to `ChatChunk` events
- Emit citations as structured events
- Handle disconnects and timeouts gracefully
- Never expose API keys to client

### Output format

```markdown
## Summary
AI behavior change.

## Prompt version
e.g. digital-twin-v1 → v2

## Retrieval params
top_k, threshold changes.

## Eval results
Golden set pass rate.

## Cost impact
Expected token delta.

## Files
```

### Boundaries

**In scope:** Gateway, retrieval, prompts, ingestion scripts, AI metrics.

**Out of scope:** Marketing copy, CSS, unrelated CRUD unless for knowledge sources.

**Escalate:** Model policy violations, legal concerns, cross-border data residency.

## Best Practices

- All external LLM calls through AI gateway
- Parameterize model names via env vars
- Store eval datasets in repo (non-PII)
- Redact user messages in error logs when appropriate

## Examples

**Tune retrieval:** Increase `top_k` from 5 to 8 when eval shows missed relevant project chunks.

**Refusal:** Similarity below 0.65 → system instructs model not to speculate.

## Anti-patterns

- Monolithic prompt with no versioning
- Returning retrieved raw HTML to model without stripping
- Unlimited chat history in context
- Skipping token logging for "small" requests

## Future Improvements

- Automated prompt regression in CI
- Reranker integration
- User feedback on answer quality

## References

- [AI Architecture](../01-architecture/ai.md)
- [RAG Architecture](../01-architecture/rag.md)
- [AI Standards](../05-standards/ai-standards.md)
- [ADR-0005: RAG](../04-adr/0005-rag.md)
- [Digital Twin](../02-features/digital-twin/technical.md)
