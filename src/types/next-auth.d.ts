import { User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    image?: string;
    name?: string;
    role: 'ADMIN' | 'USER';
    username?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
  }
}
