import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import CompactOptionsToggle from '../components/CompactOptionsToggle';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { ReportButton, ReportButtonDropdown } from './Report';


function redirectToPoll(e, slug) {
  Router.push(`/poll/${slug}`)
}

const PollCard = props => (
  <div
    className='poll-card-container'
    key={props.poll.url}
    onClick={(e) => redirectToPoll(e, props.poll.url)}
    >
    <Link href={{ pathname: '/poll', query: { slug: props.poll.url } }} as={`/poll/${props.poll.url}`}>
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
      <div className='poll-card-actions-options' onClick={(e) => {e.stopPropagation()}}>
        <div>
          <ReportButton urlref={props.poll.url} />
        </div>
        <div className='poll-card-actions-compact'>
          <Dropdown alignRight>
            <Dropdown.Toggle as={CompactOptionsToggle} id="dropdown-custom-components">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <ReportButtonDropdown urlref={props.poll.url} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
);

PollCard.propTypes = {
  poll: PropTypes.object.isRequired
}

export default PollCard;