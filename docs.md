# Sirwan Afifi Public Content API

The public content API is a small, read-only HTTP API for site discovery and published-post metadata. The base URL is `https://sirwan.info`, all endpoints use GET, and no API key is required.

## Request conventions

- JSON responses use UTF-8 and standard HTTP status codes.
- Clients should cache successful responses for at least five minutes.
- There are no write endpoints, pagination parameters, user accounts, or webhooks.

## GET /api/site.json

Returns the site's identity, author, languages, authentication policy, and canonical discovery-resource URLs.

```sh
curl --fail --silent https://sirwan.info/api/site.json
```

## GET /api/posts.json

Returns all non-draft posts, newest first. Each item includes its title, language, dates, tags, canonical URL, and explicit Markdown URL.

```sh
curl --fail --silent https://sirwan.info/api/posts.json
```

## Errors and content negotiation

Unknown paths return a real 404 response with recovery links. Content pages support HTML and Markdown representations through HTTP Accept negotiation at the Cloudflare edge. A request that explicitly accepts neither representation returns 406 Not Acceptable. Machine-readable files and static assets retain their native media types.

## Contract

- [OpenAPI 3.1 entry document](https://sirwan.info/openapi.json)
- [Developer portal](https://sirwan.info/developers.md)
