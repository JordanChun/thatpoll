import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

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
          0 views • {moment(new Date()).format('ll')}
        </div>
      </div>
    </div>
    <hr />
    <div className='poll-choices'>
      <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
      <div className='poll-stat mb-3'>
        0 votes • {
          moment(props.dateCreated).add(props.votingPeriod, 'hours') > moment(Date.now()) ? 
          <b>Voting ends: {moment(Date.now()).add(props.votingPeriod, 'hours').fromNow()}</b> 
          : <b>Voting has ended.</b>}
      </div>
      <InputGroup className="mb-3">
        <input className='choice-control' type='radio' name='poll-choice' value='0' />
        <label className='form-control'>{props.choice1.length > 0 ? props.choice1 : 'Choice #1' }</label>
      </InputGroup>
      <InputGroup className="mb-3">
        <input className='choice-control' type='radio' name='poll-choice' value='1' />
        <label className='form-control'>{props.choice2.length > 0 ? props.choice2 : 'Choice #2' }</label>
      </InputGroup>
        { props.choice3.length > 0 ?
          <InputGroup className="mb-3">
            <input className='choice-control' type='radio' name='poll-choice' value='2' />
            <label className='form-control'>{props.choice3.length > 0 ? props.choice3 : 'Choice #3' }</label>
          </InputGroup>: null
        }
        { props.choice4.length > 0 ?
          <InputGroup className="mb-3">
            <input className='choice-control' type='radio' name='poll-choice' value='3' />
            <label className='form-control'>{props.choice4.length > 0 ? props.choice4 : 'Choice #4' }</label>
          </InputGroup>: null
        }
    </div>
  </div>
)

export default PollPreview;

/*
class Poll extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const {
      title,
      desc,
      visibility,
      choice1,
      choice2,
      choice3,
      choice4,
      votingPeriod,
      dateCreated
    } = this.props;
    console.log(this.props);
    console.log(moment('2019-10-13T02:29:58.335Z').add(votingPeriod, 'hours') > moment(Date.now()));

    return (
      <div className='poll-wrapper'>
        {visibility == 'private' ?
          <div className='poll-alert'>
            <Alert variant='danger'>
              This is a <b>private</b> poll. Please consider before sharing the link.
            </Alert>
          </div>
        : null }
        <h4 className='poll-title'>{title.length > 0 ? title : 'Untitled'}</h4>
        <hr />
        <div className='poll-desc'>
          <h6>Description</h6>
          <div>
            <p>
              {desc.length > 0 ? desc : <i>No description</i>}
            </p>
            <hr />
            <div className='poll-stat'>
              0 views • {moment(new Date()).format('ll')}
            </div>
          </div>
        </div>
        <hr />
        <div className='poll-choices'>
          <h6><FontAwesomeIcon icon={faPollH} /> Poll Choices</h6>
          <div className='poll-stat mb-3'>
            0 votes • {
              moment(dateCreated).add(votingPeriod, 'hours') > moment(Date.now()) ? 
              <b>Voting ends: {moment(Date.now()).add(votingPeriod, 'hours').fromNow()}</b> 
              : <b>Voting has ended.</b>}
          </div>
          <InputGroup className="mb-3">
            <input className='choice-control' type='radio' name='poll-choice' value='0' />
            <label className='form-control'>{choice1.length > 0 ? choice1 : 'Choice #1' }</label>
          </InputGroup>
          <InputGroup className="mb-3">
            <input className='choice-control' type='radio' name='poll-choice' value='1' />
            <label className='form-control'>{choice2.length > 0 ? choice2 : 'Choice #2' }</label>
          </InputGroup>
            { choice3.length > 0 ?
              <InputGroup className="mb-3">
                <input className='choice-control' type='radio' name='poll-choice' value='2' />
                <label className='form-control'>{choice3.length > 0 ? choice3 : 'Choice #3' }</label>
              </InputGroup>: null
            }
            { choice4.length > 0 ?
              <InputGroup className="mb-3">
                <input className='choice-control' type='radio' name='poll-choice' value='3' />
                <label className='form-control'>{choice4.length > 0 ? choice4 : 'Choice #4' }</label>
              </InputGroup>: null
            }
        </div>
      </div>
    )
  }
}

export default Poll;

*/