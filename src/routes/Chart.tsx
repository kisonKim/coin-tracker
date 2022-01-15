import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string; 
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({coinId}:ChartProps) {
  const {isLoading, data} = useQuery<IHistoricalData[]>(
      ["ohlcv",coinId],
      ()=>fetchCoinHistory(coinId),
      {
        refetchInterval:10000
      }
    )
  return (
    <div>
      {
        isLoading ? "Loading chart..." : 
        <ApexChart type="candlestick" series={[
          {
            name:'Price',
            data:data?.map(item=>([item.time_open,[item.open, item.high, item.low, item.close]]))
          },
        ]} 
        options={{
          theme: {
            mode:"dark"
          },
          chart: {
            height:300,
            width:500,
            toolbar:{show:false},
            background: 'transparent'
          },
          yaxis:{show:false},
          xaxis:{
            axisBorder:{show:false},
            axisTicks:{show:true},
            labels:{show:true},
            type:"datetime",
            categories:data?.map(item => item.time_close)
          },
          fill:{
              type: "gradient",
              gradient: {gradientToColors:["green"],
                          stops:[0,100]
                        }
          },
          colors: ["skyblue"],
          tooltip: {
            y:{
              formatter:(value) => `$ ${value.toFixed(2)}`
            }
          },
          grid:{show:true},
          stroke: {
            curve:"smooth",
            width:3
          }
        }}
        />
      }
    </div>
  )
}

export default Chart;