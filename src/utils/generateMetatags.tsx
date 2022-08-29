const baseUrl = 'https://alanh.dev';

type Metatags = {
  title?: string;
  description?: string;
  thumbnails?: string;
  url?: string;
};

export const generateMetatags = ({
  description = 'Frontend Engineer, guitarist, gamer, and coffee addict',
  thumbnails = `${baseUrl}/static/thumbnails.png`,
  title = 'Alan Habibullah',
  url = '',
}: Metatags) => {
  return (
    <>
      <title>{title}</title>
      {url && <link rel="canonical" href={`${baseUrl}${url}`}></link>}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}${url}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnails} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${baseUrl}${url}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={thumbnails} />
    </>
  );
};
