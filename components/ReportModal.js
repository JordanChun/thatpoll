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
    e.preventDefault()
    if (this.state.reason.length <= 0 || this.state.category === 0) {
      this.setState({ error: true });
      return;
    } else {
      try {
        const res = await fetch(`${window.location.origin}/api/report`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Origin': 'statmix'
          },
          body: JSON.stringify({
            reason: this.state.reason,
            category: this.state.category,
            urlRef: this.props.urlref
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
      }

    }
  }

  render() {
    const { reason, error, success } = this.state;
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
            <Alert variant='success'>
              <b>
                <FontAwesomeIcon icon={faCheck} /> Report Recieved. Thank You
              </b>
            </Alert> : null
          }
          <div className='report-details mb-3'>
            <h6>Poll Title</h6>
            <div>
              {this.props.title}
            </div>
          </div>
          <p>Please describe the reason for this report below.</p>
          <Form autoComplete='off'>
            <Form.Group>
              <Form.Label>
                Category
              </Form.Label>
              <Form.Control
                onChange={this.updateCategory}
                as="select"
                name='category'
              >
                <option>Select a category</option>
                <option>Abuse</option>
                <option>Bug</option>
                <option>Spam</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Reason:
              </Form.Label>
              <Form.Control
                value={reason}
                onChange={this.inputUpdate}
                style={{ 'maxHeight': '144px', minHeight: '72px' }}
                as="textarea" rows="3" name='reason' maxLength='500'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {success ?
            <Button variant='grey-blue' onClick={this.props.onHide}>Close</Button>
          : 
            <Button variant='light-blue' type='submit' onClick={this.submitReport}>Submit</Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

ReportModal.propTypes = {
  onHide: PropTypes.func.isRequired
}

export default ReportModal;