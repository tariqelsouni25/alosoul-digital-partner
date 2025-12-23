import { ArrowDown, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenConsultation: () => void;
}

const Hero = ({ onOpenConsultation }: HeroProps) => {
  const scrollToServices = () => {
    const element = document.querySelector("#new-services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">شريكك للتحول الرقمي</span>
          </div>

          {/* Main Heading with Animated Border */}
          <div 
            className="relative mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Border Container */}
            <div className="relative inline-block px-10 py-10 md:px-16 md:py-12">
              {/* Static gradient border */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(210 100% 60%), hsl(var(--primary)))',
                  padding: '3px',
                }}
              >
                <div className="absolute inset-[3px] rounded-xl bg-background" />
              </div>
              {/* Glow effect */}
              <div 
                className="absolute -inset-1 rounded-2xl blur-lg opacity-30"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(210 100% 60%), hsl(var(--primary)))',
                }}
              />
              
              {/* Text Content */}
              <h1 className="relative text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                <span className="block mb-4">لنبدأ من واقع تجاربنا</span>
                <span className="block">ومعاً نحو التحول الرقمي</span>
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            حلول ذكاء اصطناعي وأتمتة وتجارب رقمية ترفع الكفاءة وتحقق نتائج قابلة للقياس.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-gradient-primary hover:opacity-90 transition-opacity glow-primary text-base px-8"
              onClick={scrollToServices}
            >
              استعرض الخدمات
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 border-primary/50 hover:bg-primary/10 text-base px-8"
              onClick={onOpenConsultation}
            >
              <Calendar className="w-4 h-4" />
              احجز استشارة
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-border/30 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">+50</div>
              <div className="text-xs md:text-sm text-muted-foreground">مشروع منجز</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">+30</div>
              <div className="text-xs md:text-sm text-muted-foreground">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">+12</div>
              <div className="text-xs md:text-sm text-muted-foreground">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;