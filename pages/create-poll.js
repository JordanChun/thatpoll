import Layout from '../components/Layout';
import PollPreview from '../components/PollPreview';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll, faQuestionCircle, faEye, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';
import { withRouter } from 'next/router';
import CategoriesList from '../helpers/CategoriesList';
import Cookies from 'js-cookie';
import getMomentTimelimit from '../helpers/momentFunctions';

const visibilityTooltip = props => (
  <div
    {...props}
    style={{
      maxWidth: '400px',
      backgroundColor: '#1c2c40',
      padding: '0.5rem 0.75rem',
      color: '#e6e6e6',
      borderRadius: '0.25rem',
      ...props.style,
    }}
  >
    Set whether to allow the public to see this poll or keep it private.
    Only those with the URL will be able to access the poll if set private.
  </div>
);

const votingPeriodTooltip = props => (
  <div
    {...props}
    style={{
      maxWidth: '400px',
      backgroundColor: '#1c2c40',
      padding: '0.5rem 0.75rem',
      color: '#e6e6e6',
      borderRadius: '0.25rem',
      ...props.style,
    }}
  >
    Set in hours when the poll will expire.
  </div>
);

function validatePollInput(pollDataObj) {
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
    category: pollDataObj.category
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
      validated: false,
      timelimit: ' 6 hours'
    }

    this.inputUpdate = this.inputUpdate.bind(this);
    this.visibilityUpdate = this.visibilityUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTimePeriod = this.updateTimePeriod.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.setHourPreset = this.setHourPreset.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
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

  visibilityUpdate(e) {
    this.setState({ visibility: e.target.value });
  }

  async handleSubmit(e, req) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ validated: true });

    const { origin } = absoluteUrl(req);
    const publicAccessToken = Cookies.get('publicAccessToken');
    const pollData = validatePollInput(this.state);
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
      if(data.message === 'success') {
        Router.push(`/poll?slug=${data.url}`, `/poll/${data.url}`)
      } else {
        this.setState({ error: true });
        window.scrollTo({
          top: 56,
          left: 0,
          behavior: 'smooth'
        });
      }
      //console.log(data);
    } catch(err) {
      //console.log(err)
      // display error
      this.setState({ error: true });
    }
  }

  updateTimePeriod(e) {
    const timelimit = getMomentTimelimit(new Date(), e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      timelimit: timelimit
    });
  }

  setHourPreset(e) {
    const timelimit = getMomentTimelimit(new Date(), e.target.dataset['hours']);
    this.setState({ votingPeriod: e.target.dataset['hours'], timelimit: timelimit });
    
  }

  addChoice() {
    if (this.state.choices.length < 4) {
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
      votingPeriod,
      error,
      validated
    } = this.state;

    return (
      <Layout
        pageTitle='Create Poll'
        path={this.props.router.asPath}
      >
        <h4 className='page-header'><FontAwesomeIcon icon={faPoll} /> Create Poll</h4>
        <hr />
        { error ?
          <Alert variant='danger'>
           <b>Error submitting poll</b>
          </Alert> : null
        }
        <Form noValidate validated={validated} autoComplete='off' onSubmit={this.handleSubmit} style={{ padding: '1rem' }}>
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
          {choices.map((choiceObj, i) => (
            <Form.Group key={i} controlId={`validateChoice${i}`}>
              <Form.Label>
                Choice #{i+1}
              </Form.Label>
              {i > 1 ? 
                <ButtonGroup size='sm' style={{ marginLeft: '0.5rem' }}>
                  <Button variant="grey-blue" data-index={i} onClick={this.removeChoice}>
                    <FontAwesomeIcon icon={faMinus} /> Remove choice
                  </Button>
                </ButtonGroup> : null }
              <Form.Control
                value={choiceObj.choice}
                data-index={i}
                onChange={this.updateChoice}
                type='text' minLength='1' maxLength='75'
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a choice or remove it. Duplicate choices are <b>not</b> allowed. Min 1 characters.
              </Form.Control.Feedback>
            </Form.Group>
          ))}
          <ButtonGroup size="sm" className='mb-3'>
            <Button variant="grey-blue" onClick={this.addChoice} disabled={choices.length === 4}>
              <FontAwesomeIcon icon={faPlus} /> Add choice
            </Button>
          </ButtonGroup>

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
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                Visibility{" "}
                <OverlayTrigger
                    placement="top-start"
                    delay={{ show: 250, hide: 400 }}
                    overlay={visibilityTooltip}>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </OverlayTrigger>
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
            <Form.Group as={Col} controlId='validateVotingPeriod'>
              <Form.Label>
                Voting Period (hours){" "}
                <OverlayTrigger
                  placement="top-start"
                  delay={{ show: 250, hide: 400 }}
                  overlay={votingPeriodTooltip}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                value={votingPeriod}
                onChange={this.updateTimePeriod}
                style={{ maxWidth: '200px' }}
                type='number' min='6' max='168' name='votingPeriod'
                className="mb-1"
                required
              />
              <ButtonGroup size="sm">
                <Button variant="grey-blue" onClick={this.setHourPreset} data-hours='24'>1 day</Button>
                <Button variant="grey-blue" onClick={this.setHourPreset} data-hours='72'>3 days</Button>
                <Button variant="grey-blue" onClick={this.setHourPreset} data-hours='168'>7 days</Button>
              </ButtonGroup>
              <Form.Control.Feedback type="invalid">
                Voting period must be a minimum of 6 hours and a maximum of 168 hours.
              </Form.Control.Feedback>
              <Form.Text>
                6h - 168h (7 days) 
              </Form.Text>
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
        <div className='poll-preview'>
          <h4 className='page-header'><FontAwesomeIcon icon={faEye} /> Preview</h4>
          <hr />
          <PollPreview {...this.state} />
        </div>
      </Layout>
    )
  }
}

export default withRouter(CreatePoll);