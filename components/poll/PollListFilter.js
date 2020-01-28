import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArchive, faStopwatch, faVoteYea, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';


function PollListFilter(props) {
  return (
    <div className='filter-container d-flex justify-content-end'>
      <div className='filter-dropdown-container'>
        <FontAwesomeIcon icon={faStopwatch} /> Status: 
        <Dropdown alignRight>
          <Dropdown.Toggle variant='simple' id="dropdown-state" size='sm'>
            {props.query.status !== 'live' && props.query.status !== 'ended' ? 'Any' : props.query.status.charAt(0).toUpperCase() + props.query.status.slice(1) }
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item name='status' eventKey="any" onSelect={props.updateFilter}>Any</Dropdown.Item>
            <Dropdown.Item name='status' eventKey="live" onSelect={props.updateFilter}>Live</Dropdown.Item>
            <Dropdown.Item name='status' eventKey="ended" onSelect={props.updateFilter}>Ended</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='filter-dropdown-container'>
        <FontAwesomeIcon icon={faChartLine} /> Most Votes: 
        <Dropdown alignRight>
          <Dropdown.Toggle variant='simple' id="dropdown-state" size='sm'>
            {getQueryMost(props.query.most)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item name='most' eventKey="today" onSelect={props.updateFilter}>Today</Dropdown.Item>
            <Dropdown.Item name='most' eventKey="week" onSelect={props.updateFilter}>This Week</Dropdown.Item>
            <Dropdown.Item name='most' eventKey="month" onSelect={props.updateFilter}>This Month</Dropdown.Item>
            <Dropdown.Item name='most' eventKey="year" onSelect={props.updateFilter}>This Year</Dropdown.Item>
            <Dropdown.Item name='most' eventKey="all" onSelect={props.updateFilter}>All Time</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

function getQueryMost(query) {
  let most;

  switch (query) {
    case 'today':
      most = 'Today';
      break;
    case 'week':
      most = 'Week';
      break;
    case 'month':
      most = 'Month'
      break;
    case 'year':
      most = 'Year'
      break;
    case 'all':
      most = 'All Time'
      break;
    default:
      most = 'Any'
      break;
  }

  return most;
}

export default PollListFilter;