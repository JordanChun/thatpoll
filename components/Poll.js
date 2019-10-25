import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPollH } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const {
      title,
      desc,
      visibility,
      choices,
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
          {choices.map((choice, i) => (
            <InputGroup className="mb-3">
              <input className='choice-control' type='radio' name='poll-choice' value={i} />
              <label className='form-control'>{choice}</label>
            </InputGroup>
          ))}
        </div>
      </div>
    )
  }
}

export default Poll;