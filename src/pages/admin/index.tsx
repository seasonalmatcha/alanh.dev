import { NextPage } from 'next';
import Link from 'next/link';

const AdminIndexPage: NextPage = () => {
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

export default AdminIndexPage;
