# Sirwan Afifi Developer Portal

Use the public content API and discovery files to find Sirwan Afifi's writing, site metadata, feeds, and machine-readable documentation. Everything is read-only and available without an account.

## Quickstart

```sh
curl --fail --silent https://sirwan.info/api/v1/site.json
```

## Authentication and API keys

No authentication is required and no API keys are issued. The API has no write operations, private records, webhooks, or user accounts.

## API lifecycle

Stable endpoints use a major version in the URL, currently `/api/v1`. The older unversioned paths remain as deprecated compatibility aliases. A breaking contract change requires a new major path. Any future removal will be announced in the API documentation before a dated `Sunset` header is introduced.

## Reference

- [API documentation](https://sirwan.info/docs.md)
- [OpenAPI 3.1 specification](https://sirwan.info/openapi.json)
- [Agent guide](https://sirwan.info/llms.txt)
- [Sitemap](https://sirwan.info/sitemap-index.xml)

## Read-only sandbox

The production GET endpoints are safe to explore directly because they cannot change data:

- [GET /api/v1/site.json](https://sirwan.info/api/v1/site.json)
- [GET /api/v1/posts.json](https://sirwan.info/api/v1/posts.json)

## Service contract

These resources are provided for discovery and lightweight personal use without an uptime SLA. Clients should cache responses, identify themselves responsibly, and follow standard HTTP status semantics.
