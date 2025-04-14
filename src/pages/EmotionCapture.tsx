import React, { useState, useRef, useCallback } from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Camera, RefreshCw, Check, X, Gift } from "lucide-react";

const EmotionCapture = () => {
  const [capturing, setCapturing] = useState(false);
  const [processingEmotion, setProcessingEmotion] = useState(false);
  const [emotionResult, setEmotionResult] = useState<null | Record<string, number>>(null);
  const [dominantEmotion, setDominantEmotion] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCapturing(true);
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      toast.error("Could not access webcam. Please check permissions.");
    }
  }, []);

  const stopCapture = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCapturing(false);
  }, []);

  const captureEmotion = useCallback(() => {
    if (!capturing || !videoRef.current || !canvasRef.current) return;
    
    setProcessingEmotion(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    setTimeout(() => {
      const mockResults = {
        joy: Math.random() * 60 + 20,
        sadness: Math.random() * 30,
        anger: Math.random() * 20,
        surprise: Math.random() * 30,
        fear: Math.random() * 15,
        disgust: Math.random() * 10,
        contempt: Math.random() * 5,
        neutral: Math.random() * 40,
      };
      
      let dominant = "neutral";
      let highestScore = 0;
      
      Object.entries(mockResults).forEach(([emotion, score]) => {
        if (score > highestScore) {
          highestScore = score;
          dominant = emotion;
        }
      });
      
      setEmotionResult(mockResults);
      setDominantEmotion(dominant);
      setProcessingEmotion(false);
      
      toast.success(`Emotion detected: ${dominant}`);
    }, 2000);
  }, [capturing]);

  const resetResults = useCallback(() => {
    setEmotionResult(null);
    setDominantEmotion(null);
  }, []);

  return (
    <AppLayout>
      <div className="voyado-container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Emotion Capture</h1>
          <p className="text-muted-foreground">
            Capture your emotions to receive personalized rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Feed</CardTitle>
              <CardDescription>
                Position your face in the frame for best results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                {!capturing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                    <Button 
                      onClick={startCapture}
                      className="bg-voyado-purple hover:bg-voyado-purple/90"
                    >
                      Start Camera
                    </Button>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${!capturing ? 'hidden' : ''}`}
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {processingEmotion && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                    <div className="animate-spin text-white mb-4">
                      <RefreshCw className="h-8 w-8" />
                    </div>
                    <p className="text-white">Analyzing emotion...</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-4 justify-center">
                {capturing ? (
                  <>
                    <Button
                      onClick={captureEmotion}
                      className="bg-voyado-teal hover:bg-voyado-teal/90"
                      disabled={processingEmotion}
                    >
                      Capture Emotion
                    </Button>
                    <Button
                      onClick={stopCapture}
                      variant="outline"
                    >
                      Stop Camera
                    </Button>
                  </>
                ) : emotionResult && (
                  <Button
                    onClick={resetResults}
                    variant="outline"
                  >
                    Reset Results
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emotion Analysis</CardTitle>
              <CardDescription>
                Your current emotional state
              </CardDescription>
            </CardHeader>
            <CardContent>
              {emotionResult ? (
                <Tabs defaultValue="results">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="rewards">Recommended Rewards</TabsTrigger>
                  </TabsList>
                  <TabsContent value="results">
                    <div className="space-y-6 py-4">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-voyado-purple/10 mb-2">
                          <span className="text-3xl font-bold text-voyado-purple capitalize">
                            {dominantEmotion?.[0]}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold capitalize">
                          {dominantEmotion}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your dominant emotion
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {emotionResult && Object.entries(emotionResult).map(([emotion, value]) => (
                          <div key={emotion} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{emotion}</span>
                              <span>{Math.round(value)}%</span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="rewards">
                    <div className="py-4 space-y-4">
                      <p className="text-sm text-center mb-6">
                        Based on your {dominantEmotion} emotion, we recommend these rewards:
                      </p>
                      
                      {dominantEmotion === "joy" && (
                        <>
                          <RewardItem
                            title="25% Off Next Purchase"
                            description="Perfect for your enthusiastic mood"
                            recommended={true}
                          />
                          <RewardItem
                            title="Early Access to New Products"
                            description="Share your joy with exclusive previews"
                            recommended={true}
                          />
                          <RewardItem
                            title="Free Gift with Purchase"
                            description="A small token for your positive vibes"
                            recommended={false}
                          />
                        </>
                      )}
                      
                      {dominantEmotion === "sadness" && (
                        <>
                          <RewardItem
                            title="Free Comfort Item"
                            description="A little something to brighten your day"
                            recommended={true}
                          />
                          <RewardItem
                            title="Extended Return Period"
                            description="Take your time, no pressure"
                            recommended={true}
                          />
                          <RewardItem
                            title="Personal Shopping Assistant"
                            description="Get help finding exactly what you need"
                            recommended={false}
                          />
                        </>
                      )}
                      
                      {dominantEmotion !== "joy" && dominantEmotion !== "sadness" && (
                        <>
                          <RewardItem
                            title="10% Off Your Cart"
                            description="A reward based on your current mood"
                            recommended={true}
                          />
                          <RewardItem
                            title="Free Shipping"
                            description="Enjoy hassle-free delivery"
                            recommended={true}
                          />
                          <RewardItem
                            title="Bonus Loyalty Points"
                            description="Extra points for your participation"
                            recommended={false}
                          />
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center h-80">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 animate-pulse-slow">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-xs">
                    Start the camera and capture your emotion to see personalized analysis and rewards
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Understanding the emotion-based loyalty system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-voyado-purple/10 flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-6 w-6 text-voyado-purple" />
                </div>
                <h3 className="font-medium mb-2">Capture Emotion</h3>
                <p className="text-sm text-muted-foreground">
                  Use your camera to capture your current emotional state
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-voyado-teal/10 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-6 w-6 text-voyado-teal" />
                </div>
                <h3 className="font-medium mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your emotions and behavior patterns
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-voyado-coral/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-6 w-6 text-voyado-coral" />
                </div>
                <h3 className="font-medium mb-2">Personalized Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Receive rewards tailored to your emotional state
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

const RewardItem = ({ 
  title, 
  description, 
  recommended 
}: { 
  title: string; 
  description: string; 
  recommended: boolean; 
}) => {
  return (
    <div className={`p-4 rounded-lg border ${recommended ? 'bg-green-50 border-green-200' : 'bg-muted/30'}`}>
      <div className="flex">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          recommended ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
        }`}>
          {recommended ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmotionCapture;
