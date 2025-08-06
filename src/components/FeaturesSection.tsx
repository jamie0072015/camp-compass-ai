import { Card } from "@/components/ui/card";
import { 
  Brain, 
  MapPin, 
  Smartphone, 
  Camera, 
  Route, 
  Wifi,
  Edit3,
  Zap
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Map Recognition",
      description: "Advanced computer vision automatically detects paths, amenities, and pitch numbers from any paper map photo.",
      color: "text-primary"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "GPS Positioning", 
      description: "See your exact location on the digitized campsite map with real-time GPS tracking.",
      color: "text-sky"
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Smart Navigation",
      description: "Get turn-by-turn directions to any pitch or amenity, just like Google Maps but for campsites.",
      color: "text-camp"
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Works Offline",
      description: "Once processed, navigate completely offline. Perfect for remote campsites with no cell service.",
      color: "text-earth"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photo to Map",
      description: "Simply take a photo of the campsite information board and watch it transform into an interactive map.",
      color: "text-primary"
    },
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Manual Corrections",
      description: "Easily fix or add missing information that the AI might have missed for perfect accuracy.",
      color: "text-forest-dark"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Designed for smartphones with large buttons and high contrast for outdoor visibility.",
      color: "text-sky"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Processing",
      description: "Map analysis and digitization happens in seconds, not minutes. Start navigating immediately.",
      color: "text-camp"
    }
  ];

  return (
    <div className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for Modern Camping
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature designed to solve real camping navigation problems. 
            No more getting lost or wandering around looking for the nearest toilet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Technical specs */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-6 bg-gradient-forest text-white">
            <h3 className="text-xl font-semibold mb-4">Technical Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-medium">Path Detection</p>
                <p className="opacity-80">OpenCV line detection</p>
              </div>
              <div>
                <p className="font-medium">Text Recognition</p>
                <p className="opacity-80">Advanced OCR for pitch numbers</p>
              </div>
              <div>
                <p className="font-medium">Icon Recognition</p>
                <p className="opacity-80">AI-powered symbol detection</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};