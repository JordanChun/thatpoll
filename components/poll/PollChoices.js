import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import moment from 'moment';

const PollChoices = props => (
  <div className='poll-choices'>
    <hr />
    {props.userDidVoteError ?
      <div className='poll-alert'>
        <Alert variant='warning'>
          You have already voted.
        </Alert>
      </div>
    : null }
      {props.submitError ?
      <div className='poll-alert'>
        <Alert variant='warning'>
          Error submitting vote. Please try again.
        </Alert>
      </div>
    : null }
    <h4 className='mb-3'><FontAwesomeIcon icon={faPollH} /> Choices</h4>
    {props.choices.map((choice, i) => (
      <div className="poll-choice-container" key={i}>
        <input id={`choice-${i}`} name='poll-choice' type="radio" value={i} onChange={props.updateChoiceSelected} />
        <label htmlFor={`choice-${i}`}>{choice}</label>
      </div>
    ))}
    <div className='mt-3 mb-3 choice-btns'>
      <Button
        disabled={props.selectedVote == null ? true : false}
        size='sm'
        onClick={props.submitVote} 
        variant='light-blue' type="submit" style={{ width: '200px' }}>
        Submit Vote
      </Button>
    { !props.revealResults ?
      <Button variant='grey-blue' size='sm' onClick={props.loadResults}>View Results</Button>
      : null }
    </div>

  </div>
);

PollChoices.propTypes = {
  userDidVote: PropTypes.bool.isRequired,
  userDidVoteError: PropTypes.bool.isRequired,
  choices: PropTypes.array.isRequired,
  revealResults: PropTypes.bool.isRequired,
  updateChoiceSelected: PropTypes.func.isRequired,
  submitVote: PropTypes.func.isRequired,
  loadResults: PropTypes.func.isRequired
}

export default PollChoices;