import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll, faCog, faCertificate } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomDropdownToggle from './CustomDropdownToggle';
import MainHeaderSettings from './MainHeaderSettings';

const MainHeader = () => (
  <header className='header-wrapper'>
    <Container>
      <Navbar bg="dark-blue" variant="dark" expand='sm'>
        <Link href='/' as='/'>
          <a>
            <Navbar.Brand style={{ padding: 0 }}>
              <img src='/public/img/ThatPoll_Logo.png' alt='ThatPoll Logo' height='32px' />
            </Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item className='create-poll-item'>
              <Link href='/' as='/'>
                <a>
                  <FontAwesomeIcon icon={faPoll} /> Create Poll
                </a>
              </Link>
            </Nav.Item>
            <Nav.Item className='small-menu'>
              <Link href='/' as='/'>
                <a>
                  <FontAwesomeIcon icon={faPoll} /> Create Poll
                </a>
              </Link>
            </Nav.Item>
            <Nav.Item className='small-menu'>
              <Link href='/explore' as='/explore'>
                <a>
                  <FontAwesomeIcon icon={faCertificate} /> Explore
                </a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href='/explore' as='/explore'>
                <a><FontAwesomeIcon icon={faCertificate} /> Explore</a>
              </Link>
            </Nav.Item>
          {/*
            <Nav.Item>
              <Link href='/categories'>
                <a>Categories</a>
              </Link>
            </Nav.Item>
          */}
          </Nav>
          <Nav>
            <Nav.Item>
              <Dropdown className='header-settings' alignRight>
                <Dropdown.Toggle as={CustomDropdownToggle} id="dropdown-custom-components">
                  <FontAwesomeIcon icon={faCog} /> Settings
                </Dropdown.Toggle>

                <Dropdown.Menu as={MainHeaderSettings}>
                  {/*
                  <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                  */}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  </header>
)

export default MainHeader;