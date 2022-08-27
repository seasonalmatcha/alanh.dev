import { signInSchema } from '@/schemas';
import { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { inferFormattedError } from 'zod';

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<inferFormattedError<typeof signInSchema>>>(
    {},
  );

  if (status === 'loading') {
    return <div>Loading session ...</div>;
  }

  if (status === 'authenticated') {
    router.replace('/admin');
    return null;
  }

  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const result = signInSchema.safeParse({ identifier, password });
    if (!result.success) {
      setFieldErrors(result.error.format());
      return;
    }

    signIn('credentials', result.data);
  };

  return (
    <form className="flex flex-col space-y-4 max-w-sm mx-auto" onSubmit={onSignIn}>
      <div className="form-group required">
        <label>Username or email</label>
        <input value={identifier} onChange={({ target }) => setIdentifier(target.value)} />
        <div className="form-error">
          {fieldErrors.identifier?._errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div className="form-group required">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="form-error">
          {fieldErrors.password?._errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>
      <button className="btn-action primary">Sign In</button>
    </form>
  );
};

export default SignInPage;
