import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Timer, Route } from "lucide-react";

export const NavigationDemo = () => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const destinations = [
    { id: 'toilets', name: 'Toilets Block A', icon: '🚻', distance: '120m', time: '2 min' },
    { id: 'pool', name: 'Swimming Pool', icon: '🏊', distance: '250m', time: '4 min' },
    { id: 'reception', name: 'Reception', icon: '🏢', distance: '180m', time: '3 min' },
    { id: 'pitch42', name: 'Pitch 42', icon: '🏕️', distance: '95m', time: '1 min' },
  ];

  const startNavigation = (destination: any) => {
    setSelectedDestination(destination.id);
    setIsNavigating(true);
    
    // Simulate navigation
    setTimeout(() => {
      setIsNavigating(false);
      setSelectedDestination(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Navigate Like Google Maps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tap any destination and get turn-by-turn directions. 
            Works completely offline using the detected campsite layout.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mock Map Interface */}
          <Card className="p-6 bg-gradient-to-br from-forest-light to-primary/20 relative overflow-hidden h-96">
            <div className="relative h-full">
              {/* Mock GPS position */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-sky rounded-full shadow-gps animate-pulse relative">
                  <div className="absolute inset-0 bg-sky rounded-full animate-ping opacity-75" />
                </div>
                <p className="text-xs text-white mt-1 text-center">You are here</p>
              </div>

              {/* Mock paths */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                <path
                  d="M50 150 Q200 100 350 150"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path
                  d="M200 50 L200 250"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
                {isNavigating && (
                  <path
                    d="M200 150 Q250 120 300 100"
                    stroke="#00bcd4"
                    strokeWidth="4"
                    fill="none"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Mock destination markers */}
              <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-soft">
                <span className="text-lg">🚻</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 rounded-full p-2 shadow-soft">
                <span className="text-lg">🏊</span>
              </div>
              
              {/* Navigation overlay */}
              {isNavigating && (
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-strong">
                  <div className="flex items-center text-sm">
                    <Navigation className="w-4 h-4 text-sky mr-2" />
                    <span className="font-medium">Turn right in 15m</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Destination Selector */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Choose Your Destination
            </h3>
            
            {destinations.map((dest) => (
              <Card 
                key={dest.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                  selectedDestination === dest.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => startNavigation(dest)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{dest.icon}</div>
                    <div>
                      <h4 className="font-medium text-foreground">{dest.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground space-x-4">
                        <span className="flex items-center">
                          <Route className="w-3 h-3 mr-1" />
                          {dest.distance}
                        </span>
                        <span className="flex items-center">
                          <Timer className="w-3 h-3 mr-1" />
                          {dest.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="gps" size="sm">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {isNavigating && (
              <Card className="p-4 bg-sky/10 border-sky/20">
                <div className="flex items-center">
                  <div className="animate-spin mr-3">
                    <Navigation className="w-5 h-5 text-sky" />
                  </div>
                  <div>
                    <p className="font-medium text-sky">Navigation Active</p>
                    <p className="text-sm text-muted-foreground">
                      Follow the blue path on your map
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="bg-muted/50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-foreground mb-2">Offline Navigation</h4>
              <p className="text-sm text-muted-foreground">
                Once your map is processed, navigation works completely offline. 
                No internet connection required!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};