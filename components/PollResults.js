import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const PollResults = props => (
  <div className='poll-results'>
    <h5><FontAwesomeIcon icon={faChartBar}/> Results</h5>
    { props.resultsLoading ?
      <div className='justify-content-center align-items-center' style={{height: '200px', display: 'flex'}}>
        <Spinner animation="grow" variant="light" />
      </div>
      :
      <div>
        <div className='poll-stat mb-3'>
          <b>{props.totalVotes} votes</b> • <b>{props.timelimit}</b>
        </div>
        <div className='mb-3'>
          <Button variant='grey-blue' size='sm' onClick={props.loadResults}>
            { props.refreshResultsLoading ? 
              <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              /> : null
            }
             Refresh Results
          </Button>
        </div>
        <div className='results-container'>
          {props.results.map((result, i) => (
            <div key={i}>
              <h6>{props.choices[i]}</h6>
              <div className='poll-result'>
                <div 
                  className='result-bar mb-3'
                  style={{width: `${Math.round((result/props.totalVotes) * 100)}%`}}
                >
                  <div>
                    {result !== 0 ?
                      `${result} votes • ${Math.round((result/props.totalVotes) * 100).toFixed(2)}%`
                      :
                      '0 votes • 0.00%'
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }
  </div>
);

PollResults.propTypes = {
  loadResults: PropTypes.func
}

export default PollResults;