import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';

class MainHeaderSettings extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      theme: 'light'
    };
    
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  
  componentDidMount() {
    // get theme
    // if theme not light or dark set theme to light and set cookie
    let theme = Cookies.get('theme');
    if (theme !== 'light' && theme !== 'dark') {
      theme = 'light';
      Cookies.set('theme', theme, { expires: 365 });
    } else {
      this.setState({ theme });
    }
  }
  
  toggleTheme() {
    let theme = Cookies.get('theme');
    theme = theme === 'light' ? 'dark' : 'light';
    Cookies.set('theme', theme, { expires: 365 });
    document.documentElement.setAttribute('data-theme', theme)
    this.setState({ theme });
  }

  render() {
    const { className, style } = this.props;
    const { theme } = this.state;

    return (
      <div className={className} style={style}>
        <h6>Settings</h6>
        <div className="dropdown-divider"></div>
        <div>
          <div>
            Theme: {theme === 'light' ? 'Light' : 'Dark' }
          </div>
          <Form>
            <Form.Check 
              id='switch-theme'
              type="switch"
              label=''
              onChange={this.toggleTheme}
              checked={theme === 'light' ? false : true }
            />
          </Form>

        </div>
      </div>
    );
  }
}


export default MainHeaderSettings;