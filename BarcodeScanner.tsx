
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScanBarcode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BarcodeScanner = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerInterval = useRef<NodeJS.Timeout | null>(null);

  const startScanner = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment"
        }
      };
      
      // Simulate starting the camera
      setScanning(true);
      
      // In a real implementation, we would do this:
      // const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // if (videoRef.current) {
      //   videoRef.current.srcObject = stream;
      // }
      
      // For demo purposes, we'll just simulate a scan after a short delay
      scannerInterval.current = setTimeout(() => {
        const mockBarcode = "978020137962";
        handleBarcodeDetected(mockBarcode);
      }, 3000);
    } catch (err) {
      console.error("Error starting scanner:", err);
      toast({
        title: "Scanner Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive"
      });
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerInterval.current) {
      clearTimeout(scannerInterval.current);
    }
    
    setScanning(false);
    
    // In a real implementation, we would stop the camera:
    // if (videoRef.current && videoRef.current.srcObject) {
    //   const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    //   tracks.forEach(track => track.stop());
    //   videoRef.current.srcObject = null;
    // }
  };

  const handleBarcodeDetected = (barcode: string) => {
    setManualInput(barcode);
    stopScanner();
    
    toast({
      title: "Barcode Detected",
      description: `Barcode: ${barcode}`,
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      handleBarcodeDetected(manualInput);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Barcode Scanner</h2>
          <p className="text-muted-foreground mt-2">
            Scan product barcodes or enter them manually
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg border overflow-hidden aspect-video flex items-center justify-center">
          {scanning ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-2/3 h-px bg-red-500 animate-pulse" />
                <p className="mt-4 text-sm bg-black/50 text-white px-2 py-1 rounded">Scanning...</p>
              </div>
            </>
          ) : (
            <div className="text-center p-6">
              <ScanBarcode className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-2 text-muted-foreground">Camera preview will appear here</p>
            </div>
          )}
        </div>

        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter barcode manually"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Submit</Button>
          </div>

          {!scanning ? (
            <Button 
              type="button" 
              onClick={startScanner} 
              variant="outline" 
              className="w-full"
            >
              <ScanBarcode className="mr-2 h-4 w-4" />
              Start Scanner
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={stopScanner} 
              variant="outline" 
              className="w-full bg-red-50 text-red-600 hover:bg-red-100"
            >
              Stop Scanner
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
};

export default BarcodeScanner;
