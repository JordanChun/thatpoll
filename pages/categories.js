import Layout from '../components/layout/Layout';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import Table from 'react-bootstrap/Table';
import { withRouter } from 'next/router';

class Categories extends React.Component {
  static async getIntialProps({req}) {
    const { origin } = absoluteUrl(req);
    const res = await fetch(`${origin}/api/v1/categories`, {
      method: 'POST',
    });
    const data = await res.json();
    
    return { categories: data.categoriesData }
  }

  render() {
    const { categories } = this.props;
    return (
      <Layout
        pageTitle='ThatPoll - Categories'
        path={this.props.router.asPath}
      >
        <h4 className='page-header'>Categories</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category Name</th>
              <th># Polls</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => (
              <tr key={i}>
                <td>{category.name}</td>
                <td>{category.polls}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Layout>
    )
  }
}

Categories.defaultProps = {
  categories: []
}

export default withRouter(Categories);