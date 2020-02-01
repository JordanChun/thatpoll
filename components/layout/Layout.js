import Head from 'next/head';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import Container from 'react-bootstrap/Container';
import { useState, useEffect, useCallback } from 'react';
import CookiesBanner from './CookiesBanner';
import Cookies from 'js-cookie';

function Layout(props) {
  const [showBanner, setShowBanner] = useState(false);

  const closeBanner = useCallback(() => {
    Cookies.set('cookiesBanner', 0, { expires: 365 });
    setShowBanner(false)
  },[showBanner])

  useEffect(() => {
    if (Cookies.get('cookiesBanner') != 0) {
      setShowBanner(true)
    }
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/public/img/favicon.ico"></link>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
          />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-svg-core@1.2.25/styles.css"></link>
        <title>{props.pageTitle}</title>
        {props.visibility === 'private' ? <meta name="robots" content="noindex" /> : null }
        <meta charSet="UTF-8" />
        <meta name='description' content={props.pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={props.pageTitle} />
        <meta property="og:type" content="Website" />
        <meta property="og:description" content={props.pageDesc} />
        <meta property="og:image" content='https://thatpoll.com/public/img/ThatPoll_Logo_thumbnail.jpg' />
        <meta property="og:url" content={`https://thatpoll.com${props.path}`} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-150975737-1"></script>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'UA-150975737-1');`}} />
        {props.ads ? <script data-ad-client="ca-pub-7980461707615662" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> : null}
      </Head>
      <MainHeader />
        <Container className='main-wrapper'>
          {props.children}
        </Container>
      <MainFooter />
      {showBanner ? <CookiesBanner closeBanner={closeBanner} /> : null } 
    </div>
  );
}

Layout.defaultProps = {
  pageTitle: 'ThatPoll - Instant Poll Maker - Create free polls with real time results and advanced options',
  pageDesc: 'Create your own FREE polls with LIVE, real time results, no sign up required. Instantly create polls for the public or personal use. Share and discuss online with friends and communties.',
  visibility: 'public',
  ads: false
}

export default Layout;