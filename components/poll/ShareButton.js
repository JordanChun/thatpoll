import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function ShareButton(props) {
  const [showToolTip, setShowToolTip] = useState(false);
  const target = useRef(null);

  function copyToClipboard(e) {
    target.current.select();
    target.current.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    setShowToolTip(true)
    setTimeout(() => {
      setShowToolTip(false);
    }, 1200)
  }

  return (
    <div className='share-poll'>
      <InputGroup size='sm'>
        <FormControl
          readOnly
          value={props.url}
          ref={target} 
        />
        <Overlay target={target.current} show={showToolTip} placement="top">
          {props => (
            <Tooltip id="tooltip-copied" {...props} show={showToolTip.toString()}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
        <InputGroup.Append>
          <Button variant="grey-blue" onClick={(e) => copyToClipboard(e)}>
            <FontAwesomeIcon icon={faClipboard}/> Copy
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}


export default ShareButton;