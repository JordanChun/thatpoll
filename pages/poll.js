import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Alert from 'react-bootstrap/Alert';
import PollChoices from '../components/PollChoices';
import PollResults from '../components/PollResults';
import { withRouter } from 'next/router'
import ErrorPage from './_error';
import absoluteUrl from 'next-absolute-url';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ShareButton from '../components/ShareButton';
import { ReportButton } from '../components/Report';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PollPage extends React.Component {
  static async getInitialProps({ query: { slug }, req }) {
    const { origin } = absoluteUrl(req);
    console.log(req);
    const clientIp = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(clientIp);
    const res = await fetch(`${origin}/api/poll/${slug}`, {
      method: 'GET',
      headers: { 'X-Origin': 'statmix', 'X-IP': clientIp }
    });
    const errorCode = res.status > 200 ? res.status : false
    const data = await res.json()
    const url = `${origin}/poll/${slug}`;
    return { errorCode, poll: data.pollData, user: data.userData, url: url }
  }

  constructor(props) {
    super(props);

    this.state = {
      totalVotes: this.props.poll.totalVotes,
      results: this.props.poll.results,
      userDidVote: this.props.user.didVote,
      revealResults: !this.props.poll.active,
      resultsLoading: false,
      refreshResultsLoading: false,
      selectedVote: null,
      userDidVoteError: false
    }

    this.updateChoiceSelected = this.updateChoiceSelected.bind(this);
    this.loadResults = this.loadResults.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }

  updateChoiceSelected(e) {
    this.setState({ selectedVote: e.target.value });
  }

  async loadResults(e, req) {
    const { origin } = absoluteUrl(req);
    const { slug } = this.props.router.query;

    if (this.state.revealResults || this.state.userDidVote || this.props.active) {
      this.setState({ refreshResultsLoading: true, revealResults: true });
    } else {
      this.setState({ revealResults: true, resultsLoading: true });
    }

    try {
      const res = await fetch(`${origin}/api/poll/results/${slug}`, {
        method: 'GET',
        headers: { 'X-Origin': 'statmix' }
      });
      const data = await res.json();

      this.setState({
        totalVotes: data.totalVotes,
        userDidVote: data.userDidVote,
        results: data.results,
        resultsLoading: false,
        refreshResultsLoading: false,
      });
    } catch (err) {
      
    }
  }

  async submitVote(e, req) {
    e.preventDefault();
    if(this.state.selectedVote !== null) {
      const { origin } = absoluteUrl(req);
      const { slug } = this.props.router.query;
      try {
        const res = await fetch(`${origin}/api/poll/vote/${slug}`, {
          method: 'POST',
          headers: {
            'Accept': 'accplication/json',
            'Content-Type': 'application/json',
            'X-Origin': 'statmix',
          },
          body: JSON.stringify({selectedVote: this.state.selectedVote})
        });
  
        const data = await res.json();
        //console.log(data);
        
        if(data.message === 'error') {
          this.setState({ userDidVoteError: true });
          //console.log('already voted');
        } else {
          if (localStorage.voteHistory) {
            let voteHistory = JSON.parse(localStorage.getItem('voteHistory'));
            voteHistory.unshift({ title: this.props.poll.title, url: this.props.router.query.slug });
            voteHistory = JSON.stringify(voteHistory)
            localStorage.setItem('voteHistory', voteHistory);
          } else {
            let voteHistory = [];
            voteHistory.unshift({ title: this.props.poll.title, url: this.props.router.query.slug });
            voteHistory = JSON.stringify(voteHistory)
            localStorage.setItem('voteHistory', voteHistory);
          }

          this.setState({
            totalVotes: data.resultsData.totalVotes,
            userDidVote: data.resultsData.userDidVote,
            selectedVote: data.resultsData.selectedVote,
            userDidVoteError: false
          });
          this.loadResults(e, req);
        }
        
      } catch (err) {
        console.log(err);
      }
    } else {
      // user didnt select vote
    }
  }

  render() {
    // if not data found for poll
    if (this.props.errorCode) {
      return <ErrorPage errorCode={this.props.errorCode} />
    }

    const { url } = this.props;

    const {
      title,
      desc,
      visibility,
      active,
      choices,
      dateCreated,
      visits,
      timelimit,
      category
    } = this.props.poll;

    const {
      totalVotes,
      results,
      userDidVote,
      userDidVoteError,
      revealResults,
      resultsLoading,
      refreshResultsLoading
    } = this.state;

    return (
      <Layout
        pageTitle={`Poll - ${title}`}
        pageDesc={desc}
        visibility={visibility}
        path={this.props.router.asPath}
      >
        <div className='poll-wrapper'>
          {visibility === 'private' ?
            <div className='poll-alert'>
              <Alert variant='danger'>
                This is a <b>private</b> poll. Please consider before sharing the link.
              </Alert>
            </div>
          : null }
          <h4 className='poll-title'>{title.length > 0 ? title : 'Untitled'}</h4>
          <hr />
          <div className='poll-desc mb-1'>
            <h6>Description</h6>
            <div>
              <p>
                {desc.length > 0 ? desc : <i>No description</i>}
              </p>
              <hr />
              <div className='poll-stat'>
                Category: {category}
              </div>
              <div className='poll-stat'>
                {visits} views • {dateCreated}
              </div>
            </div>
          </div>
          <Row>
            <Col>
              <div className='poll-options mb-3'>
                <ShareButton url={url} />
                <ReportButton urlref={this.props.router.query.slug} title={title} />
              </div>
            </Col>
          </Row>
          <hr />

          { active && !userDidVote ?
          <PollChoices
            userDidVote={userDidVote}
            userDidVoteError={userDidVoteError}
            timelimit={timelimit}
            choices={choices}
            revealResults={revealResults}
            updateChoiceSelected={this.updateChoiceSelected}
            submitVote={this.submitVote}
            loadResults={this.loadResults}
          /> : null }

          { !active || userDidVote || revealResults ?
            <PollResults
              totalVotes={totalVotes}
              results={results}
              choices={choices}
              timelimit={timelimit}
              resultsLoading={resultsLoading}
              refreshResultsLoading={refreshResultsLoading}
              loadResults={this.loadResults}
              active={active}
            />
            : null }
        </div>
      </Layout>
    )
  }
}

PollPage.defaultProps = {
  poll: {
    totalVotes: 0,
    results: [],
  },
  user: { userDidVote: false },
  revealResults: false,
  active: true
}

export default withRouter(PollPage)