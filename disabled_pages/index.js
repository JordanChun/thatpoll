import Layout from '../components/layout/Layout';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import ExamplePollResult from '../components/landing/ExamplePollResult';

function Landing() {
  return (
    <Layout>
      <div className='landing-page'>
        <div className='landing-container'>
          <section>
            <div>
              <img src='/public/img/ThatPoll_Logo.png' alt='ThatPoll Logo' height='86px' />
            </div>
          </section>
          <div style={{ marginBottom: '2rem' }}>
            <h3>Instant Poll Maker</h3>
            <p>Create your own FREE polls with LIVE, real time results, no sign up required. Instantly create polls for the public or personal use. Share and discuss online with friends and communties.</p>
            <Link href='/create-poll' as='/create-poll'>
              <a>
                <Button variant="grey-blue" className='landing-btn'>Create Now</Button>
              </a>
            </Link>
          </div>
          <div>
            <div className='features'>
              <table>
                <tr>
                  <th colSpan='3'><h3>Features</h3></th>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faCheck} /> 100% FREE</td>
                  <td><FontAwesomeIcon icon={faCheck} /> LIVE Results</td>
                  <td><FontAwesomeIcon icon={faCheck} /> User Friendly</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faCheck} /> Modern Design</td>
                  <td><FontAwesomeIcon icon={faCheck} /> Timed Voting Periods</td>
                  <td><FontAwesomeIcon icon={faCheck} /> Private Polls</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faCheck} /> Animated and Sorted Results</td>
                  <td><FontAwesomeIcon icon={faCheck} /> Multiple Choice Answers</td>
                  <td><FontAwesomeIcon icon={faCheck} /> Up to 30 choices</td>
                </tr>
                <tr>
                  <td colSpan='3' style={{ textAlign: 'center' }}>And many more...</td>
                </tr>
              </table>
            </div>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <h3>Data Results Showcase</h3>
          </div>

          <ExamplePollResult />
{/*          <Row className='features'>
            <Col>
              <FontAwesomeIcon icon={faCheck} /> 100% FREE
              <FontAwesomeIcon icon={faCheck} /> Modern Design
            </Col>
            <Col>
              <FontAwesomeIcon icon={faCheck} /> User Friendly
            </Col>
            <Col>
              <FontAwesomeIcon icon={faCheck} /> LIVE Results
            </Col>
            <Col>
              <FontAwesomeIcon icon={faCheck} /> Modern Design
            </Col>
  </Row>*/}
        </div>
      </div>
    </Layout>
  )
}

export default Landing
