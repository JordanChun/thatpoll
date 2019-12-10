import { Transition } from 'react-transition-group';
import { useState, useEffect } from 'react';

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

function ResultsBars(props){
  const [resultsBar, setResultsBar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setResultsBar(true);
    }, 0)
  },[]);

  return (
    <div>
      <Transition in={resultsBar} timeout={300} appear>
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
                    {result !== 0 ?
                      <div>
                        <div>{result.toLocaleString()} votes</div>
                        <div>{Math.round((result/props.totalVotes) * 100)}%</div>
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

  )
}

export default ResultsBars;