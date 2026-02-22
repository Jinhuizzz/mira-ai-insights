import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  data: number[];
  bullish?: boolean;
  width?: number;
  height?: number;
}

const SparklineChart = ({ data, bullish = true, width = 80, height = 32 }: SparklineChartProps) => {
  const chartData = data.map((value, index) => ({ value, index }));
  const color = bullish ? "hsl(145, 100%, 45%)" : "hsl(348, 100%, 55%)";

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={`gradient-${bullish ? "bull" : "bear"}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#gradient-${bullish ? "bull" : "bear"})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;
