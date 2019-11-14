import CustomDropdownToggle from "./CustomDropdownToggle";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

class MainHeaderSettings extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      theme: 'dark'

    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }
  
  componentDidMount() {
    if (localStorage.theme) {
      let theme = localStorage.getItem('theme');
      if (theme !== 'dark' && theme !== 'light') theme = 'dark';
      document.documentElement.setAttribute('data-theme', theme)
      this.setState({ theme });
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }

  toggleTheme(e) {
    const theme = this.state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme)
    this.setState({ theme });
  }

  render() {
    const { className, style } = this.props;

    const { theme } = this.state;

    return (
      <div className={className} style={style}>
        <div>
          <div>Theme</div>
          <Form>
            <Form.Check 
              id='switch-theme'
              type="switch"
              label={theme === 'dark' ? 'Dark' : 'Light' }
              onChange={this.toggleTheme}
            />
          </Form>

        </div>
      </div>
    );
  }
}


export default MainHeaderSettings;