import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
      <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
            crossOrigin="anonymous"
        />
        <link
            href="https://fonts.googleapis.com/css?family=Raleway"
            rel="stylesheet"
        />
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Gagster',
  keywords: 'gagster, gags, cartoonist, comics',
  description: 'Single place to find best gags(ters) for your publications',
}

export default Meta
