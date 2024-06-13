import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import db from "@/lib/db"
import authConfig from "./auth.config";

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
 } = NextAuth ({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  
});
  /*
  providers: [
    
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      //allowDangerousEmailAccountLinking: true,
    }),
    VkProvider({
      clientId: process.env.VK_ID as string,
      clientSecret: process.env.VK_SECRET as string,
      //allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          registrationdate: token.registrationdate,
          image: token.image,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          name: u.name,
          email: u.email,
          registrationdate: u.registrationdate,
          image: u.image,
        };
      }
      return token;
    },
  },
};
*/
/*
export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/sign-in");
  }
}*/



  //pages: {
  //  signIn: "/sign-in",
  //},
  //providers: [GitHub],
    /*
    Credentials({
      //name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "pochta@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          
          const passwordsMatch = compare(
            password,
            user.password,
          );

          if (passwordsMatch) {
            return user;
          }

          return null;

        }
        if (!credentials || !credentials?.email || !credentials.password) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }
        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
        };
      },
    }),
    */