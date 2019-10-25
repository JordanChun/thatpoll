import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import moment from 'moment';

const PollChoices = props => (
  <div className='poll-choices'>
    <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
    <div className='poll-stat mb-3'>
      0 votes • <b>Voting ends: {`
         ${Math.round(moment.duration(moment(props.dateCreated).add(props.votingPeriod, 'hours').diff(Date.now())).asHours())} hours
        `}</b>
    </div>
    {props.choices.map((choice, i) => (
      <InputGroup className="mb-3">
        <input className='choice-control' type='radio' name='poll-choice' value={i} />
        <label className='form-control'>{choice}</label>
      </InputGroup>
    ))}
  </div>
);

export default PollChoices;