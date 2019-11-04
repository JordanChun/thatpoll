import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faShare, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import absoluteUrl from 'next-absolute-url';
import CompactOptionsToggle from '../components/CompactOptionsToggle';
import PollPagination from '../components/PollPagination';
import PollCard from '../components/PollCard';

class Home extends React.Component {
  static async getInitialProps({req}) {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/polls/page/1`, {
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
      <Layout pageTitle='StatMix'>
        <h4 className='page-header'>Recent Polls</h4>
        <hr />
        {polls.map((poll, i) => (
          <PollCard key={i} poll={poll} />
        ))}
        {/*polls.map(poll => (
          <div className='poll-card-container' key={poll.url}>
            <Link href={`/poll/${poll.url}`}>
              <a>
                <h6 className='poll-card-title'>
                  {poll.title}
                </h6>
              </a>
            </Link>
            <hr />
            <div className='poll-card-desc'>
              {poll.desc.length > 0 ? <p>{poll.desc}</p> : <i>No Description</i> }
            </div>
            <hr />
            <div className='poll-card-actions'>
              <div>
                <Link href={{ pathname: '/poll', query: { slug: poll.url } }} as={`/poll/${poll.url}`}>
                  <a>
                    <Button variant="grey-blue" size="sm">
                      View Poll
                    </Button>
                  </a>
                </Link>
                <div className='poll-stat' style={{ lineHeight: '2.5', marginLeft: '0.75rem' }}>
                  <span>{poll.totalVotes} votes • {poll.dateCreated}</span>
                </div>
              </div>
              <div className='poll-card-actions-options'>
                <div>
                  <span>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faFlag} /> Report
                  </span>
                </div>
                <div className='poll-card-actions-compact'>
                  <Dropdown alignRight>
                    <Dropdown.Toggle as={CompactOptionsToggle} id="dropdown-custom-components">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Button}>
                        <FontAwesomeIcon icon={faShare} /> Share
                      </Dropdown.Item>
                      <Dropdown.Item as={Button}>
                        <FontAwesomeIcon icon={faFlag} /> Report
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        ))*/}
        <PollPagination active={1} totalItems={totalItems} />
      </Layout>
    )
  }
}

export default Home
