
import React, { useState } from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Clock, Gift, ChevronRight, Search, Heart } from "lucide-react";
import { toast } from "sonner";

// Mock rewards data
const availableRewards = [
  {
    id: 1,
    title: "25% Off Your Next Purchase",
    description: "Perfect for your enthusiastic mood today!",
    expiresIn: "3 days",
    emotion: "Joy",
    rewardTier: "Gold",
  },
  {
    id: 2,
    title: "Free Coffee Upgrade",
    description: "A little pick-me-up based on your recent emotions",
    expiresIn: "7 days",
    emotion: "Neutral",
    rewardTier: "Silver",
  },
  {
    id: 3,
    title: "Exclusive Early Access",
    description: "You've shown consistent excitement for our products",
    expiresIn: "5 days",
    emotion: "Joy",
    rewardTier: "Gold",
  },
  {
    id: 4,
    title: "Free Shipping on Orders $50+",
    description: "Enjoy free shipping based on your shopping habits",
    expiresIn: "10 days",
    emotion: "Satisfaction",
    rewardTier: "Bronze",
  },
  {
    id: 5,
    title: "Bonus Loyalty Points",
    description: "Earn double points on your next purchase",
    expiresIn: "14 days",
    emotion: "Interest",
    rewardTier: "Silver",
  },
];

const redeemedRewards = [
  {
    id: 101,
    title: "15% Off Seasonal Items",
    description: "Thanks for your continued loyalty",
    redeemedOn: "Apr 2, 2025",
    emotion: "Joy",
  },
  {
    id: 102,
    title: "Free Gift with Purchase",
    description: "A special gift for our emotional shoppers",
    redeemedOn: "Mar 28, 2025",
    emotion: "Surprise",
  },
];

// Reward tier information
const rewardTiers = [
  {
    name: "Bronze",
    color: "bg-amber-600",
    points: 0,
    nextTier: "Silver",
    pointsToNext: 500,
    progress: 60,
  },
  {
    name: "Silver",
    color: "bg-gray-400",
    points: 1000,
    nextTier: "Gold",
    pointsToNext: 1500,
    progress: 40,
  },
  {
    name: "Gold",
    color: "bg-yellow-500",
    points: 2500,
    nextTier: "Platinum",
    pointsToNext: 5000,
    progress: 20,
  },
  {
    name: "Platinum",
    color: "bg-slate-700",
    points: 7500,
    nextTier: null,
    pointsToNext: null,
    progress: 0,
  },
];

const Rewards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const currentTier = rewardTiers[0]; // Bronze tier for demo

  // Filter rewards based on search term
  const filteredRewards = availableRewards.filter(reward => 
    reward.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    reward.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClaimReward = (id: number) => {
    toast.success("Reward claimed successfully!");
  };

  return (
    <AppLayout>
      <div className="voyado-container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Rewards</h1>
          <p className="text-muted-foreground">
            Personalized rewards based on your emotional patterns
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Loyalty Status</CardTitle>
            <CardDescription>
              Your current tier and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center">
                <div className={`w-16 h-16 ${currentTier.color} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
                  {currentTier.name[0]}
                </div>
                <div className="ml-4">
                  <div className="text-xl font-semibold">{currentTier.name} Tier</div>
                  <div className="text-sm text-muted-foreground">{currentTier.points} points</div>
                </div>
              </div>
              
              {currentTier.nextTier && (
                <div className="flex-1 md:border-l md:pl-6">
                  <div className="text-sm text-muted-foreground mb-1">
                    {currentTier.pointsToNext} points until {currentTier.nextTier}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-voyado-purple h-2.5 rounded-full" 
                      style={{ width: `${currentTier.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <Button variant="outline" className="md:ml-auto">
                View Tier Benefits
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="available" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="available">Available Rewards</TabsTrigger>
            <TabsTrigger value="redeemed">Redeemed History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search rewards..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.length > 0 ? (
                filteredRewards.map((reward) => (
                  <Card key={reward.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className={`
                          ${reward.rewardTier === "Gold" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : 
                            reward.rewardTier === "Silver" ? "bg-gray-100 text-gray-800 border-gray-200" : 
                            "bg-amber-100 text-amber-800 border-amber-200"}
                        `}>
                          {reward.rewardTier}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          {reward.emotion}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{reward.title}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-muted-foreground text-xs mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        Expires in {reward.expiresIn}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full bg-voyado-purple hover:bg-voyado-purple/90"
                        onClick={() => handleClaimReward(reward.id)}
                      >
                        Claim Reward
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No matching rewards found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your search term</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="redeemed">
            <div className="space-y-4">
              {redeemedRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                          {reward.emotion}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Redeemed on {reward.redeemedOn}
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 flex sm:flex-col justify-between items-center sm:items-center sm:w-36">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-voyado-purple/10">
                        <Heart className="h-5 w-5 text-voyado-purple" />
                      </div>
                      <Button variant="ghost" size="sm" className="text-voyado-purple">
                        <span className="mr-1">Details</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>How Rewards Work</CardTitle>
            <CardDescription>
              Understanding your emotion-based loyalty program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="font-medium flex items-center">
                  <div className="w-6 h-6 rounded-full bg-voyado-purple/10 text-voyado-purple flex items-center justify-center mr-2">1</div>
                  Emotion Tracking
                </div>
                <p className="text-sm text-muted-foreground">
                  Your emotions are captured and analyzed to understand your preferences
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium flex items-center">
                  <div className="w-6 h-6 rounded-full bg-voyado-purple/10 text-voyado-purple flex items-center justify-center mr-2">2</div>
                  Behavior Profiling
                </div>
                <p className="text-sm text-muted-foreground">
                  We build a profile of your shopping behavior and emotional patterns
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium flex items-center">
                  <div className="w-6 h-6 rounded-full bg-voyado-purple/10 text-voyado-purple flex items-center justify-center mr-2">3</div>
                  Smart Rewards
                </div>
                <p className="text-sm text-muted-foreground">
                  Personalized rewards are generated based on your current emotional state
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Rewards;
