'use client' // Recharts requer ambiente de cliente

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// TODO: Tipar os dados de forma mais robusta
interface SimpleBarChartProps {
  data: any[];
  title: string;
  dataKeyX: string;
  dataKeyBar: string;
}

export function SimpleBarChart({ data, title, dataKeyX, dataKeyBar }: SimpleBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* TODO: Adicionar descrição ou filtros? */}
      </CardHeader>
      <CardContent>
        {/* ResponsiveContainer precisa de um pai com altura definida */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={dataKeyX}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                // tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              {/* TODO: Cor da barra deve vir do tema/props */}
              <Bar dataKey={dataKeyBar} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 