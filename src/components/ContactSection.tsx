import { Phone, Mail, MessageCircle, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSectionProps {
  onOpenConsultation: () => void;
}

const ContactSection = ({ onOpenConsultation }: ContactSectionProps) => {
  const contactInfo = [
    {
      icon: Phone,
      label: "اتصل بنا",
      value: "+966 57 374 5145",
      href: "tel:+966573745145",
      color: "text-green-400"
    },
    {
      icon: Mail,
      label: "البريد الإلكتروني",
      value: "info@alosoultech.com",
      href: "mailto:info@alosoultech.com",
      color: "text-blue-400"
    },
    {
      icon: MessageCircle,
      label: "واتساب",
      value: "تواصل عبر الواتساب",
      href: "https://wa.me/966573745145",
      color: "text-emerald-400",
      external: true
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              تواصل <span className="text-gradient">معنا</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              نحن هنا لمساعدتك في تحقيق أهدافك الرقمية. تواصل معنا اليوم!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-primary"
                >
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">{item.label}</h3>
                  <p className="text-foreground font-medium" dir="ltr">{item.value}</p>
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="p-8 rounded-2xl bg-gradient-glass border border-primary/20 max-w-xl mx-auto">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">احجز جلسة استشارة مجانية</h3>
              <p className="text-muted-foreground text-sm mb-6">
                دعنا نتحدث عن مشروعك ونكتشف كيف يمكننا مساعدتك
              </p>
              <Button
                size="lg"
                className="gap-2 bg-gradient-primary hover:opacity-90 glow-primary"
                onClick={onOpenConsultation}
              >
                <Calendar className="w-4 h-4" />
                احجز استشارة الآن
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 mt-20 pt-8 border-t border-border/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Alosoul AI Partner. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="tel:+966573745145" className="hover:text-foreground transition-colors">
              +966 57 374 5145
            </a>
            <span>•</span>
            <a href="mailto:info@alosoultech.com" className="hover:text-foreground transition-colors">
              info@alosoultech.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
