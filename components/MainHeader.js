import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/free-solid-svg-icons';

const MainHeader = () => (
  <header className='header-wrapper'>
    <Container>
      <Navbar bg="dark-blue" variant="dark" expand='sm'>
        <Link href='/'>
          <a>
            <Navbar.Brand style={{ padding: 0 }}>
              <img src='/img/StatMix_Logo.png' alt='StatMix Logo' height='32px' />
            </Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          {/*
            <Nav.Item>
              <Link href='/categories'>
                <a>Categories</a>
              </Link>
            </Nav.Item>
          
          */}
          </Nav>
          <Nav>
            <Nav.Item style={{'marginLeft': '10px'}}>
                <Link href='/create-poll'>
                  <Button variant="grey-blue">
                    <a>
                      <FontAwesomeIcon icon={faPoll} /> Create Poll
                    </a>
                  </Button>
                </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  </header>
)

export default MainHeader;