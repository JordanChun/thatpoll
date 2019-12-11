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
    <h5><FontAwesomeIcon icon={faPollH} /> Choices</h5>
    {props.choices.map((choice, i) => (
      <InputGroup className="mb-3" key={i}>
        <input className='choice-control' type='radio' name='poll-choice' value={i} onChange={props.updateChoiceSelected} />
        <label className='form-control'>{choice}</label>
      </InputGroup>
    ))}
    <div className='mb-3'>
      <Button
        disabled={props.selectedVote == null ? true : false}
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