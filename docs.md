# Sirwan Afifi Public Content API

The public content API is a small, read-only HTTP API for site discovery and published-post metadata. The base URL is `https://sirwan.info`, all endpoints use GET, and no API key is required.

## Request conventions

- JSON responses use UTF-8 and standard HTTP status codes.
- Clients should cache successful responses for at least five minutes.
- The public quota is 600 requests per 60 seconds for each anonymous network address and endpoint within a Cloudflare location. Responses advertise it with `RateLimit-Policy` and `RateLimit-Limit` headers.
- There are no write endpoints, pagination parameters, user accounts, or webhooks.

## GET /api/v1/site.json

Returns the site's identity, author, languages, authentication policy, and canonical discovery-resource URLs.

```sh
curl --fail --silent https://sirwan.info/api/v1/site.json
```

## GET /api/v1/posts.json

Returns all non-draft posts, newest first. Each item includes its title, language, dates, tags, canonical URL, and explicit Markdown URL.

```sh
curl --fail --silent https://sirwan.info/api/v1/posts.json
```

## Versioning and deprecation

Stable REST endpoints use a major version in the URL. Version 1 lives under `/api/v1`. The unversioned `/api/site.json` and `/api/posts.json` paths are deprecated compatibility aliases and advertise their successor version through a `Link` response header. A breaking schema change requires a new major path. Before a stable version is removed, this document will publish migration guidance and responses will carry standards-based `Deprecation` and dated `Sunset` headers.

## Errors and content negotiation

API errors use `application/problem+json` with a stable machine-readable `code`, human-readable detail, and a suggested resolution. A quota response is `429` and includes `Retry-After`. Unknown API paths return a typed `404`; unavailable origins return `502`. Content pages support HTML and Markdown representations through HTTP Accept negotiation at the Cloudflare edge. Machine-readable files and static assets retain their native media types.

## Contract

- [OpenAPI 3.1 entry document](https://sirwan.info/openapi.json)
- [Developer portal](https://sirwan.info/developers.md)
