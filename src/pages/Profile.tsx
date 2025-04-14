
import React, { useState } from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { toast } from "sonner";
import { User, Settings, Shield, Bell, Eye, EyeOff } from "lucide-react";

// Mock emotion data for the profile
const emotionData = [
  { name: "Joy", value: 45, color: "#6d28d9" },
  { name: "Neutral", value: 25, color: "#94a3b8" },
  { name: "Interest", value: 15, color: "#0d9488" },
  { name: "Surprise", value: 10, color: "#f97316" },
  { name: "Others", value: 5, color: "#e2e8f0" },
];

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "••••••••",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    rewardAlerts: true,
    emotionCaptures: false,
    marketingEmails: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareEmotionData: true,
    shareBehaviorData: true,
    allowPersonalization: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
    
    toast.success(`${setting} setting updated`);
  };
  
  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    });
    
    toast.success(`${setting} setting updated`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    toast.success("Password changed successfully");
    
    // Reset password fields
    setFormData({
      ...formData,
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <AppLayout>
      <div className="voyado-container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="account" className="mb-6">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Button type="submit" className="bg-voyado-purple hover:bg-voyado-purple/90">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password for security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Button type="submit" className="bg-voyado-purple hover:bg-voyado-purple/90">
                          Change Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how you receive updates and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Reward Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new rewards are available
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.rewardAlerts}
                        onCheckedChange={() => handleNotificationToggle("rewardAlerts")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Emotion Capture Reminders</h3>
                        <p className="text-sm text-muted-foreground">
                          Reminders to update your emotion profile
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emotionCaptures}
                        onCheckedChange={() => handleNotificationToggle("emotionCaptures")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional content and offers
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control how your data is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Share Emotion Data</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow us to analyze your emotion patterns for rewards
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.shareEmotionData}
                        onCheckedChange={() => handlePrivacyToggle("shareEmotionData")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Share Behavior Data</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow us to analyze your shopping behavior
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.shareBehaviorData}
                        onCheckedChange={() => handlePrivacyToggle("shareBehaviorData")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Personalization</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow us to personalize your rewards and experience
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.allowPersonalization}
                        onCheckedChange={() => handlePrivacyToggle("allowPersonalization")}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="text-destructive">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile Summary</CardTitle>
                <CardDescription>
                  Your loyalty and emotion overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-voyado-purple flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {formData.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold">{formData.name}</h3>
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                  
                  <div className="w-full mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Member Since</div>
                      <div className="font-medium">March 15, 2025</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Loyalty Tier</div>
                      <div className="font-medium">Bronze</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Emotion Captures</div>
                      <div className="font-medium">12</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Rewards Claimed</div>
                      <div className="font-medium">5</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emotional Profile</CardTitle>
                <CardDescription>
                  Your dominant emotions over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emotionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {emotionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Based on your last 30 days of emotion captures
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
