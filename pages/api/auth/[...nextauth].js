import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { API } from "../../../config";



export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("NEXTAUTH SIGNIN CALLBACK", { provider: account.provider });
            if (account.provider === "google") {
                try {
                    // You can also pass the id_token if needed
                    const response = await fetch(`${API}/api/google-login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ idToken: account.id_token }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        user.backendToken = data.token;
                        user.backendUser = data.user;
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.error("Error during sign in callback", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.backendToken = user.backendToken;
                token.backendUser = user.backendUser;
            }
            return token;
        },
        async session({ session, token }) {
            session.backendToken = token.backendToken;
            session.user = { ...session.user, ...token.backendUser };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "any-random-secret-for-now",
    pages: {
        signIn: "/signin",
    },
});
