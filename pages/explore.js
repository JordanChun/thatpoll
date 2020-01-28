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
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

class Explore extends React.Component {
  static async getInitialProps(ctx) {
    let origin = '';
    if (ctx.req) {
      origin = absoluteUrl(ctx.req).origin;
    }
    const { page, state } = ctx.query;
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://thatpoll.com' : origin;
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

    this.state = {
      showFilters: false
    }

    this.updateFilter = this.updateFilter.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  updateFilter(eventKey, e) {
    let href = '/explore/?page=1';
    
    const queries = Object.assign({}, this.props.router.query);
    queries.page = 1;
    queries[e.target.name] = eventKey;

    for (let i = 1; i < Object.keys(queries).length; i++) {
      const key = Object.keys(queries)[i];
      const value = queries[key];
      href += `&${key}=${value}`
    }

    const as = href;
    Router.push(href, as);
  }

  toggleFilter() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  render() {
    const { polls, totalItems } = this.props;
    const { showFilters } = this.state;
    return (
      <Layout
        path={this.props.router.asPath}
        ads={true}
        pageTitle={'ThatPoll - Explore'}
      >
        <Container className='main-wrapper'>
          <Row>
            <Col md={9}>
              <div className='d-flex justify-content-between'>
                <h4 className='page-header' style={{ padding: 0 }}>Recent Polls</h4>
                <Button variant='simple' size='sm' onClick={this.toggleFilter}>
                  <FontAwesomeIcon icon={faFilter} /> Filter
                </Button>
              </div>
            { showFilters ? <PollListFilter updateFilter={this.updateFilter} query={this.props.router.query} /> : null }
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
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Explore)
