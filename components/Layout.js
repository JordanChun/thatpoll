import Head from 'next/head';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import Container from 'react-bootstrap/Container';
//import '../style/index.css';

const Layout = props => (
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
      <meta property="og:type" content="Website" />
      <meta property="og:title" content={props.pageTitle} />
      <meta property="og:description" content={props.pageDesc} />
      <meta property="og:image" content='https://thatpoll.herokuapp.com/public/img/ThatPoll_Logo_thumbnail.jpg' />
      <meta property="og:url" content={`https://thatpoll.herokuapp.com${props.path}`} />
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
  </div>
);

Layout.defaultProps = {
  pageTitle: 'ThatPoll',
  pageDesc: 'Create simple and free polls, no sign up required. Instantly create polls for the public or personal use. Share and discuss online with friends and communties.',
  visibility: 'public',
  ads: false
}

export default Layout;