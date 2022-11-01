import { NextPage } from 'next';
import { ContactForm } from '@/components';
import Head from 'next/head';
import { generateMetatags } from '@/utils/generateMetatags';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { env } from '@/env/client.mjs';

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        {generateMetatags({
          title: 'Contact - Alan Habibullah',
          url: '/contact',
        })}
      </Head>
      <GoogleReCaptchaProvider
        reCaptchaKey={env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}
        scriptProps={{
          defer: true,
          appendTo: 'head',
        }}
      >
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default ContactPage;
