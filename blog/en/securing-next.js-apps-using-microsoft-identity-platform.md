# Securing Next.js Apps Using Microsoft Identity Platform

In a previous article, I explained how to secure a Blazor application using the Microsoft Identity Platform. In this article, I will demonstrate how to secure a Next.js application. The process is almost identical in terms of the steps required on the Azure portal; however, the implementation differs.

- Published: 2024-04-09
- Language: en
- Tags: Next.js, Security, Microsoft Identity Platform, Authentication, Authorisation
- Canonical: https://sirwan.info/blog/en/securing-next.js-apps-using-microsoft-identity-platform

---

[In the previous article](/blog/en/securing-blazor-8.x-web-apps-using-microsoft-identity-platform), I explained how to secure a Blazor application using the Microsoft Identity Platform. In this one, I will show you how to secure a Next.js application. The process is almost identical in terms of the steps required on the Azure portal; however, the implementation differs.

On the Azure portal's app registration page settings, you need to set the redirect URI to `http://localhost:3000/api/auth/callback/azuread` and the logout URL to `http://localhost:3000/`.

On the Next.js side, I have utilised a popular library called [next-auth](https://next-auth.js.org/) to manage the authentication process. This library is very user-friendly and supports multiple identity providers.

```bash
> bun add next-auth
```

Next you will need to create a file called `pages/api/auth/[...nextauth].js` and add the following code:

```ts
import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
};
export default NextAuth(authOptions);
```

Make sure you have the environment variables set in a `.env.local` file:

```
NEXTAUTH_SECRET=secret
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id
```

Finally, in the root layout component, you need to wrap the component with the `Provider` component:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticatedProviders>{children}</AuthenticatedProviders>
      </body>
    </html>
  );
}
```

That's it! You have now secured your Next.js application using the Microsoft Identity Platform. You can now use the `useSession` hook to check if the user is authenticated and get the user's information.

```tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Welcome
        {session ? <> {session.user?.name}</> : null}
      </h1>
      <div>
        {session ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </main>
  );
}
```
