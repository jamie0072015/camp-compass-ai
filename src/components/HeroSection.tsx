import { Button } from "@/components/ui/button";
import { MapPin, Camera, Navigation, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-camping.jpg";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-sky/60" />
      </div>
      
      {/* Floating GPS indicator */}
      <div className="absolute top-20 right-10 animate-pulse">
        <div className="bg-sky/20 backdrop-blur-sm rounded-full p-4 shadow-gps">
          <MapPin className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Camping
            <span className="block bg-gradient-to-r from-sky to-camp bg-clip-text text-transparent">
              Navigation
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform any paper campsite map into an intelligent GPS navigation system. 
            Find your pitch, locate amenities, and navigate like you're using Google Maps.
          </p>
        </div>
        
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
            <Camera className="w-4 h-4 inline mr-2" />
            AI Map Detection
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
            <Navigation className="w-4 h-4 inline mr-2" />
            GPS Navigation
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium">
            <Smartphone className="w-4 h-4 inline mr-2" />
            Works Offline
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Upload Your Map
            <Camera className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            See How It Works
          </Button>
        </div>
      </div>
      
      {/* Animated path indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-16 bg-gradient-to-b from-white to-transparent opacity-60 animate-bounce" />
      </div>
    </div>
  );
};