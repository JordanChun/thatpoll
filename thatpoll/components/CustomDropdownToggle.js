class CustomDropdownToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <span onClick={this.handleClick}>
        {this.props.children}
      </span>
    );
  }
}

export default CustomDropdownToggle;