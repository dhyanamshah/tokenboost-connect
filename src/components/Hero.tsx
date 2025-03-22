
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex items-center bg-crypto-pattern">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-50 rounded-full animate-fade-in">
            <span className="text-crypto-blue font-medium text-sm">Revolutionizing Token Creation</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-gradient">Tokenize</span> Your Influence & Vision
          </h1>
          
          <p className="text-crypto-gray text-xl md:text-2xl mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Custom crypto tokens for influencers and startups. Gain independence from traditional funding and amplify your reach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" className="bg-crypto-blue hover:bg-crypto-blue/90 text-white px-8 py-6 text-lg btn-shine">
              Get Your Token
            </Button>
            <Button size="lg" variant="outline" className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue/5 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <button 
              onClick={scrollToFeatures}
              className="inline-flex flex-col items-center gap-2 text-crypto-gray hover:text-crypto-blue transition-colors"
            >
              <span>Discover More</span>
              <ArrowDown className="animate-bounce" />
            </button>
          </div>
        </div>
        
        <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
