import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface LargeChartProps {
  data: { date: string; value: number }[];
  bullish?: boolean;
}

const LargeChart = ({ data, bullish = true }: LargeChartProps) => {
  const color = bullish ? "hsl(145, 100%, 45%)" : "hsl(348, 100%, 55%)";

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="largeChartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="50%" stopColor={color} stopOpacity={0.1} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
          domain={["dataMin - 5", "dataMax + 5"]}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(222, 40%, 9%)",
            border: "1px solid hsl(222, 20%, 18%)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "hsl(210, 40%, 96%)" }}
          itemStyle={{ color }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#largeChartGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LargeChart;
