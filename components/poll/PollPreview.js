import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH, faVoteYea, faStopwatch, faFlag } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faReddit } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import 'moment-precise-range-plugin';
import CategoryList from '../../common/CategoriesList';
import getMomentTimelimit from '../../common/momentFunctions';
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
              <div className='share-buttons mb-2'>
                <a
                  title='Facebook'
                  className='social-buttons'
                  style={{ backgroundColor: '#4267B2' }}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  title='Twitter'
                  className='social-buttons'
                  style={{ backgroundColor: '#1b95e0' }}
                  >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a 
                  title='Reddit'
                  className='social-buttons'
                  style={{ backgroundColor: '#ff4500' }}
                >
                  <FontAwesomeIcon icon={faReddit} />
                </a>
                <ShareButton url='https://thatpoll.com/create-poll/' />
              </div>
              <div>
                <Button size='sm' variant='simple'>
                  <FontAwesomeIcon icon={faFlag}/> Report
                </Button>
              </div>
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
          <h4 className='mb-1'><FontAwesomeIcon icon={faPollH} /> Poll Choices</h4>
          {props.choices.map((choiceObj, i) => (
            <div className="poll-choice-container" key={i}>
              <input id={`choice-${i}`} name='poll-choice' type="radio" value='0'/>
              <label htmlFor={`choice-${i}`}>{choiceObj.choice.length > 0 ? choiceObj.choice : `Choice #${i+1}`}</label>
            </div>
          ))}
        </div>
    </div>
  </div>
)

export default PollPreview;
