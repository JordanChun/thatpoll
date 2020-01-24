import Layout from '../components/layout/Layout';
import fetch from 'isomorphic-unfetch';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import PollChoices from '../components/poll/PollChoices';
import PollResults from '../components/poll/PollResults';
import { withRouter } from 'next/router'
import ErrorPage from './_error';
import absoluteUrl from 'next-absolute-url';
import { ReportButton } from '../components/Report';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
import moment from 'moment';
import getTimeLimit from '../common/momentFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import PollShare from '../components/poll/PollShare';
import cookies from 'next-cookies';
import Screenshot from '../components/poll/Screenshot';
import { ReactSVG } from 'react-svg'

class PollPage extends React.Component {
  static async getInitialProps(ctx) {
    let origin = '';
    if (ctx.req) {
      origin = absoluteUrl(ctx.req).origin;
    }
    const { slug } = ctx.query;
    const { cid } = cookies(ctx);
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://thatpoll.com' : origin;
    let clientIp;
    if (ctx.req && ctx.req.headers) {
      clientIp = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
    }
    const res = await fetch(`${baseUrl}/api/v1/poll/${slug}`, {
      method: 'POST',
      headers: { 
        'X-IP': clientIp,
        'X-CID': cid
      }
    });
    const errorCode = res.status > 200 ? res.status : false
    const data = await res.json()
    const url = `${baseUrl}/poll/${slug}`;

    return {
      errorCode,
      poll: data.pollData,
      user: data.userData,
      url: url,
      baseUrl: baseUrl
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      entries: this.props.poll.entries,
      totalVotes: this.props.poll.totalVotes,
      userDidVote: this.props.user.didVote,
      revealResults: !this.props.poll.active,
      resultsLoading: false,
      refreshResultsLoading: false,
      selectedChoices: [],
      userDidVoteError: false,
      submitError: false,
      timelimit: this.props.poll.timelimit
    }
    this.updateMultiChoiceSelected = this.updateMultiChoiceSelected.bind(this);
    this.updateChoiceSelected = this.updateChoiceSelected.bind(this);
    this.loadResults = this.loadResults.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
  }

