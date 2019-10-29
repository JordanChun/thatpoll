import Layout from '../components/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll, faQuestionCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import PollPreview from '../components/PollPreview';
import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

//TO DO ##############################################
//Validate Poll Inputs

function validatePollInput(pollDataObj) {
  let choices = [pollDataObj.choice1, pollDataObj.choice2];
  if(pollDataObj.choice3 !== '') {
    choices.push(pollDataObj.choice3);
  }
  if(pollDataObj.choice4 !== '') {
    choices.push(pollDataObj.choice4);
  }

  const pollData = {
    title: pollDataObj.title,
    desc: pollDataObj.desc,
    choices: choices,
    visibility: pollDataObj.visibility,
    votingPeriod: pollDataObj.votingPeriod
  }

  return pollData;
}

class CreatePoll extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      desc: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      visibility: 'public',
      votingPeriod: 6,
      dateCreated: new Date()
    }

    this.inputUpdate = this.inputUpdate.bind(this);
    this.visibilityUpdate = this.visibilityUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputUpdate(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  visibilityUpdate(e) {
    this.setState({ visibility: e.target.value });
  }

  async handleSubmit(e, req) {
    e.preventDefault();
    const { origin } = absoluteUrl(req);
    const pollData = validatePollInput(this.state);
    try {
      const res = await fetch(`${origin}/api/create-poll`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pollData)
      });
      const data = await res.json();
      if(data.message === 'success') {
        Router.push(`/poll/${data.url}`);
      }
      console.log(data);
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const {
      title,
      desc,
      choice1,
      choice2,
      choice3,
      choice4,
      votingPeriod,
    } = this.state;

    return (
      <Layout pageTitle='Create Poll'>
        <h4 className='page-header'><FontAwesomeIcon icon={faPoll} /> Create Poll</h4>
        <hr />
        <Form autoComplete='off'>
          <Form.Group>
            <Form.Label>
              Title
            </Form.Label>
            <Form.Control
              value={title}
              onChange={this.inputUpdate}
              type='text' name='title' maxLength='100'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Description (Optional)
            </Form.Label>
            <Form.Control
              value={desc}
              onChange={this.inputUpdate}
              style={{ 'maxHeight': '144px', minHeight: '72px' }}
              as="textarea" rows="3" name='desc' maxLength='400'
            />
            <Form.Text>
              Characters remaining: {400 - desc.length}
            </Form.Text>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                Choice #1
              </Form.Label>
              <Form.Control
                value={choice1}
                onChange={this.inputUpdate}
                type='text' name='choice1' maxLength='50'
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                Choice #2
              </Form.Label>
              <Form.Control
                value={choice2}
                onChange={this.inputUpdate} 
                type='text' name='choice2' maxLength='50'
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                Choice #3 (Optional)
              </Form.Label>
              <Form.Control
                value={choice3}
                onChange={this.inputUpdate}
                type='text' name='choice3' maxLength='50'
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                Choice #4 (Optional)
              </Form.Label>
              <Form.Control
                value={choice4}
                onChange={this.inputUpdate}
                type='text'name='choice4' maxLength='50'
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                Visibility <FontAwesomeIcon icon={faQuestionCircle} />
              </Form.Label>
              <Form.Check
                onClick={this.visibilityUpdate}
                type='radio' label='Public' name='visibility' value='public' defaultChecked
              />
              <Form.Check
                onClick={this.visibilityUpdate}
                type='radio' label='Private' name='visibility' value='private'
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                Voting Period (hours) <FontAwesomeIcon icon={faQuestionCircle} />
              </Form.Label>
              <Form.Control
                value={votingPeriod}
                onChange={this.inputUpdate}
                style={{ maxWidth: '200px' }}
                type='number' min='6' max='72' name='votingPeriod'
              />
              <Form.Text>
                6h - 72h 
              </Form.Text>
            </Form.Group>

          </Form.Row>
          <div className='poll-preview'>
            <h4 className='page-header'><FontAwesomeIcon icon={faEye} /> Preview</h4>
            <hr />
            <PollPreview {...this.state} />
          </div>
          <hr />
          <Form.Group style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button 
              onClick={this.handleSubmit}
              variant='light-blue' type="submit" style={{ width: '200px' }}>
              Create Poll
            </Button>
          </Form.Group>
        </Form>
      </Layout>
    )
  }
}

export default CreatePoll;