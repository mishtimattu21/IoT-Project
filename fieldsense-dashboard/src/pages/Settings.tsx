import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Moon, Bell, Droplets, Thermometer, Zap } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [moistureThreshold, setMoistureThreshold] = useState([40]);
  const [tempThreshold, setTempThreshold] = useState([35]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your experience</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Appearance</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <Label>Dark Mode</Label>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Notifications</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Label>Push Notifications</Label>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Irrigation</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <Label>Auto Irrigation</Label>
            </div>
            <Switch checked={autoIrrigation} onCheckedChange={setAutoIrrigation} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Moisture Threshold</Label>
              </div>
              <span className="text-sm font-medium">{moistureThreshold[0]}%</span>
            </div>
            <Slider value={moistureThreshold} onValueChange={setMoistureThreshold} min={10} max={90} step={5} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm">Temperature Threshold</Label>
              </div>
              <span className="text-sm font-medium">{tempThreshold[0]}°C</span>
            </div>
            <Slider value={tempThreshold} onValueChange={setTempThreshold} min={20} max={50} step={1} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
