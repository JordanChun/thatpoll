import { Transition } from 'react-transition-group';
import { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';

const defaultStyle = {
  width: 0,
}

const transitionStyles = resultWidth => {
  const style = {
    entering: { width: `${resultWidth}%` },
    entered:  { width: `${resultWidth}%` },
    exited: { width: 0 }
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
      <Transition in={resultsBar} timeout={300} appear exit={false}>
        {state => (
          <div className='results-container'>
            <FlipMove typeName='ul' typeName='ul' easing='ease' staggerDurationBy="15" staggerDelayBy="20" duration={700} maintainContainerHeight>
              {props.entries.map(entry => (
                <li key={entry.color}>
                  <h6>{entry.choice}</h6>
                  <div className='poll-result'>
                    <div className='result-bar'
                      style={{
                        backgroundColor: entry.color,
                        ...defaultStyle,
                        ...transitionStyles(Math.round((entry.result/props.combinedResults) * 100))[state]
                      }}
                    >
                    {entry.result !== 0 ?
                      <div>
                        <div>{entry.result.toLocaleString()} votes</div>
                        <div>{Math.round((entry.result/props.combinedResults) * 100)}%</div>
                      </div>
                    : 
                      <div>
                        <div>0 votes</div>
                        <div>0%</div>
                      </div>
                    }
                    </div>
                  </div>
                </li>
              ))}
            </FlipMove>
          </div>
        )}
      </Transition>
    </div>

  )
}

export default ResultsBars;