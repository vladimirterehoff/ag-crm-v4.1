"use client";

import { useState, use } from "react";
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
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Users,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

interface OnboardingPageProps {
  params: {
    subdomain: string;
  };
}

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const { subdomain } = use(params);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to Your Workspace",
      description: "Let's get you set up with your new workspace.",
      action: "Start Setup",
    },
    {
      title: "Invite Team Members",
      description: "Add your team members to collaborate with you.",
      action: "Continue",
    },
    {
      title: "Create Your First Project",
      description: "Set up a project to start organizing your work.",
      action: "Continue",
    },
    {
      title: "Setup Complete!",
      description: "You're all set to start using your workspace.",
      action: "Go to Dashboard",
    },
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished onboarding
      toast.success("Onboarding complete!");
      router.push(`/workspace/${subdomain}/dashboard`);
    }
  };

  const onboardingFeatures = [
    {
      title: "Projects",
      description: "Create and manage projects, sprints, and epics",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
    },
    {
      title: "Team",
      description: "Add team members and assign roles",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Time Tracking",
      description: "Track time spent on tasks and projects",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
  ];

  const companyName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background space-y-8">
      <div className="w-full max-w-3xl space-y-2 text-center">
        <h1 className="text-3xl font-bold">{steps[currentStep].title}</h1>
        <p className="text-muted-foreground">{steps[currentStep].description}</p>
      </div>
      
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Onboarding</CardTitle>
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep 
                      ? "bg-primary" 
                      : index < currentStep 
                      ? "bg-primary opacity-50" 
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="flex justify-center items-center h-20 w-20 rounded-md bg-primary text-primary-foreground text-4xl font-semibold">
                  {companyName.charAt(0)}
                </div>
              </div>
              <div className="text-center mt-6">
                <h2 className="text-xl font-medium">Welcome to {companyName} Workspace</h2>
                <p className="text-muted-foreground mt-2">
                  You've successfully created your workspace. Here are some features you'll have access to:
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {onboardingFeatures.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-4 text-center space-y-2">
                    <div className="flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border p-4 rounded-lg">
                <div className="bg-muted p-2 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Invite Your Team</h3>
                  <p className="text-sm text-muted-foreground">Add team members to collaborate on projects and tasks.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info("This would open an invite form in a real app")}>
                  Invite
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Team Members</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>You (Admin)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border-dashed border-2 rounded-md border-muted">
                    <span className="text-muted-foreground">Invite team members to get started</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(0)}>
                  Back
                </Button>
                <p className="text-sm text-muted-foreground">
                  You can skip this step and invite team members later
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border p-4 rounded-lg">
                <div className="bg-muted p-2 rounded-full">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Create Your First Project</h3>
                  <p className="text-sm text-muted-foreground">Set up a project to organize your work and tasks.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toast.info("This would open a project creation form in a real app")}
                >
                  Create
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Project Templates</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent">
                    <div>
                      <h4 className="font-medium">Software Development</h4>
                      <p className="text-sm text-muted-foreground">For building and shipping software products</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent">
                    <div>
                      <h4 className="font-medium">Client Work</h4>
                      <p className="text-sm text-muted-foreground">For managing client projects and deliverables</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent">
                    <div>
                      <h4 className="font-medium">Blank Project</h4>
                      <p className="text-sm text-muted-foreground">Start from scratch with a clean slate</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <p className="text-sm text-muted-foreground">
                  You can skip this step and create projects later
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-medium">You're all set!</h2>
                <p className="text-muted-foreground mt-2">
                  Your workspace is ready to use. You can now start creating projects, adding tasks, and inviting team members.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="border rounded-lg p-4 hover:border-primary hover:bg-accent cursor-pointer">
                  <Briefcase className="h-6 w-6 mb-2 mx-auto" />
                  <h3 className="font-medium">Create project</h3>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary hover:bg-accent cursor-pointer">
                  <Users className="h-6 w-6 mb-2 mx-auto" />
                  <h3 className="font-medium">Invite team</h3>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary hover:bg-accent cursor-pointer">
                  <Clock className="h-6 w-6 mb-2 mx-auto" />
                  <h3 className="font-medium">Track time</h3>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 0 && currentStep < 3 && (
            <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep === 0 && <div></div>}
          <Button onClick={handleNext}>
            {steps[currentStep].action}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 