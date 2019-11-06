import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const PollChoices = props => (
  <div className='poll-choices'>
    {props.userDidVoteError ?
      <div className='poll-alert'>
        <Alert variant='warning'>
          You have already voted.
        </Alert>
      </div>
    : null }
    <h5><FontAwesomeIcon icon={faPollH} /> Choices</h5>
    <div className='poll-stat mb-3'>
      <b>{props.timelimit}</b>
    </div>
    {props.choices.map((choice, i) => (
      <InputGroup className="mb-3" key={i}>
        <input className='choice-control' type='radio' name='poll-choice' value={i} onChange={props.updateChoiceSelected} />
        <label className='form-control'>{choice}</label>
      </InputGroup>
    ))}
    <div className='mb-3'>
      <Button
        size='sm'
        onClick={props.submitVote} 
        variant='light-blue' type="submit" style={{ width: '200px' }}>
        Submit Vote
      </Button>
    </div>

    { !props.revealResults ?
      <div className='mb-3'>
        <Button variant='grey-blue' size='sm' onClick={props.loadResults}>View Results</Button>
      </div>
      : null }
  </div>
);

export default PollChoices;