import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

function setQueryString(query) {
  let queryString = '';
  for (let i = 0; i < Object.keys(query).length; i++) {
    let name = Object.keys(query)[i];
    let value = query[Object.keys(query)[i]];
    
    if (name !== 'page' && value !== undefined && value !== '') {
      queryString += `&${name}=${value}`;
    }
  }
  return queryString
}

const PollPagination = props => {
  const { state } = props.router.query;
  let active;
  if (props.router.query.page) {
    active = props.router.query.page;
  } else {
    active = 1;
  }
  let items = [];
  let offset = 0;

  // go to prev page
  if (active > 3) {
    offset = active - 3;
    items.push(
      <li className='page-item' key='prev'>
        <Link href={{ pathname: '/discover', query: { page: active - 1, state: state } }} as={`?page=${active - 1}${setQueryString(props.router.query)}`}>
          <a className="page-link" role="button">
            <span aria-hidden="true">‹</span>
            <span className="sr-only">Previous</span>
          </a>
        </Link>
      </li>
    )
  }
  
  const totalItems = props.totalItems;
  let totalPages = Math.ceil(totalItems/10);
  if (totalPages === 0) totalPages = 1;
  active = Math.min(Math.max(active, 1), totalPages);
  // max offset = total pages - max pagination items
  offset = Math.min(Math.max(offset, 0), Math.max((totalPages - 5), 0));
  //offset = Math.min(Math.max(offset, 0), (totalPages - 5));
  

  for (let i = 1; i <= 5; i++) {
    if (i > totalPages) break;
    if ((i + offset) === active) {
      items.push(
        <li className="page-item active" key={i}>
          <Link href={{ pathname: '/discover', query: { page: i + offset, state: state } }} as={`?page=${i + offset}${setQueryString(props.router.query)}`} replace>
            <a className='page-link'>{i + offset}</a>
          </Link>
          <span className="sr-only">(current)</span>
        </li>
      );
    } else {
      items.push(
        <li className="page-item" key={i}>
          <Link href={{ pathname: '/discover', query: { page: i + offset, state: state } }} as={`?page=${i + offset}${setQueryString(props.router.query)}`} replace>
            <a className="page-link">{i + offset}</a>
          </Link>
        </li>
      )
    }
  }

  // go to next page
  if (active < totalPages - 2) {
    items.push(
      <li className='page-item' key='next'>
        <Link href={{ pathname: '/discover', query: { page: active + 1 } }} as={`?page=${active + 1}${setQueryString(props.router.query)}`}>
          <a className="page-link" role="button">
            <span aria-hidden="true">›</span>
            <span className="sr-only">Next</span>
          </a>
        </Link>
      </li>
    )
  }

  return (
    <Pagination>
      {items}
    </Pagination>
  )
}

PollPagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
}

export default withRouter(PollPagination);