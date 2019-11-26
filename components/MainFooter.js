import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

const MainFooter = () => (
  <footer>
    <div className='footer-wrapper'>
      <Container>
        <div className='mb-3'>
          <img src='/public/img/StatMix_Logo.png' alt='StatMix Logo' height='32px' />
        </div>
        <hr />
        <Row>
          <Col>
            <ul className='footer-list'>
              <li>
                <Link href='/' as='/'>
                  <a>Recent Polls</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className='footer-list'>
              <li>
                <Link href='/create-poll' as='/create-poll'>
                  <a>Create Poll</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
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
                <Link href='/feedback' as='feedback'>
                  <a>Feedback & Suggestions</a>
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