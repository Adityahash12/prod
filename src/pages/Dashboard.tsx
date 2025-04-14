
import React from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Camera, Gift, TrendingUp, Clock } from "lucide-react";

// Mock data for the emotion chart
const emotionData = [
  { date: "Mon", joy: 70, sadness: 10, anger: 5, surprise: 15 },
  { date: "Tue", joy: 55, sadness: 20, anger: 15, surprise: 10 },
  { date: "Wed", joy: 80, sadness: 5, anger: 5, surprise: 10 },
  { date: "Thu", joy: 65, sadness: 15, anger: 10, surprise: 10 },
  { date: "Fri", joy: 90, sadness: 0, anger: 0, surprise: 10 },
  { date: "Sat", joy: 85, sadness: 5, anger: 0, surprise: 10 },
  { date: "Sun", joy: 75, sadness: 10, anger: 5, surprise: 10 },
];

// Mock data for the pie chart
const behaviors = [
  { name: "Enthusiast", value: 40, color: "#6d28d9" },
  { name: "Emotional", value: 30, color: "#0d9488" },
  { name: "Passive", value: 15, color: "#f97316" },
  { name: "Rational", value: 15, color: "#94a3b8" },
];

// Mock rewards data
const recommendedRewards = [
  {
    id: 1,
    title: "25% Off Your Next Purchase",
    description: "Perfect for your enthusiastic mood today!",
    expiresIn: "3 days",
    emotion: "Joy",
  },
  {
    id: 2,
    title: "Free Coffee Upgrade",
    description: "A little pick-me-up based on your recent emotions",
    expiresIn: "7 days",
    emotion: "Neutral",
  },
  {
    id: 3,
    title: "Exclusive Early Access",
    description: "You've shown consistent excitement for our products",
    expiresIn: "5 days",
    emotion: "Joy",
  },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="voyado-container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">
            Here's your emotional loyalty journey so far
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dominant Emotion</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">Joy</div>
                <div className="ml-auto p-2 bg-green-100 text-green-800 rounded-full">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You've been mostly joyful recently
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Behavior Profile</CardTitle>
              <CardDescription>Your shopping personality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">Enthusiast</div>
                <div className="ml-auto">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-voyado-purple text-white">
                    <span className="text-xl">E</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You engage actively with our loyalty program
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Rewards</CardTitle>
              <CardDescription>Personalized for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">3</div>
                <div className="ml-auto p-2 bg-voyado-purple/10 text-voyado-purple rounded-full">
                  <Gift className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your recent emotional patterns
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Emotion Trends</CardTitle>
              <CardDescription>
                How your emotions have changed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emotionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="joy"
                      stroke="#6d28d9"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="sadness"
                      stroke="#94a3b8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="anger"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="surprise"
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavior Profile</CardTitle>
              <CardDescription>
                Your shopping personality breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={behaviors}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={(entry) => entry.name}
                    >
                      {behaviors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                {behaviors.map((behavior) => (
                  <div key={behavior.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: behavior.color }}
                    ></div>
                    <span className="text-sm">{behavior.name}</span>
                    <span className="ml-auto font-medium">{behavior.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended Rewards</h2>
            <Button variant="outline" className="text-voyado-purple">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedRewards.map((reward) => (
              <Card key={reward.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                    <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {reward.emotion}
                    </div>
                  </div>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires in {reward.expiresIn}
                    </div>
                    <Button size="sm" className="bg-voyado-purple hover:bg-voyado-purple/90">
                      Claim
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-stretch">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Capture Your Emotion</CardTitle>
              <CardDescription>
                Use your camera to get real-time emotion analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Camera className="h-10 w-10 text-muted-foreground" />
              </div>
              <Button className="bg-voyado-purple hover:bg-voyado-purple/90">
                Start Capture
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Upcoming Features</CardTitle>
              <CardDescription>
                New loyalty features coming soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-voyado-purple mr-2"></div>
                  Voice emotion analysis
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-voyado-purple mr-2"></div>
                  Group loyalty rewards
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-voyado-purple mr-2"></div>
                  Advanced behavior patterns
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-voyado-purple mr-2"></div>
                  Integration with smart devices
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
