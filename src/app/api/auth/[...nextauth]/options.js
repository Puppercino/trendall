import { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

// Plug Amazon Cognito into NextAuth.
// Any OAuth solution works here, but we're deploying Trendall onto AWS.

export const options = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}