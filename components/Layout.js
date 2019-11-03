import Head from 'next/head';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import Container from 'react-bootstrap/Container';
import '../style/index.css';

const Layout = props => (
  <div>
    <Head>
      <title>{props.pageTitle}</title>
      <meta name='description' content={props.pageDesc} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-150975737-1"></script>
      <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-150975737-1');`}} />
    </Head>
    <MainHeader />
    <Container className='main-wrapper'>
      {props.children}
    </Container>
    <MainFooter />
  </div>
);

export default Layout;