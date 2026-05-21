// import { jwt } from "better-auth/plugins";
// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   baseURL: process.env.BETTER_AUTH_URL,
//   plugins: [jwt()],
// });

// export const { signIn, signUp, useSession } = createAuthClient();

import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, useSession } = authClient;