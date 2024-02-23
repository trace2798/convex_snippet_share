import NextAuth, { type Session, type User } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user?: User }) {
      if (user && session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});