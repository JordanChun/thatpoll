import PieChart from 'react-minimal-pie-chart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ResultsPieChart(props) {
  const data = [];
  const labels = [];
  const colors = [
    '#28a745',
    '#3f86a5',
    '#dc4144',
    '#9ca02a',
    '#1bc08a',
    '#356f88',
    '#b45051',
    '#6c6e1e',
    '#48d848',
    '#3f57a5',
    '#dc416f',
    '#a0772a',
    '#219630',
    '#3f85a5',
    '#962e27',
    '#b67520',
    '#54a164',
    '#4e3fa5',
    '#832e30',
    '#c59d1a',
    '#5dc01b',
    '#302497',
    '#dc41ae',
    '#789443',
    '#74c56a',
    '#2a9dce',
    '#b61b1e',
    '#b7be51',
    '#4b8367',
    '#436c7e'];

  for (let i = 0; i < props.results.length; i++) {
    if (props.results[i] !== 0) {
      data.push({
        title: props.choices[i],
        value: props.results[i],
        color: colors[i]
      });
    }
    labels.push({
      title: props.choices[i],
      value: props.results[i],
      color: colors[i]
    });
  }

  let labelPosX = 80;
  if (data.length < 2) {
    labelPosX = -25;
  }
  if (data.length === 0) {
    data.push({
      title: 'No results',
      value: 1,
      color: '#7b7b7b'
    });
    labelPosX = 0;
  }


  return (
    <div className='results-container'>
      <div className='pie-chart-container'>
        <Row>
          <Col md={5} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
           <PieChart
              className='pie-chart'
              animate
              cx={50}
              cy={50}
              label={({ data, dataIndex }) =>
                data[0].color !== '#7b7b7b' ? Math.round(data[dataIndex].percentage) + '%' : data[0].title
              }
              labelPosition={labelPosX}
              labelStyle={{
                fill: 'var(--primaryTextColor)',
                fontWeight: 600,
                fontSize: '0.5rem'
              }}
              data={data}
              lineWidth={40}
            />
          
          </Col>
          <Col>
            <div className='pie-chart-labels'>
              <ul>
                {labels.map((data, i) => (
                  <li key={i}>
                    <div className='label-data'>
                      <h6>{data.title}</h6>
                      <span className='poll-stat'>{data.value.toLocaleString()} votes {data.value === 0 ? '(0%)' : `(${Math.round((data.value/props.combinedResults) * 100)}%)`}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default ResultsPieChart;