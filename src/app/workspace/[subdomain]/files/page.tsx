"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  File,
  FileText,
  Folder,
  Grid,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Upload,
  Download,
  Share,
  Trash,
  Eye,
  FileImage,
  FileArchive,
  FileCode,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FilesPageProps {
  params: {
    subdomain: string;
  };
}

export default function FilesPage({ params }: FilesPageProps) {
  const { subdomain } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentFolder, setCurrentFolder] = useState("root");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  
  // Sample files data - in real implementation this would come from API
  const files = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "pdf",
      size: "2.4 MB",
      owner: "John Doe",
      modified: "2023-05-15",
      folder: "root",
      shared: true,
    },
    {
      id: "2",
      name: "Meeting Notes.docx",
      type: "doc",
      size: "1.1 MB",
      owner: "Sarah Miller",
      modified: "2023-05-20",
      folder: "root",
      shared: true,
    },
    {
      id: "3",
      name: "Budget Spreadsheet.xlsx",
      type: "sheet",
      size: "3.7 MB",
      owner: "Michael Chen",
      modified: "2023-05-10",
      folder: "root",
      shared: false,
    },
    {
      id: "4",
      name: "Logo Design.png",
      type: "image",
      size: "4.2 MB",
      owner: "Emily Williams",
      modified: "2023-05-05",
      folder: "designs",
      shared: true,
    },
    {
      id: "5",
      name: "App Mockup.sketch",
      type: "design",
      size: "8.5 MB",
      owner: "Emily Williams",
      modified: "2023-05-08",
      folder: "designs",
      shared: false,
    },
    {
      id: "6",
      name: "API Documentation.md",
      type: "text",
      size: "0.3 MB",
      owner: "David Johnson",
      modified: "2023-05-12",
      folder: "development",
      shared: true,
    },
    {
      id: "7",
      name: "Source Code.zip",
      type: "archive",
      size: "15.7 MB",
      owner: "Michael Chen",
      modified: "2023-05-18",
      folder: "development",
      shared: false,
    },
  ];
  
  // Sample folders data
  const folders = [
    {
      id: "designs",
      name: "Designs",
      files: 2,
      parent: "root",
    },
    {
      id: "development",
      name: "Development",
      files: 2,
      parent: "root",
    },
    {
      id: "marketing",
      name: "Marketing",
      files: 0,
      parent: "root",
    },
  ];

  // Filter files based on current folder and search query
  const filteredFiles = files.filter(file => {
    const matchesFolder = file.folder === currentFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFolder && matchesSearch;
  });
  
  // Filter folders based on current folder
  const filteredFolders = folders.filter(folder => {
    return folder.parent === currentFolder;
  });

  // Get file icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "doc":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "sheet":
        return <FileText className="h-8 w-8 text-green-500" />;
      case "image":
        return <FileImage className="h-8 w-8 text-purple-500" />;
      case "design":
        return <FileImage className="h-8 w-8 text-orange-500" />;
      case "text":
        return <FileCode className="h-8 w-8 text-gray-500" />;
      case "archive":
        return <FileArchive className="h-8 w-8 text-amber-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  // Handle file selection
  const toggleFileSelection = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  // Handle folder navigation
  const navigateToFolder = (folderId: string) => {
    setCurrentFolder(folderId);
    // Clear selections when changing folders
    setSelectedFiles([]);
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Files uploaded successfully!");
    setIsUploadOpen(false);
    
    // In a real implementation, this would upload files to the API
    // and update the UI with the new files
  };
  
  // Handle file download
  const handleDownload = (fileId: string) => {
    toast.success("File download started");
    
    // In a real implementation, this would trigger a file download
  };
  
  // Handle file sharing
  const handleShare = (fileId: string) => {
    toast.success("Sharing options opened");
    
    // In a real implementation, this would open a sharing dialog
  };
  
  // Handle file deletion
  const handleDelete = (fileId: string) => {
    toast.error("File deleted");
    
    // In a real implementation, this would delete the file from the API
    // and update the UI
  };

  // Get current folder name
  const getCurrentFolderName = () => {
    if (currentFolder === "root") {
      return "All Files";
    }
    
    const folder = folders.find(f => f.id === currentFolder);
    return folder ? folder.name : "Unknown Folder";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Files</h2>
          <p className="text-muted-foreground">
            Manage and organize your workspace files.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center border rounded-md p-1 bg-background">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "px-3",
                viewMode === "list" && "bg-secondary"
              )}
              onClick={() => setViewMode("list")}
            >
              <File className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "px-3",
                viewMode === "grid" && "bg-secondary"
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Upload files to your workspace.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFileUpload}>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center mb-1">
                      Drag and drop files here, or click to select files
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer text-sm text-primary font-medium hover:underline"
                    >
                      Select files
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="folder">Destination Folder</Label>
                    <Select defaultValue={currentFolder}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="root">All Files</SelectItem>
                        {folders.map(folder => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Upload Files</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          {currentFolder !== "root" && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateToFolder("root")}
            >
              Back to All Files
            </Button>
          )}
          <h3 className="text-lg font-medium">{getCurrentFolderName()}</h3>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                <CheckCircle className={cn("mr-2 h-4 w-4", sortBy === "name" ? "opacity-100" : "opacity-0")} />
                Sort by Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                <CheckCircle className={cn("mr-2 h-4 w-4", sortBy === "date" ? "opacity-100" : "opacity-0")} />
                Sort by Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("size")}>
                <CheckCircle className={cn("mr-2 h-4 w-4", sortBy === "size" ? "opacity-100" : "opacity-0")} />
                Sort by Size
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("type")}>
                <CheckCircle className={cn("mr-2 h-4 w-4", sortBy === "type" ? "opacity-100" : "opacity-0")} />
                Sort by Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                  Create a new folder to organize your files.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="folder-name">Folder Name</Label>
                    <Input
                      id="folder-name"
                      placeholder="New Folder"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Folder</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === "list" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Shared</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFolders.map((folder) => (
                  <TableRow key={folder.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigateToFolder(folder.id)}>
                    <TableCell className="p-2">
                      <Folder className="h-8 w-8 text-amber-500" />
                    </TableCell>
                    <TableCell className="font-medium">{folder.name}</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell>--</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredFiles.map((file) => (
                  <TableRow key={file.id} className={cn(selectedFiles.includes(file.id) && "bg-muted")}>
                    <TableCell className="p-2">
                      <div onClick={(e) => {
                        e.stopPropagation();
                        toggleFileSelection(file.id);
                      }}>
                        {getFileIcon(file.type)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{file.owner}</TableCell>
                    <TableCell>{new Date(file.modified).toLocaleDateString()}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>
                      {file.shared ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> : 
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      }
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(file.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(file.id)}>
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredFolders.length === 0 && filteredFiles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No files or folders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFolders.map((folder) => (
            <Card 
              key={folder.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigateToFolder(folder.id)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                <Folder className="h-16 w-16 text-amber-500 mb-2" />
                <p className="text-sm font-medium text-center truncate w-full">{folder.name}</p>
                <p className="text-xs text-muted-foreground">{folder.files} files</p>
              </CardContent>
            </Card>
          ))}
          
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              className={cn(
                "hover:bg-muted/50 transition-colors", 
                selectedFiles.includes(file.id) && "bg-muted"
              )}
              onClick={() => toggleFileSelection(file.id)}
            >
              <CardContent className="p-4 flex flex-col items-center">
                {getFileIcon(file.type)}
                <p className="text-sm font-medium text-center truncate w-full mt-2">{file.name}</p>
                <div className="flex justify-between w-full mt-1 text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span>{new Date(file.modified).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex justify-center">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(file.id);
                  }}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {
                    e.stopPropagation();
                    handleShare(file.id);
                  }}>
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredFolders.length === 0 && filteredFiles.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-8 text-muted-foreground">
              <File className="h-16 w-16 mb-2" />
              <p>No files or folders found.</p>
            </div>
          )}
        </div>
      )}
      
      {selectedFiles.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-background border rounded-md p-4 shadow-lg flex items-center gap-2">
          <span className="text-sm font-medium">{selectedFiles.length} selected</span>
          <Button variant="outline" size="sm" onClick={() => setSelectedFiles([])}>
            Clear Selection
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
} 