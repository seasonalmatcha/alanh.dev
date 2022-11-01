import { NextPage } from 'next';
import { ContactForm } from '@/components';

const ContactPage: NextPage = () => {
  return (
    <div className="max-w-xl mx-auto">
      <ContactForm />
    </div>
  );
};

export default ContactPage;
