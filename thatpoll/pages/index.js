import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faShare, faEllipsisV, faFilter } from '@fortawesome/free-solid-svg-icons';
import absoluteUrl from 'next-absolute-url';
import PollPagination from '../components/PollPagination';
import PollCard from '../components/PollCard';
import { withRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VoteHistory from '../components/VoteHistory';
import Router from 'next/router';

class Home extends React.Component {
  static async getInitialProps(ctx) {
    const { origin } = absoluteUrl(ctx.req);
    const { page } = ctx.query;
    const searchPage = page < 1 || page == undefined ? 1 : page;
    const res = await fetch(`${origin}/api/v1/polls?page=${searchPage}`, {
      method: 'POST',
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
        pageTitle='ThatPoll'
        path={this.props.router.asPath}
        ads={true}
      >
        <h4 className='page-header'>Recent Polls</h4>
        <hr />
        
        <Row>
          <Col md={9}>
{/*            <div className='filter-container'>
              <div style={{ lineHeight: 1.8 }}>
                <FontAwesomeIcon icon={faFilter} /> Filter
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle variant='simple' id="dropdown-phase" size='sm'>
                  Any Voting Phase
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1">Active</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Ended</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

    </div>*/}
            { polls.length === 0 ?
              <div className='no-polls-card'>
                <h4>No Polls Found</h4>
              </div>
            :
              <div>
                {polls.map((poll, i) => (
                  <PollCard key={i} poll={poll} />
                ))}
                <PollPagination totalItems={totalItems} />
              </div>
            }
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
