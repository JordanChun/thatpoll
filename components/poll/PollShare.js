import ShareButton from './ShareButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faReddit } from '@fortawesome/free-brands-svg-icons';

let windowOpenParams = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=680,height=350,left=100,top=100`;

const PollShare = props => (
  <div className='share-buttons mb-2'>
    <a
      title='Facebook'
      className='social-buttons'
      style={{ backgroundColor: '#4267B2' }}
      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`, '_blank', windowOpenParams)}
    >
      <FontAwesomeIcon icon={faFacebookF} />
    </a>
    <a
      title='Twitter'
      className='social-buttons'
      style={{ backgroundColor: '#1b95e0' }}
      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${document.title}&url=${location.href}`, '_blank', windowOpenParams)}
      >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
    <a 
      title='Reddit'
      className='social-buttons'
      style={{ backgroundColor: '#ff4500' }}
      onClick={() => window.open(`https://www.reddit.com/submit?url=${location.href}`, '_blank', windowOpenParams)}
    >
      <FontAwesomeIcon icon={faReddit} />
    </a>
    <ShareButton url={props.url} />
  </div>
);

export default PollShare;