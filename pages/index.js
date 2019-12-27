import Layout from '../components/layout/Layout';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import PollPagination from '../components/poll/PollPagination';
import PollCard from '../components/poll/PollCard';
import { withRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VoteHistory from '../components/VoteHistory';
import Router from 'next/router';
import PollListFilter from '../components/poll/PollListFilter';

class Home extends React.Component {
  static async getInitialProps(ctx) {
    // let origin = '';
    // if (ctx.req) {
    //   origin = absoluteUrl(ctx.req).origin;
    // }
    const { page, state } = ctx.query;
    // const baseUrl = process.env.NODE_ENV === 'production' ? 'https://thatpoll.com' : origin;
    const baseUrl = 'https://thatpoll.com';
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

    const res = await fetch(`${baseUrl}/api/v1/polls?${queryString}`, {
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
