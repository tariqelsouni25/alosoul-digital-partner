import { useState } from "react";
import { Sparkles } from "lucide-react";
import { newServices, oldServices, ServiceDetail } from "@/data/services";
import ServiceModal from "./ServiceModal";

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

          {/* Services Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {newServices.map((service, index) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="chip-outlined animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {service.name}
              </button>
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
