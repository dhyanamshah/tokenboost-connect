
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rocket, Trophy } from "lucide-react";

const PathSelector = () => {
  const [activePath, setActivePath] = useState<"influencers" | "startups">("influencers");

  const paths = {
    influencers: {
      icon: Trophy,
      title: "For Influencers",
      subtitle: "Monetize your influence",
      description: "Create your own token to reward followers, unlock exclusive content, and build a sustainable income stream independent of platform algorithms.",
      benefits: [
        "Direct monetization of your audience",
        "Exclusive content distribution",
        "Community ownership and engagement",
        "Independence from platform changes",
        "New revenue streams through token appreciation"
      ]
    },
    startups: {
      icon: Rocket,
      title: "For Startups",
      subtitle: "Fund your vision",
      description: "Raise capital, reward early adopters, and create a loyal customer base while maintaining control of your company's direction and vision.",
      benefits: [
        "Alternative to traditional VC funding",
        "Community-driven development",
        "Built-in customer acquisition",
        "Transparent governance options",
        "Liquidity options for token holders"
      ]
    }
  };

  const activeBenefits = paths[activePath].benefits;
  const ActiveIcon = paths[activePath].icon;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-crypto-gray text-lg">
              TokenBoost offers tailored solutions for different needs. Select your path to learn more.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Path Tabs */}
            <div className="flex border-b">
              <button
                className={cn(
                  "flex-1 py-4 text-center transition-colors",
                  activePath === "influencers" 
                    ? "bg-blue-50 text-crypto-blue font-medium" 
                    : "text-crypto-gray hover:bg-blue-50/30"
                )}
                onClick={() => setActivePath("influencers")}
                id="for-influencers"
              >
                <span className="flex items-center justify-center gap-2">
                  <Trophy size={18} />
                  For Influencers
                </span>
              </button>
              <button
                className={cn(
                  "flex-1 py-4 text-center transition-colors",
                  activePath === "startups" 
                    ? "bg-blue-50 text-crypto-blue font-medium" 
                    : "text-crypto-gray hover:bg-blue-50/30"
                )}
                onClick={() => setActivePath("startups")}
                id="for-startups"
              >
                <span className="flex items-center justify-center gap-2">
                  <Rocket size={18} />
                  For Startups
                </span>
              </button>
            </div>

            {/* Path Content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <ActiveIcon size={32} className="text-crypto-blue" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{paths[activePath].title}</h3>
                    <p className="text-crypto-blue font-medium">{paths[activePath].subtitle}</p>
                  </div>
                  
                  <p className="text-crypto-gray mb-8">
                    {paths[activePath].description}
                  </p>
                  
                  <h4 className="font-semibold mb-4">Key Benefits:</h4>
                  <ul className="space-y-3 mb-8">
                    {activeBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-crypto-blue"></div>
                        </div>
                        <span className="text-crypto-gray">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-white btn-shine">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PathSelector;
