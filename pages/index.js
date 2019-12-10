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
import PollListFilter from '../components/PollListFilter';

class Home extends React.Component {
  static async getInitialProps(ctx) {
    const { origin } = absoluteUrl(ctx.req);
    const { page, state } = ctx.query;
    let queryString = '';
    for (let i = 0; i < Object.keys(ctx.query).length; i++) {
      let name = Object.keys(ctx.query)[i];
      let value = ctx.query[Object.keys(ctx.query)[i]];

      if (value !== undefined && value !== '') {
        if (i > 0) {
          queryString += '&';
        }
        queryString += `${name}=${value}`;
      }

    }
    // const searchPage = page < 1 || page == undefined ? 1 : page;

    const res = await fetch(`${origin}/api/v1/polls?${queryString}`, {
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

    this.updateFilter = this.updateFilter.bind(this);
  }

  updateFilter(eventKey) {
    const { state } = this.props.router.query;
    let href = '/?page=1';
    if (state !== eventKey) {
      href += `&state=${eventKey}`
      const as = href;
      Router.push(href, as);
    }
  }

  render() {
    const { polls, totalItems } = this.props;
    return (
      <Layout
        pageTitle='ThatPoll'
        path={this.props.router.asPath}
        ads={true}
      >
        <Row>
          <Col md={9} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 className='page-header' style={{ padding: 0 }}>Recent Polls</h4>
            <PollListFilter updateFilter={this.updateFilter} query={this.props.router.query} />
          </Col>
        </Row>
        <hr />
        
        <Row>
          <Col md={9}>
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
