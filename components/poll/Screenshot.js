import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
// import domtoimage from 'dom-to-image';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';

class Screenshot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      loading: true,
      disabled: true
    }

    this.closeModal = this.closeModal.bind(this);
    this.generateScreenshot = this.generateScreenshot.bind(this);
    // this.svgToCanvas = this.svgToCanvas.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.html2canvas = require('html2canvas');
      this.setState({ disabled: false });
    }, 1000)
    // this.canvg = require('canvg');
  }

  closeModal() {
    this.setState({ show: false, loading: true });
  }

  generateScreenshot() {    
    this.setState({ show: !this.state.show });

    const pollDoc = document.getElementById('poll');
    let canvasHeight = pollDoc.scrollHeight + 20;
    // remove options section
    canvasHeight -= pollDoc.getElementsByClassName('poll-options-row row no-gutters')[0].scrollHeight;
    // remove screenshot section
    canvasHeight -= pollDoc.getElementsByClassName('content-container')[1].scrollHeight;
    // remove choices
    if (pollDoc.getElementsByClassName('poll-choices').length > 0) {
      //canvasHeight -= 20
      canvasHeight -= pollDoc.getElementsByClassName('poll-choices')[0].scrollHeight;
      if (document.body.clientWidth < 578) {
        canvasHeight += 8;
      }
    }
    // remove time
    if (pollDoc.getElementsByClassName('poll-time').length > 0) {
      canvasHeight -= pollDoc.getElementsByClassName('poll-time')[0].scrollHeight;
    }

    // for media query
    if (document.body.clientWidth < 578) {
      canvasHeight += 46;
      const containers = document.getElementsByClassName('content-container');
      Array.from(containers).forEach(container => {
        container.style.padding = '2rem';
      });
    }

    document.getElementById('poll').style.width = '1140px';
    const bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

    this.html2canvas(document.getElementById('poll'),
      { scale: 1,
        useCORS: true,
        foreignObjectRendering: true,
        backgroundColor: bgColor,
        windowWidth: 1200,
        windowHeight: document.getElementById('poll').scrollHeight,
        height: canvasHeight,
        //width: document.getElementById('poll').scrollWidth + 40,
        width: 1180,
        x: 0,
        y: 0,
        scrollY: 0,
        onclone: doc => {
          const pollDiv = doc.getElementById('poll');
          pollDiv.style.padding = '20px';
          // pollDiv.style.width = '1140px';
          
          const resultsHeader = doc.getElementsByClassName('results-header');
          resultsHeader[0].children[0].style.display = 'inline-block';
          
          const containers = pollDiv.getElementsByClassName('content-container');
          containers[0].style.height = containers[0].scrollHeight - document.getElementsByClassName('poll-options-row row no-gutters')[0].scrollHeight + 'px';
          if (document.getElementsByClassName('poll-choices').length > 0) {
            containers[1].style.height = containers[1].scrollHeight - document.getElementsByClassName('poll-choices')[0].scrollHeight + 'px';
          }
          if (document.getElementsByClassName('poll-time').length > 0) {
            containers[1].getElementsByClassName('poll-vote-time')[0].style.height = containers[1].getElementsByClassName('poll-vote-time')[0].scrollHeight - document.getElementsByClassName('poll-time')[0].scrollHeight + 'px';
            containers[1].style.height = containers[1].scrollHeight - 20 + 'px';
          }
          
          // for media query
          if (document.body.clientWidth < 578) {
            containers[0].style.height = containers[0].scrollHeight + 24 + 'px';
          }

          Array.from(containers).forEach(container => {
            container.style.boxShadow = 'none';
          });

          // const multiplyRatio = 1140/containers[0].scrollWidth;

          // Array.from(pollDiv.getElementsByTagName("*")).forEach(el => {
          //   if (el.className !== 'result-bar') {
          //     el.style.width = el.scrollWidth * multiplyRatio + 'px';
          //   }
          // });

        }
      }).then(canvas => {
        document.getElementById('poll').style.width = 'auto';
        if (document.body.clientWidth < 578) {
          const containers = document.getElementsByClassName('content-container');
          Array.from(containers).forEach(container => {
            container.style.removeProperty('padding');
          });
        }

        var img = new Image();
        img.src = canvas.toDataURL("image/jpeg", 1);
        img.style.width = '100%'
        // img.style.height = '80vh';
        document.getElementById('generated-screenshot').appendChild(img);
        this.setState({ loading: false });
        document.getElementById('download-img').href = img.src;
        document.getElementById('download-img').download = document.title.replace(/[^a-zA-Z0-9 ]/g, "");
      });
    }

    viewImg() {
      window.open(document.getElementById('generated-screenshot').firstChild.src, '');
      return false;
    }
    
  //   svgToCanvas() {
  //     const pollDiv = document.getElementById('poll');
  //     const svgElements = pollDiv.querySelectorAll('svg');
  //     svgElements.forEach(el => {
  //       let curSvg = el;
  //       let canvas;
  //       let xml;
    
  //     // Size and color needed for every browser
  //     curSvg.style.width = curSvg.getBoundingClientRect().width;
  //     curSvg.style.height = curSvg.getBoundingClientRect().height;
  //     curSvg.style.fill = 'black';
    
  //     canvas = document.createElement('canvas');
  //     canvas.className = 'screenShotTempCanvas';
  //     xml = new XMLSerializer().serializeToString(curSvg);

  //     this.canvg.Canvg.from(canvas, xml);
  //     curSvg.parentNode.insertBefore(canvas, curSvg.nextSibling);

  //     //curSvg.style.display = 'none';
  //   });
  // }

  render() {
    return (
      <div className='content-container' data-html2canvas-ignore style={{ textAlign: 'center' }}>
        <h5><FontAwesomeIcon icon={faCamera} /> Generate Image</h5>
        <p>Create an image of this poll with <b>only</b> the necesary data and elements.</p>
        <Button variant='grey-blue' onClick={this.generateScreenshot} disabled={this.state.show || this.state.disabled}>
          <FontAwesomeIcon icon={faCamera} /> Generate Image
        </Button>
        <Modal
          size='lg'
          show={this.state.show}
          onHide={this.closeModal}
          centered
          className='generated-screenshot-modal'
        >
          <Modal.Body>
            {this.state.loading ?
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spinner animation="border" size="lg" aria-hidden="true" />
              </div> : null
            }
            <div id='generated-screenshot'>

            </div>
          </Modal.Body>
          {!this.state.loading ?
            <Modal.Footer>
              <div>
                <div>
                  <p><b>Note:</b> Image may look burry when not viewed in full size</p>
                  <p><b>Chrome:</b> Right Click > Open image in new tab</p>
                </div>
                <div>
                  <a onClick={this.viewImg} href="#">
                    <Button style={{ marginRight: '0.5rem' }}><FontAwesomeIcon icon={faExpand} /> View Full Size</Button>
                  </a>
                  <a id='download-img' download>
                    <Button variant='success'><FontAwesomeIcon icon={faDownload} /> Save Image</Button>
                  </a>
                </div>
              </div>
            </Modal.Footer>
          : null}

        </Modal>
      </div>
    )
  }
}

export default Screenshot;