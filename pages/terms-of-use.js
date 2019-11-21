import Layout from "../components/Layout";
import { withRouter } from 'next/router'


const TermsOfUse = (props) => (
  <Layout
    pageTitle='StatMix - Terms of Use'
    path={props.router.asPath}
  >
  <h4 className='page-header'>Terms of Use</h4>
  <hr />


  </Layout>
);

export default withRouter(TermsOfUse);