import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faShare, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import absoluteUrl from 'next-absolute-url';
import PollPagination from '../components/PollPagination';
import PollCard from '../components/PollCard';
import { withRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VoteHistory from '../components/VoteHistory';

class Home extends React.Component {
  static async getInitialProps({ query: { page }, req }) {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/polls?page=${page}`, {
      method: 'GET',
      headers: {
        'X-Origin': 'statmix',
      }
    });
    const data = await res.json();
  
    return {
      polls: data.pollsArr,
      totalItems: data.totalItems
    }
  }

  constructor(props) {
    super(props);

  }

  render() {
    const { polls, totalItems } = this.props;
    return (
      <Layout
        pageTitle='StatMix'
        path={this.props.router.asPath}
      >
        <h4 className='page-header'>Recent Polls</h4>
        <hr />

          <Row>
            <Col md={9}>
              {polls.map((poll, i) => (
                <PollCard key={i} poll={poll} />
              ))}
              <PollPagination totalItems={totalItems} />
            </Col>
            <Col>
              <VoteHistory />
            </Col>
          </Row>
      </Layout>
    )
  }
}

export default withRouter(Home)
