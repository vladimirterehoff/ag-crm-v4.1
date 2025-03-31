"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [workspacePrefix, setWorkspacePrefix] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login and redirect to workspace
    try {
      // In a real implementation this would validate credentials and get the correct subdomain
      // For now just use the input or a default
      const subdomain = workspacePrefix || "demo";
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Successfully logged in!");
        // Redirect to workspace subdomain - for demo we'll use route paths
        router.push(`/workspace/${subdomain}/dashboard`);
      }, 1000);
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    // Simulate Google Sign-In and redirect
    setTimeout(() => {
      toast.success("Successfully signed in with Google!");
      // In a real app, we would get the user's workspace from the authentication response
      router.push(`/workspace/demo/dashboard`);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Sign in to your workspace to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                type="button" 
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg 
                  width="18" 
                  height="18" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                    fill="#4285F4" 
                  />
                  <path 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                    fill="#34A853" 
                  />
                  <path 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                    fill="#FBBC05" 
                  />
                  <path 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                    fill="#EA4335" 
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <span className="relative px-2 text-muted-foreground text-sm bg-background">
                Or continue with
              </span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workspace">Workspace Subdomain (optional)</Label>
              <div className="flex items-center">
                <Input 
                  id="workspace"
                  placeholder="yourcompany"
                  value={workspacePrefix}
                  onChange={(e) => setWorkspacePrefix(e.target.value)}
                  className="rounded-r-none"
                />
                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-muted-foreground">
                  .site.com
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Leave blank to be redirected to your default workspace.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 