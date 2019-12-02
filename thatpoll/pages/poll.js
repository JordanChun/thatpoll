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
import io from 'socket.io-client';
import moment from 'moment';
import getMomentTimelimit from '../helpers/momentFunctions';

class PollPage extends React.Component {
  static async getInitialProps(ctx) {
    const { origin } = absoluteUrl(ctx.req);
    const { slug } = ctx.query;
    let clientIp;
    if (ctx.req && ctx.req.headers) {
      clientIp = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
    }
    const res = await fetch(`${origin}/api/v1/poll/${slug}`, {
      method: 'POST',
      headers: { 
        'X-IP': clientIp
      }
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
      userDidVoteError: false,
      submitError: false,
      timelimit: this.props.poll.timelimit
    }

    this.updateChoiceSelected = this.updateChoiceSelected.bind(this);
    this.loadResults = this.loadResults.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
  }

  componentDidMount() {
    if (this.props.active) {
      this.connectSocket();
      const updateTimelimit = setInterval(() => {
        let timelimit = getMomentTimelimit(this.props.poll.dateCreated, this.props.poll.votingPeriod);
        this.setState({
          timelimit: timelimit
        })
      }, 60000)
    }
  }

  componentWillUnmount() {
    this.socket.close();
    clearInterval(this.updateTimelimit);
  }
  
  connectSocket() {
    this.socket = io();
    this.socket.emit('joinPollRoom', this.props.router.query.slug);

    this.socket.on('joined', data => {
      console.log('PollRoom:', data);
    });

    this.socket.on('updateResults', selectedVote => {
      const newResults = this.state.results.slice(0);
      newResults[selectedVote]++;
      this.setState({
        results: newResults,
        totalVotes: this.state.totalVotes + 1
      });
    });
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
      const res = await fetch(`${origin}/api/v1/poll/results/${slug}`, {
        method: 'POST',
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
        const res = await fetch(`${origin}/api/v1/poll/vote/${slug}`, {
          method: 'POST',
          headers: {
            'Accept': 'accplication/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({selectedVote: this.state.selectedVote})
        });
  
        const data = await res.json();

        if(data.message === 'error') {
          this.setState({ userDidVoteError: true });
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

          this.setState({ userDidVote: true });
        }
        
      } catch (err) {
        this.setState({ submitError: true });
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
      votingPeriod,
      visits,
      category
    } = this.props.poll;

    const {
      totalVotes,
      results,
      userDidVote,
      userDidVoteError,
      revealResults,
      resultsLoading,
      refreshResultsLoading,
      submitError,
      selectedVote,
      timelimit
    } = this.state;

    return (
      <Layout
        pageTitle={`Poll - ${title}`}
        pageDesc={desc}
        visibility={visibility}
        path={this.props.router.asPath}
        ads={true}
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
                {visits} views • {moment(dateCreated).format('ll')}
              </div>
            </div>
          </div>
          <Row>
            <Col>
              <div className='poll-options mb-3'>
                <ShareButton url={url} />
                <ReportButton urlref={this.props.router.query.slug} polltitle={title} />
              </div>
            </Col>
          </Row>
          <div className='poll-time mb-3'>
            <h6>
              {this.state.totalVotes} votes • <b>{this.state.timelimit}</b>
            </h6>
          </div>
          { active && !userDidVote ?
          <PollChoices
            userDidVote={userDidVote}
            userDidVoteError={userDidVoteError}
            submitError={submitError}
            choices={choices}
            revealResults={revealResults}
            updateChoiceSelected={this.updateChoiceSelected}
            submitVote={this.submitVote}
            loadResults={this.loadResults}
            selectedVote={selectedVote}
          /> : null }

          { !active || userDidVote || revealResults ?
            <PollResults
              totalVotes={totalVotes}
              results={results}
              choices={choices}
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