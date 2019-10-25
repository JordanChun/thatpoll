import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import Container from 'react-bootstrap/Container';
import '../style/index.css';

const Layout = props => (
  <div>
    <MainHeader />
    <Container className='main-wrapper'>
      {props.children}
    </Container>
    <MainFooter />
  </div>
);

export default Layout;