import { User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    image: string | null;
    name: string | null;
    role: 'ADMIN' | 'USER';
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
  }
}
