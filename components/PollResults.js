import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { withRouter } from 'next/router';
import moment from 'moment';
import 'moment-precise-range-plugin';
import getMomentTimelimit from '../helpers/momentFunctions';

const defaultStyle = {
  width: 0,
}

const transitionStyles = resultWidth => {
  const style = {
    entering: { width: `${resultWidth}%` },
    entered:  { width: `${resultWidth}%` },
    exit: { width: 0 }
  }

  return style
};

class PollResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = { resultsBar: false }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ resultsBar: true });
    }, 0)
  }

  render() {
    return (
      <div className='poll-results'>
        <hr />
        <h5><FontAwesomeIcon icon={faChartBar}/> Results</h5>
        { this.props.resultsLoading ?
          <div className='justify-content-center align-items-center' style={{height: '200px', display: 'flex'}}>
            <Spinner animation="grow" variant="light" />
          </div>
          :
          <div>
            <div className='mb-3'>
            { this.props.active ?
              <Button variant='grey-blue' size='sm' onClick={this.props.loadResults}>
                { this.props.refreshResultsLoading ? 
                  <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  /> : null
                }
                Refresh Results
              </Button> : null }
            </div>
            <Transition in={this.state.resultsBar} timeout={300} appear>
              {state => (
                <div className='results-container'>
                    {this.props.results.map((result, i) => (
                      <div key={i}>
                        <h6>{this.props.choices[i]}</h6>
                        <div className='poll-result'>
                          <div className='result-bar mb-3'
                            style={{
                              ...defaultStyle,
                              ...transitionStyles(Math.round((result/this.props.totalVotes) * 100))[state]
                            }}
                          >
                          {result !== 0 ?
                            <div>
                              <div>{result} votes</div>
                              <div>{Math.round((result/this.props.totalVotes) * 100)}%</div>
                            </div>
                          : 
                            <div>
                              <div>0 votes</div>
                              <div>0%</div>
                            </div>
                          }
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Transition>
          </div>
        }
      </div>
    )
  }
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

export default withRouter(PollResults);
