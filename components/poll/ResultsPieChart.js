import PieChart from 'react-minimal-pie-chart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import colors from '../../common/pollColors';

function ResultsPieChart(props) {
  let empty = false;
  const data = [];
  const labels = [];

  for (let i = 0; i < props.entries.length; i++) {
    if (props.entries[i].result !== 0) {
      data.push({
        title: props.entries[i].choice,
        value: props.entries[i].result,
        color: props.entries[i].color
      });
    }
    labels.push({
      title: props.entries[i].choice,
      value: props.entries[i].result,
      color: props.entries[i].color
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
    empty = true;
  }

  const labelStyle = {
    fill: 'var(--primaryTextColor)',
    fontWeight: 600,
    fontSize: '0.5rem'
  }

  if (data.length > 15) {
    labelStyle.fontSize = '0.4rem';
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
                !empty ? Math.round(data[dataIndex].percentage) + '%' : data[0].title
              }
              labelPosition={labelPosX}
              labelStyle={labelStyle}
              data={data}
              lineWidth={40}
            />
          
          </Col>
          <Col>
            <div className='pie-chart-labels'>
              <ul>
                {labels.map((entry, i) => (
                  <li key={i} style={{ backgroundColor: entry.color }}>
                    <div className='label-entry'>
                      <h6>{entry.title}</h6>
                      <span className='poll-stat'>{entry.value.toLocaleString()} votes {entry.value === 0 ? '(0%)' : `(${Math.round((entry.value/props.combinedResults) * 100)}%)`}</span>
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