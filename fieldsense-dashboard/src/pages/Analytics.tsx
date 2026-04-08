import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Download, FileText } from "lucide-react";

const generateHistoricalData = (days: number) =>
  Array.from({ length: days }, (_, i) => ({
    label: days <= 7 ? `Day ${i + 1}` : days <= 30 ? `Day ${i + 1}` : `Week ${Math.floor(i / 7) + 1}`,
    moisture: Math.round(40 + Math.sin(i * 0.4) * 20 + Math.random() * 10),
    temperature: Math.round((26 + Math.cos(i * 0.3) * 10 + Math.random() * 4) * 10) / 10,
    humidity: Math.round(50 + Math.sin(i * 0.35) * 15 + Math.random() * 8),
  }));

export default function Analytics() {
  const [period, setPeriod] = useState("week");
  const data = useMemo(() => generateHistoricalData(period === "day" ? 24 : period === "week" ? 7 : 30), [period]);

  const report = `Over the past ${period === "day" ? "24 hours" : period === "week" ? "week" : "month"}, soil moisture levels dropped below optimal thresholds ${Math.floor(Math.random() * 5 + 2)} times. Temperature remained above 30°C for extended periods on ${Math.floor(Math.random() * 3 + 1)} occasions, indicating increased irrigation demand. Humidity levels stayed within acceptable range for ${Math.floor(Math.random() * 30 + 60)}% of the monitoring period. Auto-irrigation was triggered ${Math.floor(Math.random() * 8 + 3)} times to maintain crop health.`;

  const charts = [
    { key: "moisture", title: "Soil Moisture Trends", color: "hsl(200, 70%, 50%)" },
    { key: "temperature", title: "Temperature Trends", color: "hsl(15, 80%, 55%)" },
    { key: "humidity", title: "Humidity Trends", color: "hsl(160, 50%, 45%)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm">Historical data & insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {charts.map((chart) => (
          <Card key={chart.key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`analytics-${chart.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chart.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chart.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey={chart.key} stroke={chart.color} fill={`url(#analytics-${chart.key})`} strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" /> AI-Generated Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm leading-relaxed">{report}</p>
          </div>
          <Button variant="outline" size="sm" className="mt-3 gap-1">
            <Download className="h-3.5 w-3.5" /> Download Report (PDF)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
