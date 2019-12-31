import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const PollChoices = props => (
  <div className='poll-choices'>
    <hr />
    <h4 className='mb-3'><FontAwesomeIcon icon={faPollH} /> Choices</h4>
    {props.choices.map((choice, i) => (
      <div className="poll-choice-container" key={i}>
        { props.multiChoice ?
          <input id={`choice-${i}`} name='poll-choice' type="checkbox" value={i} onChange={props.updateMultiChoiceSelected} />
          :
          <input id={`choice-${i}`} name='poll-choice' type="radio" value={i} onChange={props.updateChoiceSelected} />
        }
        
        <label htmlFor={`choice-${i}`}>{choice}</label>
      </div>
    ))}
    {props.multiChoice && props.selectedChoices.length !== props.maxSelectChoices ?
      <div className='mt-2 mb-2'>
        {props.selectedChoices.length <= props.maxSelectChoices ?
          <div>
            You may select up to <b>{props.maxSelectChoices - props.selectedChoices.length}</b> more choices.
          </div>
          : 
          <div>You have selected too many choices! <b>{props.selectedChoices.length - props.maxSelectChoices} too many.</b></div> }
      </div> : null
    }
    <div className='mt-3 mb-3 choice-btns'>
      <Button
        disabled={
          props.selectedChoices.length === 0 || props.selectedChoices.length > props.maxSelectChoices
          ? true : false}
        size='sm'
        onClick={props.submitVote} 
        variant='light-blue' type="submit" style={{ width: '200px' }}>
        Submit Vote
      </Button>
    { !props.revealResults ?
      <Button variant='grey-blue' size='sm' onClick={props.loadResults}>View Results</Button>
      : null }
    </div>
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
  </div>
);

PollChoices.propTypes = {
  userDidVote: PropTypes.bool.isRequired,
  userDidVoteError: PropTypes.bool.isRequired,
  selectedChoices: PropTypes.array.isRequired,
  choices: PropTypes.array.isRequired,
  revealResults: PropTypes.bool.isRequired,
  updateChoiceSelected: PropTypes.func.isRequired,
  updateMultiChoiceSelected: PropTypes.func.isRequired,
  submitVote: PropTypes.func.isRequired,
  loadResults: PropTypes.func.isRequired
}

export default PollChoices;