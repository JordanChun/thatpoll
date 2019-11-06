import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import PollPagination from '../components/PollPagination';
import { withRouter } from 'next/router';
import PollCard from '../components/PollCard';

class Page extends React.Component {
  static async getInitialProps({ query: { num }, req }) {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/polls/page/${num}`, {
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
    const { polls, totalItems, router } = this.props;

    return (
      <Layout
        pageTitle={`StatMix - Page ${router.query.num}`}
        pageDesc='Create public or private polls. Share with friends, communties and gather data.'
        path={this.props.router.asPath}
      >
        <h4 className='page-header'>Recent Polls</h4>
        <hr />
        {polls.map((poll, i) => (
          <PollCard key={i} poll={poll} />
        ))}
        <PollPagination active={router.query.num} totalItems={totalItems} />
      </Layout>
    )
  }
}

export default withRouter(Page)
