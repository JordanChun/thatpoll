import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { ReportButtonDropdown } from '../Report';
import CustomDropdownToggle from '../layout/CustomDropdownToggle';


function redirectToPoll(slug) {
  Router.push(`/poll?slug=${slug}`, `/poll/${slug}`).then(() => window.scrollTo(0, 0));
}

const PollCard = props => (
  <div
    className='poll-card-container'
    onClick={() => redirectToPoll(props.poll.url)}
    >
    <div className='d-flex justify-content-between'>
      <Link href={{ pathname: '/poll', query: { slug: props.poll.url } }} as={`/poll/${props.poll.url}`}>
        <a>
          <h6
            className='poll-card-title'
            onClick={(e) => {e.stopPropagation()}}
            title={props.poll.title}  
          >
            {props.poll.title}
          </h6>
        </a>
      </Link>
      <div className='tag-active'>
        <span>{props.poll.active ? <b style={{ color: 'red' }}>LIVE</b> : <b>ENDED</b>}</span>
      </div>
    </div>
    {props.poll.desc.length > 0 ?
      <div>
        <hr />
        <div className='poll-card-desc'>
          <p>{props.poll.desc}</p>
        </div>
      </div> : null }
    <hr />
    <div className='poll-card-actions'>
      <div className='align-items-center'>
        <FontAwesomeIcon icon={faVoteYea} />
        <div className='poll-stat' style={{ marginLeft: '0.5rem' }}>
          <span>{props.poll.totalVotes.toLocaleString()} votes • {props.poll.dateCreated}</span>
        </div>
      </div>
      <div className='poll-card-actions-options' onClick={(e) => {e.stopPropagation()}}>
        <div className='poll-card-actions-compact'>
          <Dropdown alignRight>
            <Dropdown.Toggle as={CustomDropdownToggle} id="poll-card-options-compact">
              <FontAwesomeIcon icon={faEllipsisV} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <ReportButtonDropdown urlref={props.poll.url} polltitle={props.poll.title} />
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