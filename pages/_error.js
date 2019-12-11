import Layout from '../components/layout/Layout';
import { withRouter } from 'next/router';
import Router from 'next/router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ErrorLayout = props => (
  <Container>
    <div className='error-container'>
      <h4 className='page-header'>{props.errorCode} {props.errorInfo}</h4>
      <Button variant='grey-blue' onClick={() => Router.back()}>Go back</Button>
    </div>
  </Container>
);

class ErrorPage extends React.Component {

  static propTypes() {
    return {
      errorCode: React.PropTypes.number.isRequired,
    }
  }

  static getInitialProps({res, xhr}) {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return {errorCode}
  }

  render() {
    var response
    switch (this.props.errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 401:
        response = (
          <Layout pageTitle='Not Authorized'>
            <ErrorLayout
              errorCode={this.props.errorCode}
              errorInfo='Not Authorized'  
            />
          </Layout>
        )
        break
      case 404:
        response = (
          <Layout pageTitle='Page Not Found'>
            <ErrorLayout
              errorCode={this.props.errorCode}
              errorInfo='Page Not Found'  
            />
          </Layout>
        )
        break
      case 500:
        response = (
          <Layout pageTitle='Internal Server Error'>
            <ErrorLayout
              errorCode={this.props.errorCode}
              errorInfo='Internal Server Error'  
            />
          </Layout>
        )
        break
      default:
        response = (
          <Layout pageTitle='An Error Occured'>
            <Container>
              <div className='error-container'>
                <h4 className='page-header'>An error occured while trying to access this page.</h4>
                <Button variant='grey-blue' onClick={() => Router.back()}>Go back</Button>
              </div>
            </Container>
          </Layout>
        )
    }

    return response
  }

}

export default withRouter(ErrorPage)