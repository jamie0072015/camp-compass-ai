import { HeroSection } from "@/components/HeroSection";
import { MapUploadSection } from "@/components/MapUploadSection";
import { NavigationDemo } from "@/components/NavigationDemo";
import { FeaturesSection } from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MapUploadSection />
      <NavigationDemo />
      <FeaturesSection />
    </div>
  );
};

export default Index;
