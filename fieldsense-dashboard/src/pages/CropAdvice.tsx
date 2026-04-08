import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Wind, AlertTriangle, CheckCircle } from "lucide-react";
import { cropData } from "@/lib/mockData";

export default function CropAdvice() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crop Advice</h1>
        <p className="text-muted-foreground text-sm">Expert growing guides for each crop</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cropData.map((crop) => (
          <Card key={crop.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3 farm-gradient">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{crop.emoji}</span>
                  {crop.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-muted">
                  <Droplets className="h-4 w-4 mx-auto text-chart-moisture mb-1" />
                  <p className="text-xs text-muted-foreground">Water</p>
                  <p className="text-xs font-medium">{crop.moisture.ideal}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <Thermometer className="h-4 w-4 mx-auto text-chart-temperature mb-1" />
                  <p className="text-xs text-muted-foreground">Temp</p>
                  <p className="text-xs font-medium">{crop.temperature.ideal}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted">
                  <Wind className="h-4 w-4 mx-auto text-chart-humidity mb-1" />
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="text-xs font-medium">{crop.humidity.ideal}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">💧 Water Requirements</p>
                <p className="text-sm">{crop.water}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">⚠️ Common Mistakes</p>
                <ul className="space-y-1">
                  {crop.mistakes.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-3 w-3 mt-0.5 text-warning shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">✅ Best Practices</p>
                <ul className="space-y-1">
                  {crop.practices.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 mt-0.5 text-success shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
