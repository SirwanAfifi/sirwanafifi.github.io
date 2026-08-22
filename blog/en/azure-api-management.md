# Azure API Management

I have been playing around with Azure API Management lately and really like it. It's a great way to manage your APIs, essentially serving as an API Gateway to handle incoming API calls and route them to various backend services. The backend service could be any HTTP API, WebSocket, GraphQL, Azure Function, Azure App Services, etc.

- Published: 2024-04-17
- Language: en
- Tags: Azure, API Management
- Canonical: https://sirwan.info/blog/en/azure-api-management

---

I have been playing around with Azure API Management lately and really like it. It's a great way to manage your APIs, essentially serving as an API Gateway to handle incoming API calls and route them to various backend services. The backend service could be any HTTP API, WebSocket, GraphQL, Azure Function, Azure App Services, etc.

<img src="/img/azure/azure-api-mgt.png" alt="Azure API Management" class="blog-post-image" />

I thought it might be a good idea to show you how to create a super simple API using it. A while ago, I did a side project to scrape some data from a grocery store here in the UK called Tesco. I needed the data for some other tasks; I have blogged about them [here](/blog/en/programmers-and-llms) and [here](/blog/en/a-weekend-with-swift/). To demonstrate how to use Azure API Management, I will use the same data. So, let’s get started.

First, we need to create a new API Management instance on the Azure portal. Creating it takes time tho. Once it's done, it comes with a default API called `Echo API`, which is a simple API with some resources:

<img src="/img/azure/azure-api-mgt-echo-api.png" alt="Azure API Management" class="blog-post-image" />

I created an API called Tesco with these resources:
<img src="/img/azure/azure-api-mgt-tesco.png" alt="Azure API Management" class="blog-post-image" />

As you can see I have created four resources: `Bakery`, `Fresh`, `Frozen`, and `List`. Each should correspond to their respective categories in the API:

> | Placeholder | Value                                                                                |
> | ----------- | ------------------------------------------------------------------------------------ |
> | baseURL     | https://raw.githubusercontent.com/SirwanAfifi/tesco-clubcards-of-the-day/main/output |
> | DD-MM-yyyy  | should be replaced with the current date.                                            |

| Resource | GitHub URL                         |
| -------- | ---------------------------------- |
| Bakery   | `{baseURL}/DD-MM-yyyy-bakery.json` |
| Fresh    | `{baseURL}/DD-MM-yyyy-fresh.json`  |
| Frozen   | `{baseURL}/DD-MM-yyyy-frozen.json` |
| List     | `{baseURL}/DD-MM-yyyy.json`        |

This means that we need a policy to set the placeholders. We can do this by following these steps:

<img src="/img/azure/azure-api-mgt-tesco-policy.png" alt="Azure API Management" class="blog-post-image" />

Then for the policy, we can use the following:

```xml
<policies>
    <inbound>
        <set-variable name="originalUrl" value="@(context.Request.Url.ToString())" />
        <set-variable name="today" value="@{
            var today = DateTime.UtcNow.ToString("dd-MM-yyyy");
            return $"/{today}-{context.Operation.Name.ToLower()}.json";
        }" />
        <rewrite-uri template="@((string)context.Variables["today"])" />
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>
```

This policy sets the `today` variable to the current date and the `originalUrl` to the original URL. Then it rewrites the URI to include the current date and the operation name. The operation name is the name of the resource, which is `Bakery`, `Fresh`, `Frozen`, or `List`.

Now we can test the endpoints using the Test tab, or we can simply open the URL in the browser. However, to use the API, we need a subscription, which is essentially a key that we need to send as a query parameter. You can find the subscription key in the `Subscription` tab.

```bash
curl https://[API_NAME].azure-api.net/?subscription-key=[subscription-key]
```
