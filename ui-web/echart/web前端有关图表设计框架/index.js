import { ChartCard, MiniBar } from 'components/Charts';
import { Tooltip, Icon } from 'antd';
 
const visitData = [
  {
    x: "2017-09-01",
    y: 100
  },
  {
    x: "2017-09-02",
    y: 120
  },
  {
    x: "2017-09-03",
    y: 88
  },
  {
    x: "2017-09-04",
    y: 65
  }
];
 
ReactDOM.render(
  <ChartCard
    title="支付笔数"
    action={
      <Tooltip title="支付笔数反应交易质量">
        <Icon type="exclamation-circle-o" />
      </Tooltip>
    }
    total="6,500"
    contentHeight={46}
  >
    <MiniBar height={46} data={visitData} />
  </ChartCard>,
  mountNode
);