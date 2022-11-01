import { NextPage } from 'next';
import { ContactForm } from '@/components';
import Head from 'next/head';
import { generateMetatags } from '@/utils/generateMetatags';

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        {generateMetatags({
          title: 'Contact - Alan Habibullah',
          url: '/contact',
        })}
      </Head>

      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
