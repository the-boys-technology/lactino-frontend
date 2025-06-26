import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

interface Props {
  data: { tipo: string; quantidade: number }[];
}

export default function GraficoInsumos({ data }: Props) {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="quantidade"
            nameKey="tipo"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={30}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.tipo} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
