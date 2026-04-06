# Creek Templates

Official templates for [create-creek-app](https://www.npmjs.com/package/create-creek-app).

## Quick Start

```bash
# Interactive
npx create-creek-app

# Direct
npx create-creek-app my-site --template landing --yes
cd my-site && creek deploy
```

## Templates

| Template | Description | Capabilities |
|----------|-------------|-------------|
| [blank](./blank) | Minimal Creek project (no UI) | — |
| [landing](./landing) | Landing page with hero and CTA | — |
| blog | Blog with posts | D1 |
| link-in-bio | Social links page | — |
| api | REST API with Hono | D1 |
| todo | Realtime todo app | D1, Realtime |
| dashboard | Data dashboard | D1, Realtime |
| form | Form collector | D1 |
| chatbot | AI chatbot | D1, AI |

## How Templates Work

Each template is a complete, deployable Creek project. Templates use **runtime config** — your app reads `creek-data.json` at runtime, so customization is just editing one JSON file.

### Template Structure

```
my-template/
├── creek-template.json   ← metadata + JSON Schema (removed on scaffold)
├── creek-data.json       ← runtime config (default values)
├── creek.toml            ← Creek project config
├── package.json
├── .gitignore
├── src/                  ← your code (reads creek-data.json)
└── worker/index.ts       ← edge worker (if capabilities require it)
```

### creek-template.json

Defines the template's metadata and customizable parameters via [JSON Schema](https://json-schema.org/):

```json
{
  "name": "landing",
  "description": "Landing page with hero, features, and CTA",
  "capabilities": ["database", "realtime"],
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "title": { "type": "string", "default": "My Product" },
      "theme": { "type": "string", "enum": ["light", "dark"], "default": "dark" }
    }
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Template identifier (must match directory name) |
| `description` | string | yes | One-line description |
| `capabilities` | string[] | yes | Creek resources used: `database`, `cache`, `storage`, `ai`, `realtime` |
| `thumbnail` | string | no | URL or path to thumbnail (400x300) |
| `screenshot` | string | no | URL or path to full screenshot |
| `schema` | object | no | JSON Schema for customizable parameters |

This file is **removed** from the scaffolded project — it's metadata for the CLI, not part of the app.

### creek-data.json

Runtime config consumed by your app code:

```json
{
  "title": "My Product",
  "theme": "dark"
}
```

Your code reads it directly:

```tsx
import data from "../creek-data.json";

export function App() {
  return <h1>{data.title}</h1>;
}
```

Users customize their project by editing this file. No rebuild required for static values — just redeploy.

## Creating a Template

### 1. Create the directory

```bash
mkdir my-template && cd my-template
```

### 2. Add Creek config

```toml
# creek.toml
[project]
name = "my-template"

[build]
command = "npm run build"
output = "dist"

[resources]
database = false
cache = false
storage = false
```

### 3. Define the schema

Create `creek-template.json` with your customizable parameters. Every property should have a `default` so the template works without any `--data` input.

### 4. Build your app

Write your code to read `creek-data.json` for any configurable values. This is the key principle: **runtime config, not build-time string replacement.**

### 5. Test locally

```bash
creek dev       # local development
creek deploy    # deploy to verify
```

### 6. Submit

**Option A:** Open a pull request to this repo.

**Option B:** Host on your own GitHub repo and use directly:

```bash
npx create-creek-app --template github:yourname/my-template
```

## Schema Best Practices

1. **Always set defaults** — the template must work with zero `--data` input
2. **Use `enum` for constrained choices** — `"enum": ["light", "dark"]` enables validation and agent discovery
3. **Keep schemas flat** — prefer top-level primitives over deeply nested objects
4. **Include a `name` property** — `create-creek-app` auto-populates it from the project directory
5. **Use arrays for naturally repeated data** — features, nav items, team members
6. **Document via the schema** — property names and defaults serve as documentation

## Agent Workflow

Templates are designed for programmatic use by AI agents:

```bash
# Discover available templates
npx create-creek-app --list

# Read a template's schema
npx create-creek-app --template landing --schema

# Validate data before scaffolding
npx create-creek-app --template landing --validate \
  --data '{"theme":"dark"}'

# Scaffold and deploy
npx create-creek-app my-site --template landing \
  --data '{"title":"Acme"}' --yes
cd my-site && creek deploy --yes
```

All commands output JSON to stdout.

## License

Apache-2.0
