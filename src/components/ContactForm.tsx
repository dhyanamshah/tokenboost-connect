
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "influencer", // or startup
    website: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setLoading(false);
    setFormData({
      name: "",
      email: "",
      role: "influencer",
      website: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-crypto-dark text-white">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="sticky top-32">
              <div className="inline-block mb-4 px-3 py-1 bg-blue-900/30 rounded-full">
                <span className="text-crypto-blue font-medium text-sm">Contact Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Token?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Fill out the form and our team will get back to you within 24 hours to discuss your custom token solution.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-crypto-blue"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Expert Consultation</h3>
                    <p className="text-white/60">Get personalized advice from our token specialists</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-crypto-blue"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Custom Solutions</h3>
                    <p className="text-white/60">Tailored token design based on your specific needs</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-crypto-blue"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Ongoing Support</h3>
                    <p className="text-white/60">Dedicated assistance throughout your token journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/80">
                    Full Name
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Enter your full name"
                      required
                    />
                  </label>
                  
                  <label className="block text-sm font-medium text-white/80">
                    Email Address
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Enter your email address"
                      required
                    />
                  </label>
                  
                  <label className="block text-sm font-medium text-white/80">
                    I am a...
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md bg-white/10 border-white/10 text-white px-3 py-2"
                      required
                    >
                      <option value="influencer">Content Creator / Influencer</option>
                      <option value="startup">Startup Founder / Business</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  
                  <label className="block text-sm font-medium text-white/80">
                    Website / Social Media (Optional)
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/10 text-white placeholder:text-white/40"
                      placeholder="Enter your website or social media URL"
                    />
                  </label>
                  
                  <label className="block text-sm font-medium text-white/80">
                    Your Message
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 min-h-32"
                      placeholder="Tell us about your goals and needs"
                      required
                    />
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white btn-shine h-12",
                    loading && "opacity-80"
                  )}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </span>
                  ) : "Submit Request"}
                </Button>
                
                <p className="text-xs text-center text-white/60">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
