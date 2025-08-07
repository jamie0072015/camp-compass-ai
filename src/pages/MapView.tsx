import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Navigation, Zap, ZoomIn, ZoomOut } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function MapView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const imageUrl = searchParams.get('imageUrl');
  const fileName = searchParams.get('fileName') || 'Uploaded Map';

  useEffect(() => {
    if (!imageUrl) {
      navigate('/');
    }
  }, [imageUrl, navigate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));

  const detectedFeatures = [
    { id: 'interactive', label: 'Interactive Map', color: 'bg-primary', icon: MapPin },
    { id: 'zoom', label: 'Zoom & Pan', color: 'bg-camp', icon: ZoomIn },
    { id: 'navigation', label: 'Touch Navigation', color: 'bg-sky', icon: Navigation },
  ];

  if (!imageUrl) {
    return null;
  }

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
            <h1 className="text-3xl font-bold text-white">{fileName}</h1>
            <p className="text-white/80">Interactive map view - zoom and pan to explore</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Display */}
          <div className="lg:col-span-2">
            <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-strong">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg relative overflow-hidden cursor-move">
                {/* Real uploaded map image */}
                <div
                  className="absolute inset-0 select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  <img
                    src={imageUrl}
                    alt="Uploaded map"
                    className="w-full h-full object-contain transition-transform duration-200"
                    style={{
                      transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoom})`,
                      transformOrigin: 'center center'
                    }}
                    draggable={false}
                  />
                </div>
                
                {/* Zoom controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={zoomIn}
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={zoomOut}
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-medium">Interactive Map View</p>
                  <p className="text-xs text-muted-foreground">Drag to pan, use buttons to zoom</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Features Panel */}
          <div className="space-y-4">
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-strong">
              <h3 className="text-xl font-semibold mb-4">Map Features</h3>
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
              <h3 className="text-lg font-semibold mb-3">Map Controls</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your uploaded map is now viewable. Use zoom controls or pinch gestures to explore.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {setZoom(1); setMapPosition({x: 0, y: 0});}}
                >
                  Reset View
                </Button>
                <Button variant="camping" className="w-full">
                  <Navigation className="w-4 h-4 mr-2" />
                  Save Map
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}