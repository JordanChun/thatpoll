import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

const MainFooter = () => (
  <footer>
    <div className='footer-wrapper'>
      <Container>
        <div className='mb-3'>
          <img src='/public/img/ThatPoll_Logo.png' alt='ThatPoll Logo' height='32px' />
        </div>
        <hr />
        <Row>
          <Col xs={6} md>
            <ul className='footer-list'>
              <li>
                <Link href='/explore' as='/explore'>
                  <a>Explore</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md>
            <ul className='footer-list'>
              <li>
                <Link href='/' as='/'>
                  <a>Create Poll</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md>
            <ul className='footer-list'>
              <li>
                <Link href='/terms-of-service' as='/terms-of-service'>
                  <a>Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href='/privacy-policy' as='/privacy-policy'>
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href='/contact' as='/contact'>
                  <a>Contact Us</a>
                </Link>
              </li>
            </ul>

          </Col>
        </Row>
      </Container>
    </div>
  </footer>
);

export default MainFooter;