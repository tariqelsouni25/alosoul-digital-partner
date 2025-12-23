import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
      <ServicesSection />
      <ContactSection onOpenConsultation={() => setIsConsultationOpen(true)} />
      <WhatsAppButton />
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
};

export default Index;
