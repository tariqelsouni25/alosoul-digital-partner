import { X } from "lucide-react";
import * as Icons from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServiceDetail } from "@/data/services";

interface ServiceModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  if (!service) return null;

  // Dynamic icon component
  const IconComponent = (Icons as any)[service.icon] || Icons.Sparkles;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border/50 p-0 overflow-hidden">
        <div className="relative">
          {/* Header with gradient */}
          <div className="bg-gradient-glass p-6 border-b border-border/30">
            <DialogHeader className="flex-row items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <DialogTitle className="text-xl font-bold text-foreground text-right">
                  {service.name}
                </DialogTitle>
              </div>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Details Section */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                ما الذي تتضمنه الخدمة
              </h4>
              <ul className="space-y-3">
                {service.details.map((detail, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/60 mt-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            {service.useCases && service.useCases.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  حالات الاستخدام
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.useCases.map((useCase, index) => (
                    <span 
                      key={index}
                      className="chip-filled text-xs"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
