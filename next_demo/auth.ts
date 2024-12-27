import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "@/app/utils/password";
import { getUserFromDb } from "@/app/utils/getUser";
import { signInSchema } from "@/app/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
          const { email, password } = await signInSchema.parseAsync(credentials);
       
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(password);

        // logic to verify if the user exists
        user = await getUserFromDb(email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});