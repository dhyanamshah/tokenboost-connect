
import { useState, useEffect } from "react";
import { ContactFormData } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContactFormData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated]);

  const loadSubmissions = () => {
    const savedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    setSubmissions(savedSubmissions);
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in a real app, use a proper auth system
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Authenticated",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    const updatedSubmissions = submissions.filter(sub => sub.id !== id);
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);
    toast({
      title: "Submission Deleted",
      description: "The contact submission has been removed",
    });
  };

  const handleExport = () => {
    const jsonString = JSON.stringify(submissions, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Contact submissions have been exported as JSON",
    });
  };

  const filteredSubmissions = submissions.filter(sub => {
    const searchLower = searchQuery.toLowerCase();
    return (
      sub.name.toLowerCase().includes(searchLower) ||
      sub.email.toLowerCase().includes(searchLower) ||
      sub.role.toLowerCase().includes(searchLower) ||
      sub.message.toLowerCase().includes(searchLower)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-crypto-dark text-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <div>
            <Link to="/" className="inline-flex items-center text-crypto-blue hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-white/60 mt-2">Enter the password to access submissions</p>
          </div>
          <form onSubmit={handleAuthenticate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/10 text-white"
                placeholder="Enter admin password"
                required
              />
              <p className="text-xs text-white/40 mt-1">Default: admin123</p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-crypto-blue hover:underline mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/60">View and manage contact submissions</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleExport} 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/5"
            >
              Export Data
            </Button>
            <Button 
              onClick={() => setIsAuthenticated(false)} 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/5"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Contact Submissions ({submissions.length})
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <Input
                placeholder="Search submissions..."
                className="pl-10 bg-white/10 border-white/10 text-white w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              No contact submissions yet
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="rounded-md border border-white/10 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Role</TableHead>
                    <TableHead className="text-white">Website</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id} className="border-white/5">
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell className="capitalize">{submission.role}</TableCell>
                      <TableCell>
                        {submission.website ? (
                          <a 
                            href={submission.website.startsWith('http') ? submission.website : `https://${submission.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-crypto-blue hover:underline"
                          >
                            {submission.website}
                          </a>
                        ) : (
                          <span className="text-white/40">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(submission.date).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-white/60 hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDelete(submission.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
