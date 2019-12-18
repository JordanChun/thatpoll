import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH, faVoteYea, faStopwatch, faShare, faFlag } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment-precise-range-plugin';
import CategoryList from '../../helpers/CategoriesList';
import getMomentTimelimit from '../../helpers/momentFunctions';
import ShareButton from './ShareButton';

const PollPreview = props => (
  <div>
    <div className='content-container'>
      {props.visibility == 'private' ?
        <div className='poll-alert'>
          <Alert variant='danger'>
            This is a <b>private</b> poll. Please consider before sharing the link.
          </Alert>
        </div>
      : null }
      <h4 className='poll-title'>{props.title.length > 0 ? props.title : 'Untitled'}</h4>
      <hr />
      <div className='poll-desc mb-2'>
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
        <Row>
          <Col>
            <div className='poll-options mb-3'>
              <ShareButton url='https://thatpoll.com/create-poll/' />
              <Button size='sm' variant='simple'>
                <FontAwesomeIcon icon={faFlag}/> Report
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className='content-container'>
        <div className='poll-time mb-3'>
          <div>
            <h5>
              <FontAwesomeIcon icon={faVoteYea} /> <b>0</b> votes
            </h5>
            <hr />
            <h5>
              <FontAwesomeIcon icon={faStopwatch} /> {props.timelimit != 'Voting Ended' ? <b>{props.timelimit}</b> : 'Voting Ended' } 
            </h5>
          </div>
        </div>
        <hr />
        <div className='poll-choices'>
          <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
          {props.choices.map((choiceObj, i) => (
            <InputGroup className="mb-3" key={i}>
              <input className='choice-control' type='radio' name='poll-choice' value='0' />
              <label className='form-control'>{choiceObj.choice.length > 0 ? choiceObj.choice : `Choice #${i+1}`}</label>
            </InputGroup>
          ))}
        </div>
    </div>
  </div>
)

export default PollPreview;