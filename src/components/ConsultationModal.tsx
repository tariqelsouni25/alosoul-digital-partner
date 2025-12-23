import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getAllServices } from "@/data/services";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  company: string;
  services: string[];
  notes: string;
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    company: "",
    services: [],
    notes: "",
  });

  const allServices = getAllServices();

  const validatePhone = (phone: string): boolean => {
    // Saudi phone validation: +966 or 05 format
    const saudiPhoneRegex = /^(\+966|00966|966|05|5)[0-9]{8,9}$/;
    const cleanPhone = phone.replace(/\s|-/g, "");
    return saudiPhoneRegex.test(cleanPhone);
  };

  const handleServiceToggle = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الاسم الكامل",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم جوال صحيح (مثال: 0541012343 أو +966541012343)",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Try to send via edge function first
      const response = await fetch("/api/send-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "شكرًا لك",
          description: "سنتواصل معك قريبًا",
        });
        setFormData({
          fullName: "",
          phone: "",
          company: "",
          services: [],
          notes: "",
        });
        onClose();
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      // Fallback: Open mailto with form data
      const subject = encodeURIComponent("طلب استشارة جديد");
      const body = encodeURIComponent(
        `الاسم: ${formData.fullName}\n` +
        `الجوال: ${formData.phone}\n` +
        `الشركة: ${formData.company || "غير محدد"}\n` +
        `الخدمات المطلوبة: ${formData.services.join("، ") || "غير محدد"}\n` +
        `ملاحظات: ${formData.notes || "لا يوجد"}`
      );
      
      window.open(`mailto:info@alosoultech.com?subject=${subject}&body=${body}`, "_blank");
      
      toast({
        title: "شكرًا لك",
        description: "تم فتح برنامج البريد الإلكتروني. يرجى إرسال الرسالة.",
      });
      
      setFormData({
        fullName: "",
        phone: "",
        company: "",
        services: [],
        notes: "",
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border/50 p-0 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-glass p-6 border-b border-border/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground text-right">
              احجز جلسة استشارة
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">
                الاسم الكامل <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="أدخل اسمك الكامل"
                className="bg-background border-border/50 focus:border-primary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                رقم الجوال <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05xxxxxxxx أو +966xxxxxxxxx"
                className="bg-background border-border/50 focus:border-primary"
                dir="ltr"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">
                اسم الشركة <span className="text-muted-foreground text-xs">(اختياري)</span>
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="اسم شركتك أو مؤسستك"
                className="bg-background border-border/50 focus:border-primary"
              />
            </div>

            {/* Services Selection */}
            <div className="space-y-3">
              <Label className="text-foreground">
                اختيار الخدمات <span className="text-muted-foreground text-xs">(اختياري)</span>
              </Label>
              <div className="max-h-40 overflow-y-auto space-y-2 p-3 bg-background/50 rounded-lg border border-border/30">
                {allServices.map((service) => (
                  <div key={service.id} className="flex items-center gap-3">
                    <Checkbox
                      id={service.id}
                      checked={formData.services.includes(service.name)}
                      onCheckedChange={() => handleServiceToggle(service.name)}
                      className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={service.id}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      {service.name}
                    </label>
                  </div>
                ))}
              </div>
              {formData.services.length > 0 && (
                <p className="text-xs text-primary">
                  تم اختيار {formData.services.length} خدمة
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground">
                ملاحظات <span className="text-muted-foreground text-xs">(اختياري)</span>
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="أخبرنا المزيد عن مشروعك أو احتياجاتك..."
                rows={3}
                className="bg-background border-border/50 focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border/50"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gap-2 bg-gradient-primary hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  إرسال
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
