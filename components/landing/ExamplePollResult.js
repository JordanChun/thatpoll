import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faStopwatch, faChartBar, faAlignLeft, faChartPie } from '@fortawesome/free-solid-svg-icons';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState, useEffect } from 'react';
import getTimeLimit from '../../common/momentFunctions';
import { addMinutes } from 'date-fns';
import ResultsBars from '../poll/ResultsBars';
import ResultsPieChart from '../poll/ResultsPieChart';

const exmapleEntries = [
  {"choice":"Choice #1","result":0,"color":"#28a745"},
  {"choice":"Choice #2","result":0,"color":"#3f86a5"},
  {"choice":"Choice #3","result":0,"color":"#dc4144"},
  {"choice":"Choice #4","result":0,"color":"#9ca02a"}
];

function ExamplePollResult() {
  const [totalVotes, setTotalVotes] = useState(0);
  const [timelimit, setTimelimit] = useState('1 hours');
  const [entries, setEntries] = useState(exmapleEntries);
  const [display, setDisplay] = useState('Bar');

  const endDate = addMinutes(new Date(), 60);
  const handleChange = val => setDisplay(val);


  useEffect(() => {
    setTimelimit(getTimeLimit(endDate));
    let updateTimelimit = setInterval(() => {
      let newTimelimit = getTimeLimit(endDate);
      setTimelimit(newTimelimit)
    }, 60000);
    
    let randomResults = setInterval(() => {
      const randomEntryPosition = Math.floor(Math.random() * entries.length);
      const newEntries = entries;
      newEntries[randomEntryPosition].result++;
      newEntries.sort((a, b) => b.result - a.result);
      setEntries(newEntries);
      setTotalVotes(newEntries.reduce((total, current) => total + current.result, 0))
    }, 3000);

    if (endDate === addMinutes(new Date(), 120)) {
      clearInterval(updateTimelimit);
      clearInterval(randomResults);
    }

    return () => {
      clearInterval(updateTimelimit);
      clearInterval(randomResults);
    }
  },[])

  return (
    <Container>
      <div className='content-container'>
        <div className='poll-time mb-3'>
          <div>
            <h5>
              <FontAwesomeIcon icon={faVoteYea} /> <b>{totalVotes.toLocaleString()}</b> votes
            </h5>
            <h5>
              <FontAwesomeIcon icon={faStopwatch} /> <b>{timelimit}</b>
            </h5>
          </div>
        </div>
        <div className='poll-results'>
          <hr />
          <div className='results-header'>
            <div>
              <h4>
                <FontAwesomeIcon icon={faChartBar} /> Results{' '}
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
              entries={entries}
              combinedResults={totalVotes}
            /> :
            <ResultsPieChart
              entries={entries}
              combinedResults={totalVotes}
            />
          }
        </div>

      </div>
    </Container>
  )
}

export default ExamplePollResult;