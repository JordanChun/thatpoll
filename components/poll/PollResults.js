import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSync } from "@fortawesome/free-solid-svg-icons";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ResultsBars from "./ResultsBars";
import ResultsPieChart from "./ResultsPieChart";
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function PollResults(props) {
  const [display, setDisplay] = useState('Bar');
  const { results, choices, totalVotes, active, loadResults, refreshResultsLoading } = props;

  function toggleDisplay() {
    display === 'Bar' ? setDisplay('Donut') : setDisplay('Bar');
  }

  return (
    <div className='poll-results'>
      <hr />
      <div className='results-header'>
        <div>
          <h5>
            <FontAwesomeIcon icon={faChartBar} /> Results{' '}
            {active ?
              <Button
                variant='grey-blue'
                size='sm'
                onClick={loadResults}
                style={{ margin: '0 0.5rem' }}
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
          </h5>
        </div>
        <div className='result-display'>
          <b>Display:{" "}</b>{display}
          <Form>
            <Form.Check
              id='switch-result-display'
              type="switch"
              label=''
              onChange={() => toggleDisplay()}
              checked={display === 'Donut' ? false : true}
            />
          </Form>
        </div>

      </div>
      {display === 'Bar' ?
        <ResultsBars
          results={results}
          choices={choices}
          totalVotes={totalVotes}
        /> :
        <ResultsPieChart
          results={results}
          choices={choices}
          totalVotes={totalVotes}
        />
      }
    </div>
  )
}

PollResults.propTypes = {
  totalVotes: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  choices: PropTypes.array.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  refreshResultsLoading: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  loadResults: PropTypes.func.isRequired,
}

export default PollResults;
