import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onOpenConsultation: () => void;
}

const Header = ({ onOpenConsultation }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "الخدمات الحالية", href: "#new-services" },
    { label: "الخدمات السابقة", href: "#old-services" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center"
          >
            <img src={logo} alt="Alosoul AI Partner" className="h-10 md:h-12" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-primary/50 hover:bg-primary/10"
              onClick={onOpenConsultation}
            >
              <Calendar className="w-4 h-4" />
              احجز استشارة
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
              asChild
            >
              <a href="https://wa.me/966541012343" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                واتساب
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-right py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-primary/50"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  احجز استشارة
                </Button>
                <Button className="w-full gap-2 bg-gradient-primary" asChild>
                  <a href="https://wa.me/966541012343" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
