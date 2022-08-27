import { AuthLayout } from '@/components';
import Link from 'next/link';
import { NextPageWithLayout } from '../page';

const AdminIndexPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Link href="/admin/snippets" passHref>
          <a className="link-secondary">Snippets</a>
        </Link>
      </div>
    </>
  );
};

AdminIndexPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default AdminIndexPage;
