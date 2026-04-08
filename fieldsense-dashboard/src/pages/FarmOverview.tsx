import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { farmZones } from "@/lib/mockData";

const statusColors: Record<string, string> = {
  irrigating: "bg-chart-moisture text-primary-foreground",
  optimal: "bg-success text-success-foreground",
  dry: "bg-destructive text-destructive-foreground",
  moderate: "bg-warning text-warning-foreground",
};

const statusBg: Record<string, string> = {
  irrigating: "bg-chart-moisture/20 border-chart-moisture/40",
  optimal: "bg-success/20 border-success/40",
  dry: "bg-destructive/20 border-destructive/40",
  moderate: "bg-warning/20 border-warning/40",
};

export default function FarmOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Farm Overview</h1>
        <p className="text-muted-foreground text-sm">Visual field layout & sensor status</p>
      </div>

      {/* Map-like layout */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Field Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] rounded-xl bg-muted overflow-hidden border-2 border-dashed border-border">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, hsl(var(--border)) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, hsl(var(--border)) 40px)' }} />
            
            {farmZones.map((zone) => (
              <div
                key={zone.id}
                className={`absolute rounded-lg border-2 p-2 flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer ${statusBg[zone.status]}`}
                style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
              >
                <div>
                  <p className="text-xs font-semibold truncate">{zone.name}</p>
                  <p className="text-[10px] text-muted-foreground">{zone.crop}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">💧{zone.moisture}%</span>
                  <Badge className={`${statusColors[zone.status]} text-[10px] px-1.5 py-0`}>
                    {zone.status}
                  </Badge>
                </div>
                {/* Sensor dot */}
                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary sensor-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zone details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmZones.map((zone) => (
          <Card key={zone.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">{zone.name}</p>
                <Badge className={`${statusColors[zone.status]} text-xs`}>{zone.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted rounded p-2">
                  <span className="text-muted-foreground">Crop</span>
                  <p className="font-medium">{zone.crop}</p>
                </div>
                <div className="bg-muted rounded p-2">
                  <span className="text-muted-foreground">Moisture</span>
                  <p className="font-medium">{zone.moisture}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
