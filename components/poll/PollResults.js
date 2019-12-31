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
  const { results, combinedResults, choices, active, loadResults, refreshResultsLoading } = props;

  const handleChange = val => setDisplay(val);

  return (
    <div className='poll-results'>
      <hr />
      <div className='results-header'>
        <div>
          <h4>
            <FontAwesomeIcon icon={faChartBar} /> Results{' '}
            {active ?
              <Button
                variant='grey-blue'
                size='sm'
                onClick={loadResults}
                disabled={refreshResultsLoading}
              >
                <FontAwesomeIcon icon={faSync} /> Refresh
              </Button> : null}
            {refreshResultsLoading ?
              <Spinner
                animation="border"
                size="sm"
                aria-hidden="true"
              /> : null
            }
          </h4>
        </div>
        <div className='result-display'>
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
          results={results}
          choices={choices}
          combinedResults={combinedResults}
          /> :
          <ResultsPieChart
          results={results}
          choices={choices}
          combinedResults={combinedResults}
        />
      }
    </div>
  )
}

PollResults.propTypes = {
  results: PropTypes.array.isRequired,
  combinedResults: PropTypes.number.isRequired,
  choices: PropTypes.array.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  refreshResultsLoading: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  loadResults: PropTypes.func.isRequired,
}

export default PollResults;
