import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


class VoteHistory extends React.Component {
  constructor() {
    super();
    
    this.state = {
      history: []
    }

    this.deleteHistory = this.deleteHistory.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  componentDidMount() {
    // get history from localstorage
    console.log(localStorage.voteHistory)
    if (localStorage.voteHistory) {
      const voteHistory = JSON.parse(localStorage.getItem('voteHistory'));
      console.log(voteHistory)
      this.setState({ history: voteHistory });
    }
  }

  
  deleteHistory(e) {
    // delete one item from history
    if (localStorage.voteHistory) {
      const index = e.target.parentElement.parentElement.dataset["index"];
      let voteHistory = JSON.parse(localStorage.getItem('voteHistory'));
      voteHistory.splice(index, 1);
      this.setState({ history: voteHistory });
      voteHistory = JSON.stringify(voteHistory);
      localStorage.voteHistory = voteHistory;
    }
  }
  

  clearHistory() {
    //clear all history
    if (localStorage.voteHistory) {
      localStorage.removeItem('voteHistory');
      this.setState({ history: [] });
    }
  }

  render() {
    const { history } = this.state;
    return (
      <Card className='vote-history'>
        <Card.Header>Vote History</Card.Header>
        { history.length > 0 ?
          <ListGroup variant="flush">
            {history.map((poll, i) => (
              <ListGroup.Item key={i}>
                <Link href={{ pathname: '/poll', query: { slug: poll.url } }} as={`/poll/${poll.url}`}>
                  <a title={poll.title}>{poll.title}</a>
                </Link>
                <span onClick={this.deleteHistory} data-index={i}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup> 
        : 
          <ListGroup variant='flush'>
            <ListGroupItem>
              <i>No history...</i>
            </ListGroupItem>
          </ListGroup>
        }

      </Card>
    )
  }
}

export default VoteHistory;