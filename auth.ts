import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
import Github from "next-auth/providers/github";
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
