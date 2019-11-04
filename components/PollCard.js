import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faShare, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import CompactOptionsToggle from '../components/CompactOptionsToggle';

const PollCard = props => (
  <div className='poll-card-container' key={props.poll.url}>
    <Link href={`/poll/${props.poll.url}`}>
      <a>
        <h6 className='poll-card-title'>
          {props.poll.title}
        </h6>
      </a>
    </Link>
    <hr />
    <div className='poll-card-desc'>
      {props.poll.desc.length > 0 ? <p>{props.poll.desc}</p> : <i>No Description</i> }
    </div>
    <hr />
    <div className='poll-card-actions'>
      <div>
        <Link href={{ pathname: '/poll', query: { slug: props.poll.url } }} as={`/poll/${props.poll.url}`}>
          <a>
            <Button variant="grey-blue" size="sm">
              View Poll
            </Button>
          </a>
        </Link>
        <div className='poll-stat' style={{ lineHeight: '2.5', marginLeft: '0.75rem' }}>
          <span>{props.poll.totalVotes} votes • {props.poll.dateCreated}</span>
        </div>
      </div>
      <div className='poll-card-actions-options'>
        <div>
          <span>
            <FontAwesomeIcon icon={faFlag} /> Report
          </span>
        </div>
        <div className='poll-card-actions-compact'>
          <Dropdown alignRight>
            <Dropdown.Toggle as={CompactOptionsToggle} id="dropdown-custom-components">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Button}>
                <FontAwesomeIcon icon={faFlag} /> Report
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
);

export default PollCard;