import WorkspaceSidebar from "@/components/workspace/sidebar";
import WorkspaceHeader from "@/components/workspace/header";
import { use } from "react";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const { subdomain } = params;
  
  return (
    <div className="flex min-h-screen bg-background">
      <WorkspaceSidebar subdomain={subdomain} />
      <div className="flex-1 flex flex-col">
        <WorkspaceHeader subdomain={subdomain} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
} 