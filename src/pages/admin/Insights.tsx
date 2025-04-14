
import React from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { 
  Download, 
  Filter, 
  Users, 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon 
} from "lucide-react";

// Mock data for emotions over time
const emotionTrendsData = [
  { date: "Week 1", joy: 45, sadness: 15, anger: 10, surprise: 20, fear: 10 },
  { date: "Week 2", joy: 50, sadness: 10, anger: 5, surprise: 25, fear: 10 },
  { date: "Week 3", joy: 40, sadness: 20, anger: 15, surprise: 15, fear: 10 },
  { date: "Week 4", joy: 60, sadness: 10, anger: 5, surprise: 15, fear: 10 },
  { date: "Week 5", joy: 55, sadness: 15, anger: 5, surprise: 20, fear: 5 },
  { date: "Week 6", joy: 65, sadness: 10, anger: 5, surprise: 15, fear: 5 },
];

// Mock data for user segments
const userSegmentsData = [
  { name: "Enthusiasts", value: 35, color: "#6d28d9" },
  { name: "Emotionals", value: 25, color: "#f97316" },
  { name: "Passives", value: 20, color: "#94a3b8" },
  { name: "Rationals", value: 20, color: "#0d9488" },
];

// Mock data for reward effectiveness
const rewardEffectivenessData = [
  { name: "25% Off", claimed: 75, engagement: 85, joy: 80 },
  { name: "Free Item", claimed: 60, engagement: 70, joy: 90 },
  { name: "Early Access", claimed: 40, engagement: 50, joy: 60 },
  { name: "Free Shipping", claimed: 80, engagement: 65, joy: 70 },
  { name: "Bonus Points", claimed: 70, engagement: 60, joy: 65 },
];

// Mock data for emotion-reward correlation
const emotionRewardCorrelationData = [
  { emotion: "Joy", rewardEffectiveness: 85, rewardsIssued: 120, x: 85, y: 120, z: 120 },
  { emotion: "Sadness", rewardEffectiveness: 60, rewardsIssued: 80, x: 60, y: 80, z: 80 },
  { emotion: "Anger", rewardEffectiveness: 40, rewardsIssued: 50, x: 40, y: 50, z: 50 },
  { emotion: "Surprise", rewardEffectiveness: 70, rewardsIssued: 90, x: 70, y: 90, z: 90 },
  { emotion: "Fear", rewardEffectiveness: 50, rewardsIssued: 60, x: 50, y: 60, z: 60 },
  { emotion: "Neutral", rewardEffectiveness: 55, rewardsIssued: 100, x: 55, y: 100, z: 100 },
];

// Dashboard summary cards data
const summaryData = [
  {
    title: "Total Users",
    value: "1,245",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Emotion Captures",
    value: "8,521",
    change: "+23.1%",
    trend: "up",
    icon: BarChart3,
  },
  {
    title: "Rewards Claimed",
    value: "642",
    change: "+5.4%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Avg. Joy Score",
    value: "72%",
    change: "+8.2%",
    trend: "up",
    icon: PieChartIcon,
  },
];

