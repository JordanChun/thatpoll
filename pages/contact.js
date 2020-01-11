import Layout from "../components/layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      error: false,
      success: false,
      validated: false,
    }

    this.inputUpdate = this.inputUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ validated: true });
    try {
      const res = await fetch(`${window.location.origin}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: this.state.text
        })
      });

      const data = await res.json();
      if (data.message === 'success') {
          this.setState({
          error: false,
          success: true,
          text: '',
          validated: false
        });
        // display sucess
      } else {
        this.setState({ error: true });
        // display error
      }


    } catch(err) {
        // display error
        this.setState({ error: true });
    }

  }

  render() {
    const { text, error, success, validated } = this.state;
    return (
      <Layout pageTitle={'ThatPoll - Contact Us'}>
        <Container className='main-wrapper'>
          <div className='content-container'>
            <h4 className='page-header'>Contact Us</h4>
            <hr />
            { error ?
              <Alert variant='danger'>
                <b>Error submitting form</b>
              </Alert> : null
            }
            { success ?
              <Alert variant='success'>
                <b>
                  <FontAwesomeIcon icon={faCheck} /> Submittion Received. Thank You
                </b>
              </Alert> : null
            }
            <p>Want to contact us or provide feedback? Please share your thoughts below.</p>
            <Form noValidate validated={validated} autoComplete='off' onSubmit={this.handleSubmit} >
              <Form.Group controlId='validateText'>
                <Form.Label>
                  Text:
                </Form.Label>
                <Form.Control
                  value={text}
                  onChange={this.inputUpdate}
                  style={{ maxHeight: '180px', minHeight: '112px' }}
                  as="textarea" rows="3" name='text' minLength='10' maxLength='500'
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide some text. Min 10 characters.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Button 
                  variant='light-blue' type="submit" style={{ width: '200px' }}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Container>
      </Layout>
    )
  }
}

export default Contact;
