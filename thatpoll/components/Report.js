import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReportModal from './ReportModal';

function ReportButton(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='report'>
      <Button size='sm' variant='simple' onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faFlag}/> Report
      </Button>
      <ReportModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

function ReportButtonDropdown(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='report' onClick={() => setModalShow(true)}>
      <FontAwesomeIcon icon={faFlag}/> Report
      <ReportModal
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export { ReportButton, ReportButtonDropdown };