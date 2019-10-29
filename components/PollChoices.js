import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH, faCheck } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

/*
class PollChoices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      choices,
      votingPeriod,
      dateCreated,
      totalVotes
    } = this.props;

    return (
      <div className='poll-choices'>
        <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
        <div className='poll-stat mb-3'>
          {totalVotes} votes • <b>Voting ends: {`
            ${Math.round(moment.duration(moment(dateCreated).add(votingPeriod, 'hours').diff(Date.now())).asHours())} hours
            `}</b>
        </div>
        {choices.map((choice, i) => (
          <InputGroup className="mb-3" key={i}>
            {userVote ?
              <FontAwesomeIcon icon={faCheck} />
              :
              <div>
              <FontAwesomeIcon icon={faCheck} />
              <input className='choice-control' type='radio' name='poll-choice' value={i} onChange={updateChoiceSelected} />
              </div>
            }
            
            <label className='form-control'>{choice}</label>
          </InputGroup>
        ))}
        <Button variant='grey-blue' size="sm">View Results</Button>
        <Form>
          <Form.Group style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button
              onClick={submitVote} 
              variant='light-blue' type="submit" style={{ width: '200px' }}>
              Submit Vote
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
*/


const PollChoices = props => (
  <div className='poll-choices'>
    <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
    <div className='poll-stat mb-3'>
      {props.totalVotes} votes • <b>Voting ends: {`
         ${Math.round(moment.duration(moment(props.dateCreated).add(props.votingPeriod, 'hours').diff(Date.now())).asHours())} hours
        `}</b>
    </div>
    {props.choices.map((choice, i) => (
      <InputGroup className="mb-3" key={i}>
        <input className='choice-control' type='radio' name='poll-choice' value={i} onChange={props.updateChoiceSelected} />
        <label className='form-control'>{choice}</label>
      </InputGroup>
    ))}
    <Button variant='grey-blue' size="sm">View Results</Button>
    <Form>
      <Form.Group style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button
          onClick={props.submitVote} 
          variant='light-blue' type="submit" style={{ width: '200px' }}>
          Submit Vote
        </Button>
      </Form.Group>
    </Form>
  </div>
);

export default PollChoices;