"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Gift,
  ShoppingCart,
  Tag,
  CreditCard,
  Clock,
  Coffee,
  Briefcase,
  Award,
  Grid,
  List,
  Filter,
  Plus,
  Laptop,
  HeartHandshake,
  Leaf,
  Home,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StorePageProps {
  params: {
    subdomain: string;
  };
}

export default function StorePage({ params }: StorePageProps) {
  const subdomain = params.subdomain;
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCartDialog, setShowCartDialog] = useState(false);
  const [userPoints, setUserPoints] = useState(3500);
  
  // Sample rewards data
  const rewards = [
    {
      id: "1",
      name: "Extra Day Off",
      description: "Redeem for an additional paid day off that doesn't count against vacation balance",
      image: "🏖️",
      category: "time-off",
      points: 2000,
      available: true,
      popular: true,
    },
    {
      id: "2",
      name: "Premium Headphones",
      description: "Noise-cancelling headphones for better focus during work",
      image: "🎧",
      category: "equipment",
      points: 3500,
      available: true,
      popular: true,
    },
    {
      id: "3",
      name: "Team Lunch",
      description: "Sponsor lunch for your immediate team (up to 6 people)",
      image: "🍽️",
      category: "team",
      points: 1500,
      available: true,
      popular: false,
    },
    {
      id: "4",
      name: "Charitable Donation",
      description: "Donate to a charity of your choice in the company's name",
      image: "❤️",
      category: "charity",
      points: 1000,
      available: true,
      popular: false,
    },
    {
      id: "5",
      name: "Professional Development Course",
      description: "Enroll in an online course to enhance your skills",
      image: "📚",
      category: "learning",
      points: 2500,
      available: true,
      popular: true,
    },
    {
      id: "6",
      name: "Work From Anywhere Week",
      description: "Work from any location for one week",
      image: "🌎",
      category: "time-off",
      points: 4000,
      available: true,
      popular: true,
    },
    {
      id: "7",
      name: "Premium Coffee Subscription",
      description: "3-month subscription to premium coffee delivery",
      image: "☕",
      category: "lifestyle",
      points: 1200,
      available: true,
      popular: false,
    },
    {
      id: "8",
      name: "Ergonomic Office Chair",
      description: "High-quality ergonomic chair for your home office",
      image: "🪑",
      category: "equipment",
      points: 5000,
      available: true,
      popular: false,
    },
    {
      id: "9",
      name: "Wellness Day",
      description: "A day dedicated to your wellness activities, on the company",
      image: "🧘",
      category: "time-off",
      points: 1800,
      available: true,
      popular: false,
    },
    {
      id: "10",
      name: "Team Building Activity",
      description: "Organize a team building activity of your choice",
      image: "🤝",
      category: "team",
      points: 3000,
      available: true,
      popular: false,
    },
    {
      id: "11",
      name: "Latest Tech Gadget",
      description: "Get the latest tech gadget for improved productivity",
      image: "📱",
      category: "equipment",
      points: 4500,
      available: true,
      popular: true,
    },
    {
      id: "12",
      name: "Lunch with CEO",
      description: "Exclusive lunch meeting with the company CEO",
      image: "👔",
      category: "experience",
      points: 3000,
      available: true,
      popular: true,
    },
  ];

  // Get unique categories
  const categories = Array.from(new Set(rewards.map((reward) => reward.category)));
  
  // Filter rewards
  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || reward.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Shopping cart state
  const [cart, setCart] = useState<{
    id: string;
    name: string;
    points: number;
    image: string;
  }[]>([]);

  // Add to cart
  const addToCart = (reward: typeof rewards[0]) => {
    const itemToAdd = {
      id: reward.id,
      name: reward.name,
      points: reward.points,
      image: reward.image,
    };
    setCart([...cart, itemToAdd]);
  };

  // Remove from cart
  const removeFromCart = (id: string) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(itemIndex, 1);
      setCart(newCart);
    }
  };

  // Calculate total points
  const totalCartPoints = cart.reduce((total, item) => total + item.points, 0);

  // Recent redemptions (who redeemed what)
  const recentRedemptions = [
    {
      id: "r1",
      reward: rewards[0],
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
        role: "Full-stack Developer",
      },
      date: "2023-07-01",
    },
    {
      id: "r2",
      reward: rewards[4],
      user: {
        name: "Sarah Miller",
        avatar: "/avatars/sarah.jpg",
        role: "UI/UX Designer",
      },
      date: "2023-06-28",
    },
    {
      id: "r3",
      reward: rewards[11],
      user: {
        name: "Emily Williams",
        avatar: "/avatars/emily.jpg",
        role: "Product Manager",
      },
      date: "2023-06-25",
    },
    {
      id: "r4",
      reward: rewards[6],
      user: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        role: "Backend Developer",
      },
      date: "2023-06-22",
    },
    {
      id: "r5",
      reward: rewards[3],
      user: {
        name: "Lisa Taylor",
        avatar: "/avatars/lisa.jpg",
        role: "Frontend Developer",
      },
      date: "2023-06-20",
    },
  ];

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "time-off":
        return <Home className="h-4 w-4" />;
      case "equipment":
        return <Laptop className="h-4 w-4" />;
      case "team":
        return <HeartHandshake className="h-4 w-4" />;
      case "charity":
        return <Leaf className="h-4 w-4" />;
      case "learning":
        return <Award className="h-4 w-4" />;
      case "lifestyle":
        return <Coffee className="h-4 w-4" />;
      case "experience":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (totalCartPoints <= userPoints) {
      setUserPoints(userPoints - totalCartPoints);
      setCart([]);
      setShowCartDialog(false);
      // Here you would handle the actual redemption process
      console.log("Redeeming rewards:", cart);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rewards Store</h2>
          <p className="text-muted-foreground">
            Redeem your points for rewards and perks.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={() => setShowCartDialog(true)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cart.length})
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="w-full md:w-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Balance
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userPoints.toLocaleString()} points
            </div>
            <p className="text-xs text-muted-foreground">
              Available to redeem for rewards
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row items-start gap-4 mb-4 flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search rewards..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="flex h-10 w-full md:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="rewards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rewards">All Rewards</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent Redemptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rewards" className="space-y-4">
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardHeader className="text-center pb-2">
                    <div className="text-5xl mx-auto mb-3">
                      {reward.image}
                    </div>
                    <CardTitle>{reward.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1 flex items-center justify-center w-fit mx-auto">
                      {getCategoryIcon(reward.category)}
                      <span className="ml-1">
                        {reward.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                    <div className="mt-3 flex justify-center items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-lg font-medium">{reward.points.toLocaleString()} points</span>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center border-t pt-4">
                    <Button 
                      onClick={() => addToCart(reward)}
                      disabled={userPoints < reward.points}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>All Rewards</CardTitle>
                <CardDescription>
                  Available rewards for point redemption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRewards.map((reward) => (
                    <div key={reward.id} className="flex items-center gap-4 border-b pb-4">
                      <div className="text-4xl">
                        {reward.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{reward.name}</h3>
                          <Badge variant="secondary" className="flex items-center">
                            {getCategoryIcon(reward.category)}
                            <span className="ml-1">
                              {reward.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                          </Badge>
                          {reward.popular && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                      </div>
                      <div className="flex items-center gap-1 mr-4">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{reward.points.toLocaleString()} points</span>
                      </div>
                      <Button 
                        onClick={() => addToCart(reward)}
                        disabled={userPoints < reward.points}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rewards.filter(r => r.popular).map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <CardHeader className="text-center pb-2">
                  <div className="text-5xl mx-auto mb-3">
                    {reward.image}
                  </div>
                  <CardTitle>{reward.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1 flex items-center justify-center w-fit mx-auto">
                    {getCategoryIcon(reward.category)}
                    <span className="ml-1">
                      {reward.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                  <div className="mt-3 flex justify-center items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-lg font-medium">{reward.points.toLocaleString()} points</span>
                  </div>
                </CardContent>
                <CardFooter className="justify-center border-t pt-4">
                  <Button 
                    onClick={() => addToCart(reward)}
                    disabled={userPoints < reward.points}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Redemptions</CardTitle>
              <CardDescription>
                Latest rewards redeemed by team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRedemptions.map((redemption) => (
                  <div key={redemption.id} className="flex items-center gap-4 border-b pb-4">
                    <div className="text-4xl">
                      {redemption.reward.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={redemption.user.avatar} alt={redemption.user.name} />
                          <AvatarFallback>
                            {redemption.user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{redemption.user.name}</span>
                        <span className="text-muted-foreground">redeemed</span>
                        <span className="font-medium">{redemption.reward.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                        <span>
                          {new Date(redemption.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                          {redemption.reward.points.toLocaleString()} points
                        </span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs flex items-center">
                          {getCategoryIcon(redemption.reward.category)}
                          <span className="ml-1">
                            {redemption.reward.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline">View All Redemptions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showCartDialog} onOpenChange={setShowCartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Shopping Cart</DialogTitle>
            <DialogDescription>
              Review and complete your reward redemption.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Your cart is empty</p>
                <p className="text-sm mt-1">Add rewards to redeem your points</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.image}</div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                            {item.points.toLocaleString()} points
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{totalCartPoints.toLocaleString()} points</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Your balance</span>
                    <span>{userPoints.toLocaleString()} points</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Remaining after redemption</span>
                    <span>{(userPoints - totalCartPoints).toLocaleString()} points</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setShowCartDialog(false)}
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={handleCheckout}
              disabled={cart.length === 0 || totalCartPoints > userPoints}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {cart.length > 0 ? "Complete Redemption" : "Cart Empty"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 