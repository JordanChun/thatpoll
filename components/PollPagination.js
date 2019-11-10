import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

const PollPagination = props => {
  let active;
  if (props.router.query.page) {
    active = props.router.query.page;
  } else {
    active = 1;
  }
  let items = [];
  let offset = 0;

  if (active > 3) {
    offset = active - 3;
    items.push(
      <li className='page-item' key='prev'>
        <Link href={{ pathname: '/', query: { page: active - 1 } }} as={`?page=${active - 1}`}>
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
          <span className="page-link">
            <Link href={{ pathname: '/', query: { page: i + offset } }} as={`?page=${i + offset}`}>
              <a>{i + offset}</a>
            </Link>
            <span className="sr-only">(current)</span>
          </span>
        </li>
      );
    } else {
      items.push(
        <li className="page-item" key={i}>
          <Link href={{ pathname: '/', query: { page: i + offset } }} as={`?page=${i + offset}`}>
            <a className="page-link">{i + offset}</a>
          </Link>
        </li>
      )
    }
  }

  if (active < totalPages - 2) {
    items.push(
      <li className='page-item' key='next'>
        <Link href={{ pathname: '/', query: { page: active + 1 } }} as={`?page=${active + 1}`}>
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