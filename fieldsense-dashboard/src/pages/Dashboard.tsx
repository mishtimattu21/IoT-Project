import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from "recharts";
import { Droplets, Thermometer, Wind, Power, AlertTriangle, CheckCircle, Info, Zap } from "lucide-react";
import { generateSensorData, generateTimeSeriesData, alerts, getStatusColor } from "@/lib/mockData";

const statusColorMap = {
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

const statusBorderMap = {
  success: "border-l-success",
  warning: "border-l-warning",
  destructive: "border-l-destructive",
};

const alertIconMap = {
  warning: AlertTriangle,
  danger: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const alertColorMap = {
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-primary",
  success: "text-success",
};

export default function Dashboard() {
  const [sensorData, setSensorData] = useState(generateSensorData());
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData());
  const [manualOverride, setManualOverride] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateSensorData());
      setTimeSeriesData((prev) => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          moisture: Math.round(35 + Math.sin(Date.now() * 0.001) * 15 + Math.random() * 8),
          temperature: Math.round((25 + Math.cos(Date.now() * 0.0008) * 8 + Math.random() * 3) * 10) / 10,
          humidity: Math.round(55 + Math.sin(Date.now() * 0.0009) * 12 + Math.random() * 6),
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const moistureStatus = getStatusColor(sensorData.soilMoisture, "moisture");
  const tempStatus = getStatusColor(sensorData.temperature, "temperature");
  const humidityStatus = getStatusColor(sensorData.humidity, "humidity");

  const irrigationDecision =
    sensorData.soilMoisture < 40 || sensorData.temperature > 35
      ? "Irrigation ON (Soil Dry + High Temp)"
      : "Irrigation OFF (Conditions Optimal)";

  const sensorCards = [
    { title: "Soil Moisture", value: `${sensorData.soilMoisture}%`, icon: Droplets, status: moistureStatus, progress: sensorData.soilMoisture },
    { title: "Temperature", value: `${sensorData.temperature}°C`, icon: Thermometer, status: tempStatus, progress: (sensorData.temperature / 50) * 100 },
    { title: "Humidity", value: `${sensorData.humidity}%`, icon: Wind, status: humidityStatus, progress: sensorData.humidity },
    { title: "Pump Status", value: sensorData.pumpStatus ? "ON" : "OFF", icon: Power, status: sensorData.pumpStatus ? "success" : "warning" as const, progress: sensorData.pumpStatus ? 100 : 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Real-time monitoring & control</p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensorCards.map((card, i) => (
          <Card key={card.title} className={`border-l-4 ${statusBorderMap[card.status as keyof typeof statusBorderMap]} animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{card.title}</span>
                </div>
                <Badge className={`${statusColorMap[card.status as keyof typeof statusColorMap]} text-xs`}>
                  {card.status === "success" ? "OK" : card.status === "warning" ? "⚠" : "⚠️"}
                </Badge>
              </div>
              <p className="text-2xl font-bold sensor-pulse">{card.value}</p>
              <Progress value={card.progress} className="mt-2 h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { key: "moisture", title: "Soil Moisture", color: "hsl(200, 70%, 50%)", unit: "%" },
          { key: "temperature", title: "Temperature", color: "hsl(15, 80%, 55%)", unit: "°C" },
          { key: "humidity", title: "Humidity", color: "hsl(160, 50%, 45%)", unit: "%" },
        ].map((chart) => (
          <Card key={chart.key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id={`grad-${chart.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chart.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chart.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey={chart.key} stroke={chart.color} fill={`url(#grad-${chart.key})`} strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Control Panel + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" /> Irrigation Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Manual Override</span>
              <Switch checked={manualOverride} onCheckedChange={setManualOverride} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto Mode</span>
              <Badge variant={autoMode ? "default" : "secondary"}>{autoMode ? "Active" : "Disabled"}</Badge>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground mb-1">System Decision</p>
              <p className="text-sm font-medium">{irrigationDecision}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">🤖 AI Suggestion</p>
              <p className="text-sm">Water your crops in the next 1 hour — soil moisture dropping rapidly.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Smart Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = alertIconMap[alert.type];
                return (
                  <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Icon className={`h-4 w-4 mt-0.5 ${alertColorMap[alert.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
