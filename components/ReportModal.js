import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

class ReportModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: '',
      category: 0,
      error: false,
      success: false,
      validated: false
    }

    this.inputUpdate = this.inputUpdate.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.submitReport = this.submitReport.bind(this);
  }

  inputUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateCategory(e) {
    this.setState({ category: e.target.selectedIndex });
  }

  async submitReport(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ validated: true });

    try {
      const res = await fetch(`${window.location.origin}/api/v1/report`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reason: this.state.reason,
          category: this.state.category,
          urlRef: this.props.urlref,
          title: this.props.polltitle
        })
      });

      const data = await res.json();
      if (data.message === 'success') {
          this.setState({
          error: false,
          success: true,
          reason: '',
          category: 0,
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
    const { reason, error, success, validated } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        centered
        animation={false}
        dialogClassName="modal-report"
        onClick={e => e.stopPropagation()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { error ?
            <Alert variant='danger'>
              <b>Error submitting report</b>
            </Alert> : null
          }
          { success ?
            <div>
              <Alert variant='success'>
                <b>
                  <FontAwesomeIcon icon={faCheck} /> Report Received. Thank You.
                </b>
              </Alert>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <Button variant='grey-blue' onClick={this.props.onHide}>Close</Button>
              </div>
            </div>
            : 
            <div>
              <div className='report-details mb-3'>
                <h6>Poll Title</h6>
                <div>
                  {this.props.polltitle}
                </div>
              </div>
              <p>Please describe the reason for this report below.</p>
              <Form noValidate validated={validated} autoComplete='off'>
                <Form.Group>
                  <Form.Label>
                    Category
                  </Form.Label>
                  <Form.Control
                    onChange={this.updateCategory}
                    as="select"
                    name='category'
                  >
                    <option>Abuse</option>
                    <option>Bug</option>
                    <option>Spam</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='validateReason'>
                  <Form.Label>
                    Reason:
                  </Form.Label>
                  <Form.Control
                    value={reason}
                    onChange={this.inputUpdate}
                    style={{ maxHeight: '144px', minHeight: '72px' }}
                    as="textarea" rows="3" name='reason' minLength='5' maxLength='500'
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a reason. Min 5 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </div>
          }
          </Modal.Body>
          { success ? null :
            <Modal.Footer>
              <Button variant='light-blue' type='submit' onClick={this.submitReport}>Submit</Button>
            </Modal.Footer> }
      </Modal>
    );
  }
}

ReportModal.propTypes = {
  onHide: PropTypes.func.isRequired
}

export default ReportModal;