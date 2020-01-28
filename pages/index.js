import Layout from '../components/layout/Layout';
// import PollPreview from '../components/poll/PollPreview';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll, faEye, faPlus, faMinus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';
import { withRouter } from 'next/router';
import CategoriesList from '../common/CategoriesList';
import getTimeLimit from '../common/momentFunctions';
import { setHours, addMinutes, setMinutes, isSameDay, format, addYears } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Container from 'react-bootstrap/Container';

function combinePollData(pollDataObj) {
  let choicesArr = [];
  for (let i = 0; i < pollDataObj.choices.length; i++) {
    if (pollDataObj.choices[i].choice !== '') {
      choicesArr.push(pollDataObj.choices[i].choice);
    }
  }

  const pollData = {
    title: pollDataObj.title,
    desc: pollDataObj.desc,
    choices: choicesArr,
    visibility: pollDataObj.visibility,
    votingPeriod: pollDataObj.votingPeriod,
    category: pollDataObj.category,
    multiIp: pollDataObj.multiIp,
    multiChoice: pollDataObj.multiChoice,
    maxSelectChoices: pollDataObj.maxSelectChoices,
    pollExpires: pollDataObj.pollExpires,
    endDate: pollDataObj.endDate
  }

  return pollData;
}

class CreatePoll extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      desc: '',
      choices: [
        { choice: '' },
        { choice: '' },
      ],
      visibility: 'public',
      votingPeriod: 6,
      dateCreated: new Date(),
      category: 0,
      error: false,
      duplicate: false,
      validated: false,
      timelimit: '',
      createLimit: false,
      multiIp: false,
      multiChoice: false,
      maxSelectChoices: 2,
      success: false,
      pollExpires: false,
      endDate: ''
    }

    this.inputUpdate = this.inputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTimePeriod = this.updateTimePeriod.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    // switches
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.toggleMultiIp = this.toggleMultiIp.bind(this);
    this.toggleMultiChoice = this.toggleMultiChoice.bind(this);
    this.togglePollExpires = this.togglePollExpires.bind(this);
  }

  inputUpdate(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateChoice(e) {
    const choices = this.state.choices.slice();
    choices[e.target.dataset['index']].choice = e.target.value;
    this.setState({ choices: choices });
  }

  updateCategory(e) {
    this.setState({ category: e.target.selectedIndex });
  }

  toggleMultiIp() {
    this.setState({ multiIp: !this.state.multiIp });
  }

  toggleMultiChoice() {
    this.setState({ multiChoice: !this.state.multiChoice });
  }

  togglePollExpires() {
    if (!this.state.pollExpires) {
      const timelimit = getTimeLimit(addMinutes(new Date(), 60));
      this.setState({
        endDate: addMinutes(new Date(), 60),
        timelimit: timelimit,
        pollExpires: true
      });
    } else {
      this.setState({ pollExpires: false });
    }
  }

  toggleVisibility(e) {
    if (this.state.visibility === 'public') {
      this.setState({ visibility: 'private' });
    } else {
      this.setState({ visibility: 'public' });
    }
  }

  async handleSubmit(e, req) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ validated: true, error: false, duplicate: false });

    const { origin } = absoluteUrl(req);
    const pollData = combinePollData(this.state);
    try {
      const res = await fetch(`${origin}/api/v1/create-poll`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pollData)
      });
      const data = await res.json();

      switch (data.message) {
        case 'error':
          this.setState({ error: true });
          break;
        case 'duplicate':
          this.setState({ duplicate: true });
          break;
        case 'limit':
          this.setState({ createLimit: true });
          break;
        default:
          this.setState({ success: true });
          Router.push(`/poll?slug=${data.url}`, `/poll/${data.url}`).then(() => window.scrollTo(0, 0));
      } 
        window.scrollTo({ top: 56, left: 0, behavior: 'smooth' });

    } catch(err) {
      this.setState({ error: true });
    }
  }

  updateTimePeriod(date) {
    const timelimit = getTimeLimit(date);
    this.setState({ endDate: date, timelimit: timelimit });
  }

  addChoice() {
    if (this.state.choices.length < 30) {
      const choices = this.state.choices.slice();
      choices.push({ choice: '' });
      this.setState({ choices: choices })
    }
  }

  removeChoice(e) {
    if (this.state.choices.length > 2) {
      const choices = this.state.choices.slice();
      choices.splice(e.target.dataset['index'], 1);
      this.setState({ choices: choices })
    }
  }

  render() {
    const {
      title,
      desc,
      choices,
      error,
      validated,
      createLimit,
      visibility,
      multiIp,
      multiChoice,
      duplicate,
      success,
      maxSelectChoices,
      timelimit,
      endDate,
      pollExpires
    } = this.state;

    return (
      <Layout
        pageTitle='ThatPoll - Instant Poll Maker'
        path={this.props.router.asPath}
        ads={true}
      >
        <Container className='main-wrapper'>
          <div className='content-container'>
          <h4 className='page-header'><FontAwesomeIcon icon={faPoll} /> Create Poll - Instant Poll Maker</h4>
          <hr />
          { error ?
            <Alert variant='danger'>
            <b>Error submitting poll</b>
            </Alert> : null }
          { createLimit ?
            <Alert variant='warning'>
            <b>You have reached the limit for now. Please try again in a few hours.</b>
            </Alert> : null }
          { duplicate ? <Alert variant='danger'>
            <b>Duplicate choices found</b>
            </Alert> : null }
          { success ? <Alert variant='success'>
            <b>Success!</b>
            </Alert> : null }
          <Form noValidate validated={validated} autoComplete='off' onSubmit={this.handleSubmit}>
            <Form.Group controlId="validationTitle">
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control
                value={title}
                onChange={this.inputUpdate}
                type='text' name='title' minLength='3' maxLength='120'
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a title. Min 3 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Description (Optional)
              </Form.Label>
              <Form.Control
                value={desc}
                onChange={this.inputUpdate}
                style={{ maxHeight: '144px', minHeight: '72px' }}
                as="textarea" rows="3" name='desc' maxLength='500'
              />
              <Form.Text>
                Characters remaining: {500 - desc.length}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Category (Optional)
              </Form.Label>
              <Form.Control
                onChange={this.updateCategory}
                as="select"
                name='category'
              >
              <option>Select a category</option>
              {CategoriesList.map((category, i) => (
                <option key={i}>{category}</option>
              ))}
              </Form.Control>
            </Form.Group>
            {choices.map((choiceObj, i) => (
              <Form.Group key={i} controlId={`validateChoice${i}`}>
                <Form.Label>
                  Choice #{i+1}
                </Form.Label>
              {i > 1 ?
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <Button variant="grey-blue" data-index={i} onClick={this.removeChoice}><FontAwesomeIcon icon={faMinus} /></Button>
                  </InputGroup.Prepend>
                  <FormControl value={choiceObj.choice}
                    data-index={i}
                    onChange={this.updateChoice}
                    type='text' minLength='1' maxLength='75' required />
                </InputGroup> :
                <Form.Control
                  value={choiceObj.choice}
                  data-index={i}
                  onChange={this.updateChoice}
                  type='text' minLength='1' maxLength='75'
                  required /> }

                <Form.Control.Feedback type="invalid">
                  Please provide a choice or remove it. Duplicate choices are <b>not</b> allowed. Min 1 characters.
                </Form.Control.Feedback>
              </Form.Group>
            ))}
            <ButtonGroup size="sm" className='mb-3'>
              <Button variant="grey-blue" onClick={this.addChoice} disabled={choices.length === 30}>
                <FontAwesomeIcon icon={faPlus} /> Add choice
              </Button>
            </ButtonGroup>
            <h5>Options</h5>
            <hr />
            <Form.Row className='create-poll-options'>
              <Form.Group as={Col}>
                <Form.Check
                  id='switch-visibility'
                  type="switch"
                  label='Make this poll private '
                  onChange={() => this.toggleVisibility()}
                  checked={visibility === 'public' ? false : true}
                />
                <p>Set whether to allow the public to see this poll. (Direct link only)</p>
                <Form.Check
                  id='switch-multiple-ip'
                  type="switch"
                  label='Allow multiple votes from the same network'
                  onChange={() => this.toggleMultiIp()}
                  checked={multiIp === true ? true : false}
                />
                <p>Turns off the IP address filter and allow users which share the same network to vote.</p>
                <Form.Check
                  id='switch-multiple-choices'
                  type="switch"
                  label='Allow multiple choices to be selected'
                  onChange={() => this.toggleMultiChoice()}
                  checked={multiChoice === true ? true : false}
                />
                <p>Allows multiple choices to be selected.</p>
                { multiChoice ?
                <div>
                  <Form.Label>
                    Max Selectable Choices
                  </Form.Label>
                  <Form.Control
                    value={maxSelectChoices}
                    onChange={this.inputUpdate}
                    style={{ maxWidth: '200px' }}
                    type='number' min='2' max={choices.length} name='maxSelectChoices'
                    className="mb-1"
                    />
                </div> : null }
              </Form.Group>
              <Form.Group as={Col} controlId='validatePollExpires'>
                <Form.Check
                  id='switch-voting-period'
                  type="switch"
                  label='Set voting expiration date and time.'
                  onChange={() => this.togglePollExpires()}
                  checked={pollExpires ? true : false}
                  />
                { pollExpires ?
                  <div>
                    <DatePicker
                      inline
                      calendarClassName="end-date-calender"
                      selected={endDate}
                      onChange={date => this.updateTimePeriod(date)}
                      minDate={addMinutes(new Date(), 30)}
                      maxDate={addYears(new Date(), 10)}
                      minTime={isSameDay(addMinutes(new Date(), 30), endDate) ? addMinutes(new Date(), 30) : new Date().setHours(0, 0, 0)}
                      maxTime={isSameDay(addYears(new Date(), 10), endDate) ? new Date() : setHours(setMinutes(new Date(), 30), 23)}
                      showTimeSelect
                    />
                    {endDate >= addMinutes(new Date(), 30) && endDate <= addYears(addMinutes(new Date(), 30), 10)?
                      <div>
                        <p>Voting ends in: <b>{timelimit}</b> on <b>{format(endDate, 'MMMM do, yyyy, p')}</b></p>
                      </div> :
                      <div className='invalid-feedback' style={{ display: 'block' }}>
                        <p><b>Please select a valid date and time to end. Minimum 30 minutes.</b></p>
                      </div> }
                  </div> : null
                }
              </Form.Group>
            </Form.Row>
            <hr />
            <Form.Group style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button 
                variant='light-blue' type="submit" style={{ width: '200px' }}>
                Create Poll
              </Button>
            </Form.Group>
          </Form>
          </div>
          {/*
          <div className='poll-preview'>
            <h4 className='page-header'><FontAwesomeIcon icon={faEye} /> Preview</h4>
            <hr />
            <PollPreview {...this.state} />
          </div>

          */}
        </Container>
      </Layout>
    )
  }
}

export default withRouter(CreatePoll);

