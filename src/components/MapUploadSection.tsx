import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, FileImage, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { uploadMapImage } from "@/lib/supabase";

export const MapUploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("File selected:", file);
    if (file) {
      // Check file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPG, PNG, or PDF file",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "Map uploaded successfully",
        description: "Ready to process with AI detection",
      });
    }
    // Reset the input so the same file can be selected again if needed
    event.target.value = '';
  };

  const handleCameraCapture = () => {
    toast({
      title: "Camera feature",
      description: "Camera integration will be available in the mobile app",
    });
  };

  const processMap = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    try {
      console.log("Starting real map processing...");
      
      // Upload the actual image to Supabase
      const { url } = await uploadMapImage(uploadedFile);
      console.log("Image uploaded successfully:", url);
      
      toast({
        title: "Map uploaded successfully!",
        description: "Your map is ready for interactive viewing",
      });
      
      // Navigate to map view with the real image URL
      setTimeout(() => {
        navigate(`/map?imageUrl=${encodeURIComponent(url)}&fileName=${encodeURIComponent(uploadedFile.name)}`);
      }, 1000);
      
    } catch (error: any) {
      console.error("Upload error:", error);
      
      let errorMessage = "Please try again";
      if (error?.message?.includes('Failed to fetch')) {
        errorMessage = "Network connection issue. Please check your internet and try again.";
      } else if (error?.message?.includes('unauthorized')) {
        errorMessage = "Permission denied. Please contact support.";
      } else if (error?.message?.includes('payload too large')) {
        errorMessage = "File too large. Please use a smaller image.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-forest py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Upload Your Campsite Map
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Take a photo or upload an image of any paper campsite map. 
            Our AI will automatically detect roads, amenities, and pitch numbers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Upload Interface */}
          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-strong">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Choose Upload Method
              </h3>
              
              {/* File Upload */}
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <FileImage className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">Upload Image File</h4>
                <p className="text-muted-foreground mb-4">
                  JPG, PNG, or PDF files up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </span>
                  </Button>
                </label>
              </div>

              {/* Camera Option */}
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Or use your camera</p>
                <Button 
                  variant="camping" 
                  onClick={handleCameraCapture}
                  className="w-full"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              {/* Upload Status */}
              {uploadedFile && (
                <div className="bg-primary/10 rounded-lg p-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {/* Process Button */}
              {uploadedFile && (
                <Button 
                  variant="hero" 
                  onClick={processMap}
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "Processing with AI..." : "Process Map"}
                </Button>
              )}
            </div>
          </Card>

          {/* Preview/Demo */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">AI Will Detect:</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-camp rounded-full mr-3" />
                  <span>Walking paths and roads</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-sky rounded-full mr-3" />
                  <span>Amenity icons (toilets, pools, reception)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-glow rounded-full mr-3" />
                  <span>Pitch numbers and labels</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-earth rounded-full mr-3" />
                  <span>Key landmarks and buildings</span>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <h4 className="text-lg font-semibold mb-4">Processing...</h4>
                <div className="space-y-2">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-sky h-2 rounded-full animate-pulse" style={{width: '75%'}} />
                  </div>
                  <p className="text-sm">Analyzing map structure and detecting features...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};