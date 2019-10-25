import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import PollChoices from '../components/PollChoices';
import PollResults from '../components/PollResults';
import { Router } from 'next/router';
import Error from 'next/error';
import NotFound from './not-found';
import absoluteUrl from 'next-absolute-url';

class PollPage extends React.Component {
  static async getInitialProps({ query: { slug }, req }) {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/poll/${slug}`);
    const errorCode = res.status > 200 ? res.status : false
    const data = await res.json()
  
    return { errorCode, poll: data }
  }

  constructor(props) {
    super(props);
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

    } = this.props.poll;
    //console.log(moment.duration(moment(dateCreated).add(votingPeriod, 'hours').diff(dateCreated)).asHours())
    //console.log(moment(dateCreated).add(votingPeriod, 'hours'));
    return (
      <Layout>
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
            <PollChoices choices={choices} dateCreated={dateCreated} votingPeriod={votingPeriod} />
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