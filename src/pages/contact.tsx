import { NextPage } from 'next';
import { ContactForm, Meta } from '@/components';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { env } from '@/env/client.mjs';

const ContactPage: NextPage = () => {
  return (
    <>
      <Meta title="Contact - Alan Habibullah" url="/contact" />

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
