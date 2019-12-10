import PieChart from 'react-minimal-pie-chart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ResultsPieChart(props) {
  const data = [];
  const labels = [];
  const colors = ['#28a745', '#3f86a5', '#dc4144', '#9ca02a'];
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
        <Row style={{ justifyContent: 'center' }}>
          <Col md={5} lg={3}>
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
          <Col md='auto' sm>
            <div className='pie-chart-labels'>
              {labels.map((data, i) => (
                <div key={i}>
                  <div className='label-box'></div>
                  <div className='label-data'>
                    <h6>{data.title}</h6>
                    <span className='poll-stat'>{data.value.toLocaleString()} votes</span>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default ResultsPieChart;