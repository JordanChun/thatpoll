import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment-precise-range-plugin';
import CategoryList from '../helpers/CategoriesList';
import getMomentTimelimit from '../helpers/momentFunctions';

const PollPreview = props => (
  <div className='poll-wrapper'>
    {props.visibility == 'private' ?
      <div className='poll-alert'>
        <Alert variant='danger'>
          This is a <b>private</b> poll. Please consider before sharing the link.
        </Alert>
      </div>
    : null }
    <h4 className='poll-title'>{props.title.length > 0 ? props.title : 'Untitled'}</h4>
    <hr />
    <div className='poll-desc'>
      <h6>Description</h6>
      <div>
        <p>
          {props.desc.length > 0 ? props.desc : <i>No description</i>}
        </p>
        <hr />
        <div className='poll-stat'>
          Category: {props.category === 0 ? 'Other' : CategoryList[props.category - 1]}
        </div>
        <div className='poll-stat'>
          0 views • {moment(new Date()).format('ll')}
        </div>
      </div>
    </div>
    <hr />
    <div className='poll-choices'>
      <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
      <div className='poll-stat mb-3'>
        0 votes • <b>{getMomentTimelimit(props.dateCreated, props.votingPeriod)}</b>
      </div>
      {props.choices.map((choiceObj, i) => (
        <InputGroup className="mb-3" key={i}>
          <input className='choice-control' type='radio' name='poll-choice' value='0' />
          <label className='form-control'>{choiceObj.choice.length > 0 ? choiceObj.choice : `Choice #${i+1}`}</label>
        </InputGroup>
      ))}
    </div>
  </div>
)

export default PollPreview;