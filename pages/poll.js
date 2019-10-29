import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import PollChoices from '../components/PollChoices';
import PollResults from '../components/PollResults';
import Router from 'next/router';
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
      selectedVote: 0
    }

    this.updateChoiceSelected = this.updateChoiceSelected.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }

  updateChoiceSelected(e) {
    this.setState({ selectedVote: e.target.value });
  }

  async submitVote(e, req) {
    e.preventDefault();
    const { origin } = absoluteUrl(req);
    try {
      const res = await fetch(`${origin}/api/poll/vote/${this.props.url.query.slug}`, {
        method: 'POST',
        headers: {
          'Acceot': 'accplication/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({selectedVote: this.state.selectedVote})
      });

      const data = await res.json();
      if(data.message === 'success') {
        Router.push(`/poll/${this.props.url.query.slug}`);
      }

      console.log(data);
      
    } catch (err) {
      console.log(err);
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
      choices,
      votingPeriod,
      dateCreated,
      visits,
      totalVotes
    } = this.props.poll;
    //console.log(moment.duration(moment(dateCreated).add(votingPeriod, 'hours').diff(dateCreated)).asHours())
    //console.log(moment(dateCreated).add(votingPeriod, 'hours'));
    return (
      <Layout pageTitle={`Poll - ${title}`}>
        <div className='poll-wrapper'>
          {visibility == 'private' ?
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
                {visits} views • {moment(dateCreated).format('ll')}
              </div>
            </div>
          </div>
          <hr />
          {
            moment(dateCreated).add(votingPeriod, 'hours').isAfter(Date.now()) ?
            <PollChoices
              choices={choices} dateCreated={dateCreated} votingPeriod={votingPeriod} totalVotes={totalVotes}
              updateChoiceSelected={this.updateChoiceSelected}
              submitVote={this.submitVote}
            />
            :
            <PollResults />
          }
        </div>
      </Layout>
    )
  }
}

/*
const PollPage = (props) => {
  const router = useRouter()
  const { slug } = router.query;
  console.log(props);
  return (
    <Layout>
      <Poll {...props} />
    </Layout>
  )
}
*?

/*
const Poll = props => (
  <Layout>
    
    <h3>{props.title}</h3>
  </Layout>
);
*/

/*
PollPage.getInitialProps = async function(context) {
  const { slug } = context.query;
  const res = await fetch(`http://localhost:3000/api/poll/${slug}`);
  console.log(res);
  const errorCode = res.status > 200 ? res.status : false
  const data = await res.json()

  return { errorCode, poll: data }
  if(res.status === 200) {
    const data = await res.json();
    return { poll: data };
  } else {
    Router.push('')
  }
  console.log(data);
}
 */
export default PollPage