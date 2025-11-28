import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ArrowRight, ArrowLeft, Globe, Facebook, Instagram, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Form Schema - same as DemoRequestModal
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter legyen." }),
  email: z.string().email({ message: "Érvényes email címet adj meg." }),
  message: z.string().optional(),
  // Hidden fields for previous steps
  projectType: z.string(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactFormWizard() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<ContactFormValues>>({
    projectType: "",
    website: "",
    facebook: "",
    instagram: "",
    name: "",
    email: "",
    message: ""
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      projectType: "",
      website: "",
      facebook: "",
      instagram: ""
    }
  });

  const handleProjectTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, projectType: type }));
    form.setValue("projectType", type);
    setStep(2);
  };

  const handleStep2Submit = () => {
    // Manual validation or just skip as fields are optional
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  async function onSubmit(values: ContactFormValues) {
    // Combine step 2 data if it wasn't passed to form (though we can sync it)
    const finalData = {
      ...values,
      projectType: formData.projectType,
      website: formData.website,
      facebook: formData.facebook,
      instagram: formData.instagram
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hiba történt az üzenet küldése során.");
      }

      toast({
        title: "Üzenet elküldve!",
        description: "Köszönöm! Hamarosan válaszolok a megadott email címen.",
      });
      
      // Reset form and go back to step 1 after a delay
      setTimeout(() => {
        setStep(1);
        form.reset();
        setFormData({});
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Hiba történt",
        description: error instanceof Error ? error.message : "Nem sikerült elküldeni az üzenetet.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="border-none shadow-2xl w-full max-w-lg mx-auto overflow-hidden relative">
      <CardHeader className="px-5 sm:px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <CardTitle className="text-2xl text-foreground">
              {step === 1 ? "Írj üzenetet" : step === 2 ? "Online jelenlét" : "Kapcsolati adatok"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Válassz, hogy miben segíthetek!"}
              {step === 2 && "Hol vagy most jelen online? (Opcionális)"}
              {step === 3 && "Hova küldhetem a választ?"}
            </CardDescription>
          </div>
          <span className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border">
            {step} / 3. lépés
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-border h-1 mt-4 rounded-full overflow-hidden">
          <motion.div 
            className="bg-primary h-full transition-all duration-500 ease-in-out" 
            initial={{ width: "33.33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="px-5 sm:px-8 pb-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* Step 1: Project Type Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-3"
            >
              {[
                { id: "new-webshop", label: "Webshop", desc: "Termékeket szeretnék árulni" },
                { id: "new-website", label: "Bemutatkozó oldal", desc: "Szolgáltatást kínálok" },
                { id: "redesign", label: "Átalakítás / Karbantartás", desc: "Meglévő oldal fejlesztése" },
                { id: "inquiry", label: "Még nem tudom pontosan", desc: "Közösen kitaláljuk" }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleProjectTypeSelect(type.id)}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group text-left"
                >
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{type.label}</div>
                    <div className="text-sm text-muted-foreground">{type.desc}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 2: Online Presence (Optional) */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram link
                  </label>
                  <Input 
                    placeholder="instagram.com/te_markad" 
                    value={formData.instagram || ""}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Facebook className="h-4 w-4" /> Facebook oldal
                  </label>
                  <Input 
                    placeholder="facebook.com/oldalad" 
                    value={formData.facebook || ""}
                    onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Weboldal / Egyéb link
                  </label>
                  <Input 
                    placeholder="pl. Etsy bolt, meglévő weboldal..." 
                    value={formData.website || ""}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="bg-secondary/30 p-3 rounded-lg text-xs text-muted-foreground flex gap-2">
                <div className="shrink-0 mt-0.5">ℹ️</div>
                <p>Ha nincs semmid, nyugodtan hagyd üresen, ez csak nekem segít, hogy lássam a stílusodat.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleBack} className="w-1/3">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Vissza
                </Button>
                <Button onClick={handleStep2Submit} className="w-2/3">
                  Tovább <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Neved</FormLabel>
                        <FormControl>
                          <Input placeholder="Hogy szólíthatlak?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email címed</FormLabel>
                        <FormControl>
                          <Input placeholder="Ahová a választ küldhetem..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Megjegyzés (opcionális)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Bármi, amit fontosnak tartasz..." 
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={handleBack} className="w-1/3">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Vissza
                    </Button>
                    <Button type="submit" className="w-2/3 bg-primary text-primary-foreground hover:bg-primary/90">
                      Üzenet küldése <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
