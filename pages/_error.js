import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Router from 'next/router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


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
      case 404:
        response = (
          <Layout pageTitle='Page Not Found'>
            <Container>
              <div className='error-container'>
                <h4 className='page-header'>404 Page Not Found</h4>
                <Button variant='grey-blue' onClick={() => Router.back()}>Go back</Button>
              </div>
            </Container>
          </Layout>
        )
        break
      case 500:
        response = (
          <Layout pageTitle='Internal Server Error'>
            <Container>
              <div className='error-container'>
                <h4 className='page-header'>500 Internal Server Error</h4>
                <Button variant='grey-blue' onClick={() => Router.back()}>Go back</Button>
              </div>
            </Container>
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