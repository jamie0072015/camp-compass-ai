import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Navigation, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MapView() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const detectedFeatures = [
    { id: 'paths', label: '15 Walking Paths', color: 'bg-camp', icon: Navigation },
    { id: 'amenities', label: '8 Amenities', color: 'bg-sky', icon: MapPin },
    { id: 'pitches', label: '42 Pitch Numbers', color: 'bg-primary-glow', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-forest">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mr-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Processed Campsite Map</h1>
            <p className="text-white/80">AI detection complete - explore your interactive map</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Display */}
          <div className="lg:col-span-2">
            <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-strong">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-green-100 rounded-lg relative overflow-hidden">
                {/* Mock map with detected features */}
                <div className="absolute inset-0 p-4">
                  {/* Paths */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                    <path d="M50 50 Q150 100 250 50 T350 100" stroke="#10b981" strokeWidth="3" fill="none" className="opacity-70" />
                    <path d="M100 150 L300 150" stroke="#10b981" strokeWidth="3" fill="none" className="opacity-70" />
                    <path d="M50 200 Q200 250 350 200" stroke="#10b981" strokeWidth="3" fill="none" className="opacity-70" />
                  </svg>
                  
                  {/* Amenity markers */}
                  <div className="absolute top-16 left-20 w-4 h-4 bg-sky rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute top-32 right-24 w-4 h-4 bg-sky rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute bottom-20 left-32 w-4 h-4 bg-sky rounded-full border-2 border-white shadow-lg animate-pulse" />
                  
                  {/* Pitch numbers */}
                  <div className="absolute top-24 left-40 w-6 h-6 bg-primary-glow rounded text-xs font-bold text-white flex items-center justify-center shadow-lg">12</div>
                  <div className="absolute top-40 left-60 w-6 h-6 bg-primary-glow rounded text-xs font-bold text-white flex items-center justify-center shadow-lg">24</div>
                  <div className="absolute bottom-32 right-40 w-6 h-6 bg-primary-glow rounded text-xs font-bold text-white flex items-center justify-center shadow-lg">35</div>
                  
                  {/* Reception building */}
                  <div className="absolute top-12 right-16 w-8 h-6 bg-earth rounded shadow-lg" />
                  
                  {/* Your location */}
                  <div className="absolute bottom-16 left-16 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg animate-ping" />
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-medium">Interactive Map View</p>
                  <p className="text-xs text-muted-foreground">Tap features to explore</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Features Panel */}
          <div className="space-y-4">
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-strong">
              <h3 className="text-xl font-semibold mb-4">Detected Features</h3>
              <div className="space-y-3">
                {detectedFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedFeature === feature.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                      onClick={() => setSelectedFeature(feature.id)}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 ${feature.color} rounded-full mr-3`} />
                        <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{feature.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-strong">
              <h3 className="text-lg font-semibold mb-3">Navigation Ready</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your map is now interactive and ready for offline navigation.
              </p>
              <Button variant="camping" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Start Navigation
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}