const AdminInsights = () => {
  return (
    <AppLayout>
      <div className="voyado-container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">User Insights</h1>
          <p className="text-muted-foreground">
            Analytics and visualizations based on emotional data
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" className="text-voyado-purple">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className={`ml-auto p-2 rounded-full ${
                    item.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className={`text-xs mt-1 ${
                  item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {item.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="emotions" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="emotions">Emotion Trends</TabsTrigger>
            <TabsTrigger value="segments">User Segments</TabsTrigger>
            <TabsTrigger value="rewards">Reward Effectiveness</TabsTrigger>
            <TabsTrigger value="correlation">Emotion-Reward Correlation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="emotions">
            <Card>
              <CardHeader>
                <CardTitle>Emotion Trends Over Time</CardTitle>
                <CardDescription>
                  How user emotions have changed over the last 6 weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emotionTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="joy" stroke="#6d28d9" strokeWidth={2} />
                      <Line type="monotone" dataKey="sadness" stroke="#94a3b8" strokeWidth={2} />
                      <Line type="monotone" dataKey="anger" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="surprise" stroke="#f97316" strokeWidth={2} />
                      <Line type="monotone" dataKey="fear" stroke="#84cc16" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="segments">
            <Card>
              <CardHeader>
                <CardTitle>User Behavior Segments</CardTitle>
                <CardDescription>
                  Distribution of users across different behavior profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-2/3 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userSegmentsData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          fill="#8884d8"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {userSegmentsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-6 space-y-4">
                    {userSegmentsData.map((segment) => (
                      <div key={segment.name} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: segment.color }}
                        ></div>
                        <div className="flex-1">
                          <div className="font-medium">{segment.name}</div>
                          <div className="text-sm text-muted-foreground">{segment.value}% of users</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 text-sm text-muted-foreground">
                      <p>
                        <strong>Enthusiasts</strong>: Highly engaged, emotionally expressive users.
                      </p>
                      <p className="mt-2">
                        <strong>Emotionals</strong>: Users who display varied emotional responses.
                      </p>
                      <p className="mt-2">
                        <strong>Passives</strong>: Less engaged users with minimal emotional expression.
                      </p>
                      <p className="mt-2">
                        <strong>Rationals</strong>: Users who engage logically with limited emotional variation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Reward Effectiveness</CardTitle>
                <CardDescription>
                  Comparison of different reward types and their impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rewardEffectivenessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="claimed" name="Claim Rate (%)" fill="#6d28d9" />
                      <Bar dataKey="engagement" name="Engagement (%)" fill="#0d9488" />
                      <Bar dataKey="joy" name="Joy Response (%)" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="correlation">
            <Card>
              <CardHeader>
                <CardTitle>Emotion-Reward Correlation</CardTitle>
                <CardDescription>
                  How emotions correlate with reward effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="x" 
                        name="Reward Effectiveness" 
                        unit="%" 
                        domain={[0, 100]}
                      />
                      <YAxis 
                        dataKey="y" 
                        name="Rewards Issued" 
                        unit="" 
                        domain={[0, 150]} 
                      />
                      <ZAxis 
                        dataKey="z" 
                        range={[50, 200]} 
                        name="Volume" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }} 
                        formatter={(value, name, props) => {
                          if (name === "z") return [`${value}`, "Volume"];
                          return [`${value}${name === "x" ? "%" : ""}`, name === "x" ? "Effectiveness" : "Rewards Issued"];
                        }}
                        labelFormatter={(label) => emotionRewardCorrelationData[label].emotion}
                      />
                      <Legend />
                      <Scatter 
                        name="Emotions" 
                        data={emotionRewardCorrelationData} 
                        fill="#6d28d9" 
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>
                Important takeaways from the data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-purple/10 flex items-center justify-center text-voyado-purple">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Emotion-driven rewards are 32% more effective</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rewards matched to emotional state show significantly higher engagement.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-purple/10 flex items-center justify-center text-voyado-purple">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Joy-based users claim 2.5x more rewards</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Users experiencing positive emotions engage more with the loyalty program.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-purple/10 flex items-center justify-center text-voyado-purple">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Emotional users respond best to surprise rewards</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Unexpected rewards generate higher emotional responses in this segment.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-purple/10 flex items-center justify-center text-voyado-purple">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Emotion patterns show weekly cycles</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Users show more positive emotions mid-week and on weekends.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Actions to improve loyalty program effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-teal/10 flex items-center justify-center text-voyado-teal">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Increase emotional segmentation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Further refine user segments based on emotional response patterns.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-teal/10 flex items-center justify-center text-voyado-teal">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Optimize reward timing</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send reward offers during peak positive emotion periods.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-teal/10 flex items-center justify-center text-voyado-teal">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Target "Passive" segment with emotion boosters</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Design specific rewards to elicit stronger emotional responses from passive users.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-teal/10 flex items-center justify-center text-voyado-teal">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Test new reward types</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Experiment with experiential rewards for highly emotional segments.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 w-6 h-6 rounded-full bg-voyado-teal/10 flex items-center justify-center text-voyado-teal">
                    5
                  </div>
                  <div>
                    <p className="font-medium">Enhance AI prediction model</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Update reinforcement learning algorithm with latest correlation data.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminInsights;
