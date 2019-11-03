import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Alert from 'react-bootstrap/Alert';
import PollChoices from '../components/PollChoices';
import PollResults from '../components/PollResults';
import { withRouter } from 'next/router'
import NotFound from './not-found';
import absoluteUrl from 'next-absolute-url';

class PollPage extends React.Component {
  static async getInitialProps({ query: { slug }, req }) {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/poll/${slug}`);
    const errorCode = res.status > 200 ? res.status : false
    const data = await res.json()
  
    return { errorCode, poll: data.pollData, user: data.userData }
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
    if(!this.state.revealResults) {
      this.setState({ revealResults: true, resultsLoading: true });
    } else {
      this.setState({ refreshResultsLoading: true });
    }
    try {
      const res = await fetch(`${origin}/api/poll/results/${slug}`);
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
            'Acceot': 'accplication/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({selectedVote: this.state.selectedVote})
        });
  
        const data = await res.json();
        console.log(data);
        
        if(data.message === 'error') {
          console.log('already voted');
        } else {
          this.setState({
            totalVotes: data.resultsData.totalVotes,
            userDidVote: data.resultsData.userDidVote,
            selectedVote: data.resultsData.selectedVote
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
      return <NotFound />
    }

    const {
      title,
      desc,
      visibility,
      active,
      choices,
      dateCreated,
      visits,
      timelimit
    } = this.props.poll;

    const {
      totalVotes,
      results,
      userDidVote,
      revealResults,
      resultsLoading,
      refreshResultsLoading
    } = this.state;

    return (
      <Layout pageTitle={`Poll - ${title}`} pageDesc={desc}>
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
          <div className='poll-desc'>
            <h6>Description</h6>
            <div>
              <p>
                {desc.length > 0 ? desc : <i>No description</i>}
              </p>
              <hr />
              <div className='poll-stat'>
                {visits} views • {dateCreated}
              </div>
            </div>
          </div>
          <hr />

          { active && !userDidVote ?
          <PollChoices
            updateChoiceSelected={this.updateChoiceSelected}
            timelimit={timelimit}
            choices={choices}
            revealResults={revealResults}
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
            />
            : null }
        </div>
      </Layout>
    )
  }
}

export default withRouter(PollPage)