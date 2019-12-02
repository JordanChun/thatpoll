import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faArrowUp, faChevronUp, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import Router from 'next/router';
//import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// function ToggleHistoryCard({ children, eventKey }) {
//   const decoratedOnClick = useAccordionToggle(eventKey);

//   return (
//     <span onClick={decoratedOnClick}>
//       {children}
//     </span>
//   );
// }


function VoteHistory() {
  const [history, setHistory] = useState([]);

  function getHistory() {
    // get history from localstorage
    if (localStorage.voteHistory) {
      const voteHistory = JSON.parse(localStorage.getItem('voteHistory'));
      return voteHistory;
    }
    return [];
  }

  function deleteHistory(e) {
    e.stopPropagation();
  // delete one item from history
  if (localStorage.voteHistory) {
    const index = e.target.parentElement.parentElement.dataset["index"];
    let voteHistory = JSON.parse(localStorage.getItem('voteHistory'));
    voteHistory.splice(index, 1);
    localStorage.voteHistory = JSON.stringify(voteHistory);
    return voteHistory;
  }
}


function clearHistory() {
  //clear all history
  if (localStorage.voteHistory) {
    localStorage.removeItem('voteHistory');
  }
  return [];
}

function redirectToPoll(url) {
  Router.push(`/poll?slug=${url}`, `/poll/${url}`);
}

  useEffect(() => {
    setHistory(getHistory());
  }, []);


  return (
    <Accordion defaultActiveKey="0">
      <Card className='vote-history'>
        <Card.Header>
          <span>Vote History</span>
          <span onClick={() => setHistory(clearHistory())}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
          {/*
            <ToggleHistoryCard eventKey='0'>
              <FontAwesomeIcon icon={faChevronUp} />
            </ToggleHistoryCard>
            */
          }
        </Card.Header>
      <Accordion.Collapse eventKey="0">
        { history.length > 0 ?
          <ListGroup variant="flush">
            {history.map((poll, i) => (
              <ListGroup.Item key={i} onClick={() => redirectToPoll(poll.url)}>
                <Link href={{ pathname: '/poll', query: { slug: poll.url } }} as={`/poll/${poll.url}`}>
                  <a title={poll.title} onClick={e => {e.stopPropagation()}}>{poll.title}</a>
                </Link>
                <span onClick={(e) => setHistory(deleteHistory(e))} data-index={i}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup> 
        : 
        <ListGroup variant='flush'>
            <ListGroupItem>
              <i>No history...</i>
            </ListGroupItem>
          </ListGroup>
        }
      </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default VoteHistory;