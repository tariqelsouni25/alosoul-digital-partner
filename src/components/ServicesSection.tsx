import { useState } from "react";
import { Sparkles, Brain, Bot, Zap, MessageSquare, Cloud, BarChart3, Globe, TrendingUp, Heart, Building, Palette, Image, FileText, PenTool, Languages, Calendar, Presentation, Cpu, Code, Smartphone, Megaphone, Share2, LucideIcon } from "lucide-react";
import { newServices, oldServices, ServiceDetail } from "@/data/services";
import ServiceModal from "./ServiceModal";

const iconMap: Record<string, LucideIcon> = {
  Brain, Bot, Zap, MessageSquare, Cloud, BarChart3, Globe, TrendingUp,
  Heart, Building, Palette, Image, FileText, PenTool, Languages,
  Calendar, Presentation, Cpu, Code, Smartphone, Megaphone, Share2
};

const ServiceCard = ({ 
  service, 
  onClick, 
  index 
}: { 
  service: ServiceDetail; 
  onClick: () => void;
  index: number;
}) => {
  const IconComponent = iconMap[service.icon] || Sparkles;
  
  return (
    <button
      onClick={onClick}
      className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 text-right animate-fade-up hover:bg-card/80"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {service.name}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {service.description}
      </p>
    </button>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* New Services Section */}
      <section id="new-services" className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">حلول متقدمة</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              خدماتنا الحالية{" "}
              <span className="text-gradient">(الذكاء الاصطناعي والأتمتة)</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نقدم حلولاً متكاملة تجمع بين الذكاء الاصطناعي والأتمتة لتحقيق نتائج استثنائية
            </p>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {newServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => handleServiceClick(service)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Old Services Section */}
      <section id="old-services" className="py-20 md:py-28 bg-card/30 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              الخدمات السابقة
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              خبرة واسعة في مختلف المجالات الرقمية والإبداعية
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-10 max-w-5xl mx-auto">
            {oldServices.map((category, categoryIndex) => (
              <div 
                key={category.title} 
                className="animate-fade-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                {/* Category Title */}
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.title}
                </h3>
                
                {/* Services Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      className="chip-outlined"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ServicesSection;