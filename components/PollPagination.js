import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';

const PollPagination = props => {
  let active = props.active;
  let items = [];
  let offset = 0;

  if (active > 3 ) {
    offset = active - 3;
    items.push(
      <li className='page-item' key='prev'>
        <Link href={{ pathname: '/page', query: { num: active - 1 } }} as={`/page/${active - 1}`}>
          <a className="page-link" role="button">
            <span aria-hidden="true">‹</span>
            <span className="sr-only">Previous</span>
          </a>
        </Link>
      </li>
    )
  }
  
  const totalItems = props.totalItems;
  const totalPages = Math.ceil(totalItems/10);
  active = Math.min(Math.max(active, 1), totalPages);
  // max offset = total pages - max pagination items
  offset = Math.min(Math.max(offset, 0), totalPages - 5); 
  
  for (let i = 1; i <= 5; i++) {
    if ((i + offset) === active) {
      items.push(
        <li className="page-item active" key={i}>
          <span className="page-link">
            <Link href={{ pathname: '/page', query: { num: i + offset } }} as={`/page/${i + offset}`}>
              <a>{i + offset}</a>
            </Link>
            <span className="sr-only">(current)</span>
          </span>
        </li>
      );
    } else {
      items.push(
        <li className="page-item" key={i}>
          <Link href={{ pathname: '/page', query: { num: i + offset } }} as={`/page/${i + offset}`}>
            <a className="page-link">{i + offset}</a>
          </Link>
        </li>
      )
    }
  }

  /*

  for (let i = 1; i <= 5; i++) {
    items.push(
      <Pagination.Item key={i} active={(i+offset) === active}>
        <Link href={{ pathname: '/page', query: { num: i + offset } }} as={`/page/${i + offset}`}>
          <a>{i + offset}</a>
        </Link>
      </Pagination.Item>
    );
  }
  */ 

  if (active < totalPages - 2) {
    items.push(
      <li className='page-item' key='next'>
        <Link href={{ pathname: '/page', query: { num: active + 1 } }} as={`/page/${active + 1}`}>
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

export default PollPagination;