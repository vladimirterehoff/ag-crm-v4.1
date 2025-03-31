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

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1: Google login + phone verification
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Step 2: Company details
  const [companyName, setCompanyName] = useState("");
  const [subdomainPrefix, setSubdomainPrefix] = useState("");

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    // Simulate Google Sign-In
    setTimeout(() => {
      toast.success("Successfully signed in with Google!");
      setIsLoading(false);
      // In a real app, we would get user details from Google
    }, 1000);
  };

  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      toast.success("Verification code sent to your phone!");
      setIsVerifying(false);
    }, 1000);
  };

  const handleVerifyPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate phone verification
    setTimeout(() => {
      toast.success("Phone number verified successfully!");
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate
    if (!companyName || !subdomainPrefix) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    
    // Simulate workspace creation
    setTimeout(() => {
      toast.success("Your workspace has been created!");
      // Redirect to the new workspace
      router.push(`/workspace/${subdomainPrefix}/onboarding`);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            {step === 1 
              ? "Create your account to get started" 
              : "Set up your company workspace"}
          </CardDescription>
        </CardHeader>
        
        {step === 1 ? (
          // Step 1: Auth with Google + Phone verification
          <form onSubmit={handleVerifyPhone}>
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
                  Sign up with Google
                </Button>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <span className="relative px-2 text-muted-foreground text-sm bg-background">
                  Phone Verification
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleSendVerificationCode}
                      disabled={isVerifying}
                    >
                      {isVerifying ? "Sending..." : "Send Code"}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter the 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          // Step 2: Company and workspace setup
          <form onSubmit={handleCreateWorkspace}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company, Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subdomainPrefix">Workspace Subdomain</Label>
                <div className="flex items-center">
                  <Input 
                    id="subdomainPrefix"
                    placeholder="yourcompany"
                    value={subdomainPrefix}
                    onChange={(e) => setSubdomainPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="rounded-r-none"
                    required
                  />
                  <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-muted-foreground">
                    .site.com
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This will be your unique workspace URL. Use lowercase letters, numbers, and hyphens only.
                </p>
              </div>
              
              <div className="pt-2">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 text-sm text-muted-foreground">
                      <p>
                        Your workspace will start with a free trial. No credit card required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating workspace..." : "Create Workspace"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setStep(1)}
                disabled={isLoading}
              >
                Back
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
} 