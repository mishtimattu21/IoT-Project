import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Wind, Lightbulb } from "lucide-react";
import { cropData } from "@/lib/mockData";

export default function CropManagement() {
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const crop = cropData.find((c) => c.name === selectedCrop) || cropData[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crop Management</h1>
        <p className="text-muted-foreground text-sm">Configure thresholds per crop</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Select Crop</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-64"><SelectValue /></SelectTrigger>
            <SelectContent>
              {cropData.map((c) => (
                <SelectItem key={c.name} value={c.name}>{c.emoji} {c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Ideal Soil Moisture", value: crop.moisture.ideal, icon: Droplets, min: crop.moisture.min, max: crop.moisture.max, current: 65 },
          { label: "Ideal Temperature", value: crop.temperature.ideal, icon: Thermometer, min: crop.temperature.min, max: crop.temperature.max, current: 28 },
          { label: "Ideal Humidity", value: crop.humidity.ideal, icon: Wind, min: crop.humidity.min, max: crop.humidity.max, current: 60 },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
              <p className="text-xl font-bold mb-2">{item.value}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Min: {item.min}</span>
                  <span>Max: {item.max}</span>
                </div>
                <Progress value={((item.current - item.min) / (item.max - item.min)) * 100} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Lightbulb className="h-4 w-4" /> Smart Crop Insight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
            <p className="text-sm leading-relaxed">{crop.emoji} {crop.insight}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
