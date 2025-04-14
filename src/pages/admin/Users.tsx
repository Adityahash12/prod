import React, { useState } from "react";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  AlertCircle,
  Ban,
  Check,
  RefreshCw,
  Gift
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "Mar 15, 2025",
    emotionCaptures: 12,
    rewardsClaimed: 5,
    dominantEmotion: "Joy",
    behaviorSegment: "Enthusiast",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@example.com",
    joinDate: "Mar 10, 2025",
    emotionCaptures: 8,
    rewardsClaimed: 3,
    dominantEmotion: "Surprise",
    behaviorSegment: "Emotional",
    status: "active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    joinDate: "Mar 5, 2025",
    emotionCaptures: 15,
    rewardsClaimed: 7,
    dominantEmotion: "Joy",
    behaviorSegment: "Enthusiast",
    status: "active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    joinDate: "Feb 28, 2025",
    emotionCaptures: 5,
    rewardsClaimed: 2,
    dominantEmotion: "Neutral",
    behaviorSegment: "Passive",
    status: "inactive",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    joinDate: "Feb 20, 2025",
    emotionCaptures: 20,
    rewardsClaimed: 10,
    dominantEmotion: "Joy",
    behaviorSegment: "Enthusiast",
    status: "active",
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    email: "jennifer@example.com",
    joinDate: "Feb 15, 2025",
    emotionCaptures: 10,
    rewardsClaimed: 4,
    dominantEmotion: "Sadness",
    behaviorSegment: "Emotional",
    status: "active",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@example.com",
    joinDate: "Feb 10, 2025",
    emotionCaptures: 7,
    rewardsClaimed: 2,
    dominantEmotion: "Neutral",
    behaviorSegment: "Rational",
    status: "active",
  },
  {
    id: 8,
    name: "Amanda Thompson",
    email: "amanda@example.com",
    joinDate: "Feb 5, 2025",
    emotionCaptures: 3,
    rewardsClaimed: 1,
    dominantEmotion: "Interest",
    behaviorSegment: "Passive",
    status: "pending",
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [statusFilter, setStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    // Apply search filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    // Apply segment filter
    const matchesSegment =
      segmentFilter === "all" || user.behaviorSegment.toLowerCase() === segmentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesSegment;
  });

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success(`User status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEmotionBadge = (emotion: string) => {
    switch (emotion) {
      case "Joy":
        return <Badge className="bg-voyado-purple/10 text-voyado-purple border-voyado-purple/20">{emotion}</Badge>;
      case "Surprise":
        return <Badge className="bg-voyado-coral/10 text-voyado-coral border-voyado-coral/20">{emotion}</Badge>;
      case "Sadness":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{emotion}</Badge>;
      case "Neutral":
        return <Badge variant="outline">{emotion}</Badge>;
      default:
        return <Badge variant="outline">{emotion}</Badge>;
    }
  };

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case "Enthusiast":
        return <Badge className="bg-voyado-purple/10 text-voyado-purple border-voyado-purple/20">{segment}</Badge>;
      case "Emotional":
        return <Badge className="bg-voyado-coral/10 text-voyado-coral border-voyado-coral/20">{segment}</Badge>;
      case "Passive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{segment}</Badge>;
      case "Rational":
        return <Badge className="bg-voyado-teal/10 text-voyado-teal border-voyado-teal/20">{segment}</Badge>;
      default:
        return <Badge variant="outline">{segment}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="voyado-container py-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              Manage users and their emotional loyalty profiles
            </p>
          </div>
          <Button className="bg-voyado-purple hover:bg-voyado-purple/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              View and manage your user base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="enthusiast">Enthusiast</SelectItem>
                    <SelectItem value="emotional">Emotional</SelectItem>
                    <SelectItem value="passive">Passive</SelectItem>
                    <SelectItem value="rational">Rational</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-sm">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Join Date</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Emotion</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Segment</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Engagement</th>
                    <th className="py-3 px-4 text-left font-medium text-sm hidden md:table-cell">Rewards</th>
                    <th className="py-3 px-4 text-right font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-voyado-purple/10 flex items-center justify-center text-voyado-purple font-medium mr-3">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm">{user.joinDate}</td>
                        <td className="py-4 px-4">{getEmotionBadge(user.dominantEmotion)}</td>
                        <td className="py-4 px-4">{getSegmentBadge(user.behaviorSegment)}</td>
                        <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                        <td className="py-4 px-4 text-sm">{user.emotionCaptures} captures</td>
                        <td className="py-4 px-4 text-sm hidden md:table-cell">{user.rewardsClaimed} claimed</td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Email User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertCircle className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Set Active</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Set Inactive</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-6 text-center">
                        <div className="flex flex-col items-center">
                          <Search className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No users found</p>
                          <Button 
                            variant="link" 
                            onClick={() => {
                              setSearchTerm("");
                              setStatusFilter("all");
                              setSegmentFilter("all");
                            }}
                          >
                            Reset filters
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Recent user engagement statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Active Users (Last 7 days)</div>
                    <div className="text-2xl font-semibold">78%</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Emotion Capture Rate</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-voyado-purple h-2 rounded-full" 
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reward Claim Rate</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-voyado-coral h-2 rounded-full" 
                      style={{ width: "42%" }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Retention</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-voyado-teal h-2 rounded-full" 
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common user management tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <Mail className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Email Campaign</div>
                    <div className="text-xs text-muted-foreground">
                      Send emails to user segments
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <Gift className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Bulk Rewards</div>
                    <div className="text-xs text-muted-foreground">
                      Issue rewards to multiple users
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <Download className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Export Data</div>
                    <div className="text-xs text-muted-foreground">
                      Download user data as CSV
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Reset Profiles</div>
                    <div className="text-xs text-muted-foreground">
                      Clear emotion history for users
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Users;
