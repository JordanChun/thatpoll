import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { PageTransition } from 'next-page-transitions'
import { withRouter } from 'next/router';

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

    this.state = {
      resultsBar: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({resultsBar: true});
    }, 0)
  }

  render() {
    return (
      <div className='poll-results'>
        <h5><FontAwesomeIcon icon={faChartBar}/> Results</h5>
        { this.props.resultsLoading ?
          <div className='justify-content-center align-items-center' style={{height: '200px', display: 'flex'}}>
            <Spinner animation="grow" variant="light" />
          </div>
          :
          <div>
            <div className='poll-stat mb-3'>
              <b>{this.props.totalVotes} votes</b> • <b>{this.props.timelimit}</b>
            </div>
            <div className='mb-3'>
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
              </Button>
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
                            <div>
                              {result !== 0 ?
                                `${result} votes • ${Math.round((result/this.props.totalVotes) * 100).toFixed(2)}%`
                                : '0 votes • 0.00%' }
                            </div>
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

export default withRouter(PollResults);

/*
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
        <Transition in={props.revealResults} timeout={300} appear mountOnEnter unmountOnExit>
          {state => (
            <div className='results-container'>
                {props.results.map((result, i) => (
                  <div key={i}>
                    <h6>{props.choices[i]}</h6>
                    <div className='poll-result'>
                      <div className='result-bar mb-3'
                        style={{
                          ...defaultStyle,
                          ...transitionStyles(Math.round((result/props.totalVotes) * 100))[state]
                        }}
                      >
                        <div>
                          {result !== 0 ?
                            `${result} votes • ${Math.round((result/props.totalVotes) * 100).toFixed(2)}%`
                            : '0 votes • 0.00%' }
                        </div>
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
);

PollResults.propTypes = {
  loadResults: PropTypes.func
}

export default withRouter(PollResults);

*/
/*
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
          </ReactCSSTransitionGroup>
          </div>
        </div>
      }
    </div>
  );

  */