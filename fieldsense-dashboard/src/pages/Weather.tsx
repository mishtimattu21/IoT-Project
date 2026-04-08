import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, Sun, CloudRain, AlertTriangle, Info } from "lucide-react";
import { weatherData } from "@/lib/mockData";

const alertIconMap = { info: Info, warning: AlertTriangle };

export default function Weather() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Weather</h1>
        <p className="text-muted-foreground text-sm">Current conditions & forecast</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Temperature", value: `${weatherData.temperature}°C`, icon: Thermometer },
          { label: "Feels Like", value: `${weatherData.feelsLike}°C`, icon: Thermometer },
          { label: "Humidity", value: `${weatherData.humidity}%`, icon: Droplets },
          { label: "Rain Chance", value: `${weatherData.rainProbability}%`, icon: CloudRain },
          { label: "Wind", value: `${weatherData.windSpeed} km/h`, icon: Wind },
          { label: "UV Index", value: `${weatherData.uvIndex}`, icon: Sun },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-4 text-center">
              <item.icon className="h-5 w-5 mx-auto text-primary mb-2" />
              <p className="text-lg font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weatherData.forecast.map((day) => (
              <div key={day.day} className="text-center p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <p className="text-xs font-medium mb-1">{day.day}</p>
                <p className="text-2xl mb-1">{day.icon}</p>
                <p className="text-sm font-bold">{day.temp}°C</p>
                <p className="text-xs text-muted-foreground">💧{day.rain}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">🤖 Smart Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weatherData.suggestions.map((s, i) => {
            const Icon = alertIconMap[s.type];
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${s.type === "warning" ? "text-warning" : "text-primary"}`} />
                <p className="text-sm">{s.text}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
