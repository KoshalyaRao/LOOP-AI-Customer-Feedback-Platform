import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { UserRole } from '@/types';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { workspace: true },
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
          workspaceId: user.workspaceId,
          workspaceName: user.workspace.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.workspaceId = (user as any).workspaceId;
        token.workspaceName = (user as any).workspaceName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role as UserRole;
        (session.user as any).workspaceId = token.workspaceId as string;
        (session.user as any).workspaceName = token.workspaceName as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'loop-super-secret-jwt-key-2026',
};

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function requireWorkspaceSession() {
  const session = await getAuthSession();
  if (!session || !session.user) {
    return null;
  }
  return session.user as {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    workspaceId: string;
    workspaceName: string;
  };
}
