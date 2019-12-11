import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';

const CookiesBanner = ({ closeBanner }) => (
  <div className='cookies-banner'>
    <Container>
      We use cookies to make interactions with our websites and services easy and meaningful, to better understand how they are used and to tailor advertising. You can read more by visiting{' '}
      <Link href='/privacy-policy' as='/privacy-policy'>
        <a className='link'>Privacy Policy</a>
      </Link>. By continuing to use this site you are giving us your consent to do this.
    </Container>
    <div onClick={closeBanner}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  </div> 
  )

export default CookiesBanner;