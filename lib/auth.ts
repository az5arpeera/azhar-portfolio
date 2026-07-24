import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export function isAdmin(email: string | null | undefined) {
  const allowed = process.env.ADMIN_EMAIL?.toLowerCase();
  return !!email && !!allowed && email.toLowerCase() === allowed;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    signIn: ({ user }) => isAdmin(user.email),
    authorized: ({ auth }) => isAdmin(auth?.user?.email),
  },
});
