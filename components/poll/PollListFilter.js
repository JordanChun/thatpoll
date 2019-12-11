import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';


function PollListFilter(props) {
  return (
    <div className='filter-container'>
      <div style={{ lineHeight: 1.8, marginRight: '0.5rem' }}>
        <FontAwesomeIcon icon={faFilter} /> Filter
      </div>
      <Dropdown alignRight>
        <Dropdown.Toggle variant='simple' id="dropdown-state" size='sm'>
          {props.query.state !== 'live' && props.query.state !== 'ended' ? 'Any Voting' : props.query.state.charAt(0).toUpperCase() + props.query.state.slice(1) } State
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="any" onSelect={props.updateFilter}>Any</Dropdown.Item>
          <Dropdown.Item eventKey="live" onSelect={props.updateFilter}>Live</Dropdown.Item>
          <Dropdown.Item eventKey="ended" onSelect={props.updateFilter}>Ended</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default PollListFilter;