  componentDidMount() {
    if (this.props.poll.active) {
      this.connectSocket();
      if (this.props.poll.pollExpires) {
        this.updateTimelimit = setInterval(() => {
          let timelimit = getTimeLimit(this.props.poll.endDate);
          this.setState({ timelimit });
        }, 60000)
      }
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
    clearInterval(this.updateTimelimit);
  }

  connectSocket() {
    this.socket = io();
    this.socket.emit('joinPollRoom', this.props.router.query.slug);
    this.socket.on('updateResults', sortedEntries => {
      this.setState({ entries: sortedEntries, totalVotes: this.state.totalVotes + 1 });
    });
    // this.socket.on('updateResults', selectedChoices => {
    //   const newResults = this.state.results.slice(0);
    //   selectedChoices.forEach(choice => {
    //     newResults[choice]++;
    //   });
    //   this.setState({
    //     results: newResults,
    //     totalVotes: this.state.totalVotes + 1
    //   });
    // });
  }

  updateMultiChoiceSelected(e) {
    const value = parseInt(e.target.value);
    const { selectedChoices } = this.state;
    if (!selectedChoices.includes(value)) {
      selectedChoices.push(value);
      this.setState({ selectedChoices })
    } else {
      selectedChoices.splice(selectedChoices.indexOf(value), 1);
      this.setState({ selectedChoices });
    }
  }
  
  updateChoiceSelected(e) {
    this.setState({ selectedChoices: [parseInt(e.target.value)] });
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
        entries: data.entries,
        resultsLoading: false,
        refreshResultsLoading: false,
      });

      
    } catch (err) {
      
    }
  }

  async submitVote(e, req) {
    e.preventDefault();
    if(this.state.selectedChoices !== null) {
      const { origin } = absoluteUrl(req);
      const { slug } = this.props.router.query;
      try {
        const res = await fetch(`${origin}/api/v1/poll/vote/${slug}`, {
          method: 'POST',
          headers: {
            'Accept': 'accplication/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({selectedChoices: this.state.selectedChoices})
        });
  
        const data = await res.json();

        if(data.message === 'error') {
          this.setState({ submitError: true });
        } else if (data.message === 'didVote') {
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
      dateCreated,
      visits,
      category,
      multiChoice,
      maxSelectChoices,
      choices,
      pollExpires,
      endDate,
    } = this.props.poll;

    const {
      totalVotes,
      userDidVote,
      userDidVoteError,
      revealResults,
      resultsLoading,
      refreshResultsLoading,
      submitError,
      selectedChoices,
      timelimit,
      entries
    } = this.state;

    return (
      <Layout
        pageTitle={`ThatPoll - ${title}`}
        pageDesc={desc}
        visibility={visibility}
        path={this.props.router.asPath}
        //ads={true}
      >
        <Container className='main-wrapper'>
          <div id='poll'>
            <div className='content-container'>
              {visibility === 'private' ?
                <div className='poll-alert' data-html2canvas-ignore>
                  <Alert variant='danger'>
                    This is a <b>private</b> poll. Please consider before sharing the link.
                </Alert>
                </div>
                : null}
              <h3 className='poll-title'>{title}</h3>
              <hr />
              {desc.length > 0 ?
                <div className='poll-desc mb-2'>
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
                      {visits.toLocaleString()} views • {moment.utc(dateCreated).local().format('ll')}
                    </div>
                  </div>
                </div> :
                <div className='poll-no-desc mb-2'>
                  <div className='poll-stat'>
                    Category: {category}
                  </div>
                  <div className='poll-stat'>
                    {visits.toLocaleString()} views • {moment.utc(dateCreated).local().format('ll')}
                  </div>
                </div>
              }
              <Row noGutters className='poll-options-row' data-html2canvas-ignore>
                <Col>
                  <div className='poll-options'>
                    <PollShare url={url} />
                    <ReportButton urlref={this.props.router.query.slug} polltitle={title} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='content-container'>
              <div className='poll-vote-time'>
                <div>
                  <h4>
                    <FontAwesomeIcon icon={faVoteYea} /> <b>{totalVotes.toLocaleString()}</b> votes
                  </h4>
                  {pollExpires ?
                    <h5 data-html2canvas-ignore className='poll-time'>
                      <FontAwesomeIcon icon={faStopwatch} /> <b>{timelimit}</b>
                    </h5> : null
                  }
                </div>
              </div>
              {active && !userDidVote ?
                <PollChoices
                userDidVote={userDidVote}
                userDidVoteError={userDidVoteError}
                submitError={submitError}
                choices={choices}
                revealResults={revealResults}
                  updateChoiceSelected={this.updateChoiceSelected}
                  updateMultiChoiceSelected={this.updateMultiChoiceSelected}
                  submitVote={this.submitVote}
                  loadResults={this.loadResults}
                  selectedChoices={selectedChoices}
                  multiChoice={multiChoice}
                  maxSelectChoices={maxSelectChoices}
                  /> : null}

              {!active || userDidVote || revealResults ?
                <PollResults
                combinedResults={entries.reduce((total, current) => total + current.result, 0)}
                resultsLoading={resultsLoading}
                refreshResultsLoading={refreshResultsLoading}
                loadResults={this.loadResults}
                active={active}
                entries={entries}
                />
              : null}
            </div>
            {!active || userDidVote || revealResults ? <Screenshot /> : null }
            <div className='poll-extra-info'>
              <div>
                <h6>Additional Information</h6>
                {multiChoice ? <p>This is a <b>multiple</b> choice poll with up to <b>{maxSelectChoices}</b> selections</p> : <p>This is a <b>single</b> choice poll of <b>1</b> selection.</p> }
                {active ? <p>This poll is still <b>running</b></p> : <p>This poll ended on <b>{moment.utc(endDate).local().format('MMMM Do YYYY, h:mm:ss a')}</b></p>} 
              </div>
              <div className='created-with'>
                <p><b>Created with ThatPoll.com</b></p>
                <ReactSVG src='/public/img/ThatPoll_Logo.svg' beforeInjection={svg => {
                  svg.setAttribute('style', 'height: 40px');
                  svg.setAttribute('style', 'width: 150px')
                }} />
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    )
  }
}

PollPage.defaultProps = {
  poll: {
    totalVotes: 0
  },
  user: { userDidVote: false },
  revealResults: false,
  active: true,
  endDate: null
}

export default withRouter(PollPage)
