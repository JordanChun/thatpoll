import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSync, faChartPie, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ResultsBars from "./ResultsBars";
import ResultsPieChart from "./ResultsPieChart";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState } from "react";

function PollResults(props) {
  const [display, setDisplay] = useState('Bar');
  const { entries, combinedResults, active, loadResults, refreshResultsLoading } = props;

  const handleChange = val => setDisplay(val);

  return (
    <div className='poll-results'>
      <hr />
      <div className='results-header mb-2'>
        <div>
          <h4>
            <FontAwesomeIcon icon={faChartBar} /> Results{' '}
          </h4>
          {active ?
            <Button variant='grey-blue' size='sm'
            data-html2canvas-ignore
              onClick={loadResults}
              disabled={refreshResultsLoading} >
              <FontAwesomeIcon icon={faSync} /> Refresh
            </Button> : null}
          {refreshResultsLoading ?
            <Spinner animation="border" size="sm" aria-hidden="true" /> : null
          }
        </div>
        <div className='result-display' data-html2canvas-ignore>
          <ToggleButtonGroup type="radio" name='displays' value={display} onChange={handleChange}>
            <ToggleButton value='Bar' className='btn-sm'>
              <FontAwesomeIcon icon={faAlignLeft} /> Bar</ToggleButton>
            <ToggleButton value='Donut' className='btn-sm'>
              <FontAwesomeIcon icon={faChartPie} /> Donut</ToggleButton>
          </ToggleButtonGroup>
        </div>

      </div>
      {display === 'Bar' ?
        <ResultsBars
          entries={entries}
          combinedResults={combinedResults}
        /> :
        <ResultsPieChart
          entries={entries}
          combinedResults={combinedResults}
        />
      }
    </div>
  )
}

PollResults.propTypes = {
  entries: PropTypes.array.isRequired,
  combinedResults: PropTypes.number.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  refreshResultsLoading: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  loadResults: PropTypes.func.isRequired,
}

export default PollResults;
