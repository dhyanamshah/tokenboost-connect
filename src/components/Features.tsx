
import { Sparkles, Users, Target, Globe, ShieldCheck, LineChart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`glass-card rounded-2xl p-6 transition-all duration-500 ease-out transform ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="text-crypto-blue" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-crypto-dark">{title}</h3>
      <p className="text-crypto-gray">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Instant Token Creation",
      description: "Launch your custom token in minutes with our streamlined process.",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Engage and reward your followers with token-based incentives.",
    },
    {
      icon: Target,
      title: "Precise Targeting",
      description: "Reach your ideal audience through token-powered marketing.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with supporters worldwide through blockchain technology.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Compliant",
      description: "Our tokens meet industry standards with built-in security features.",
    },
    {
      icon: LineChart,
      title: "Growth Analytics",
      description: "Track performance and optimize your token strategy with real-time data.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-50 rounded-full">
            <span className="text-crypto-blue font-medium text-sm">Why Choose TokenBoost</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Features for Your Success</h2>
          <p className="text-crypto-gray text-lg">
            Our platform provides everything you need to create, manage, and grow your custom token ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
