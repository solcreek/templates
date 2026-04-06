# Creek Templates — Agent Reference

This repo contains official templates for `create-creek-app`. Each subdirectory is a self-contained, deployable Creek project.

## Using Templates

```bash
# Scaffold from a built-in template
npx create-creek-app my-site --template landing --yes

# Deploy
cd my-site && npx creek deploy --yes
```

## Creating a Template

A template is a directory with these files:

| File | Required | Purpose |
|------|----------|---------|
| `package.json` | yes | Dependencies and scripts |
| `creek.toml` | yes | Creek project config (`[project]`, `[build]`, `[resources]`) |
| `creek-template.json` | recommended | JSON Schema for customizable parameters (removed on scaffold) |
| `creek-data.json` | if schema exists | Default parameter values (read at runtime by app code) |
| `.gitignore` | recommended | Ignore `node_modules/`, `dist/`, `.creek/` |

### creek-template.json format

```json
{
  "name": "my-template",
  "description": "One-line description",
  "capabilities": [],
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "name": { "type": "string", "default": "my-app" },
      "title": { "type": "string", "default": "My App" }
    }
  }
}
```

### Capabilities

Set `capabilities` to declare which Creek resources the template uses:

- `"database"` — Database (D1, requires `worker/index.ts` with Hono)
- `"cache"` — Key-value cache (KV)
- `"storage"` — Object storage (R2)
- `"ai"` — AI inference
- `"realtime"` — WebSocket via Creek Realtime

### Runtime config pattern

Templates must read `creek-data.json` at runtime, not use build-time string replacement:

```tsx
// Correct — runtime import
import data from "../creek-data.json";
export function App() {
  return <h1>{data.title}</h1>;
}
```

### Rules

- Every schema property must have a `default` — the template must work with zero `--data` input
- `name` property is auto-populated from the project directory
- Template must scaffold and deploy with: `npx create-creek-app test --template ./<dir> --yes && cd test && creek deploy`
- No secrets, API keys, or hardcoded credentials
- English for all names, descriptions, and code comments

## Directory Structure

```
templates/
├── blank/          ← Minimal (no UI, no capabilities)
├── landing/        ← React + Vite landing page
├── blog/           ← Blog with D1
├── link-in-bio/    ← Social links
├── api/            ← Hono REST API with D1
├── todo/           ← D1 + Realtime
├── dashboard/      ← D1 + Realtime
├── form/           ← Form collector with D1
└── chatbot/        ← D1 + Workers AI
```
