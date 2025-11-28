import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code,
  Layout,
  MessageSquare,
  Zap,
  Mail,
  Smartphone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Star,
  Settings,
  Wand2,
  ShoppingCart,
  PenTool,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, ChevronDown, Globe } from "lucide-react";
import { useState } from "react";

// Assets
// Assets
import heroBg from "@assets/generated_images/minimalist_bright_home_office_workspace_with_laptop.png";

// Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter legyen." }),
  email: z.string().email({ message: "Érvényes email címet adj meg." }),
  projectType: z.string().min(1, { message: "Kérlek válassz egy opciót." }),
  message: z.string().min(10, { message: "Az üzenet legalább 10 karakter legyen." }),
  // Optional social media and website fields
  website: z.string().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Érvényes URL-t adj meg.",
  }).optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  tiktok: z.string().optional().or(z.literal("")),
  youtube: z.string().optional().or(z.literal("")),
  pinterest: z.string().optional().or(z.literal("")),
});

export default function Home() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialMediaOpen, setSocialMediaOpen] = useState(false);
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      tiktok: "",
      youtube: "",
      pinterest: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hiba történt az üzenet küldése során.");
      }

      toast({
        title: "Üzenet elküldve!",
        description: "Köszönöm! Hamarosan felveszem veled a kapcsolatot. Ha megadtad az online jelenléted, személyre szabott demót készítek neked.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Hiba történt",
        description: error instanceof Error ? error.message : "Nem sikerült elküldeni az üzenetet. Kérlek próbáld újra.",
        variant: "destructive",
      });
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Navigation (Simple) */}
      {/* Navigation (Minimalist) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-heading font-bold text-xl text-foreground tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center text-background font-bold">B</div>
            Balogh Ferenc
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('services')} className="hover:text-foreground transition-colors">Szolgáltatások</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-foreground transition-colors">Munkáim</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-foreground transition-colors">Árazás</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-foreground transition-colors">Rólam</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-foreground transition-colors">GYIK</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-foreground transition-colors">Kapcsolat</button>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => scrollToSection('demo')} variant="default" size="sm" className="hidden sm:flex rounded-full px-4 lg:px-6 font-medium text-xs lg:text-sm">
              <span className="hidden lg:inline">Kérem az ingyenes demótervet</span>
              <span className="lg:hidden">Demóterv</span>
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Szolgáltatások
                  </button>
                  <button onClick={() => scrollToSection('portfolio')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Munkáim
                  </button>
                  <button onClick={() => scrollToSection('pricing')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Árazás
                  </button>
                  <button onClick={() => scrollToSection('about')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Rólam
                  </button>
                  <button onClick={() => scrollToSection('faq')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    GYIK
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Kapcsolat
                  </button>
                  <div className="pt-4 border-t">
                    <Button onClick={() => scrollToSection('demo')} variant="default" className="w-full rounded-full">
                      Kérem az ingyenes demótervet
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section (Animated & Dynamic) */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
        {/* Dynamic Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/20 blur-[120px] rounded-full pointer-events-none"
        />

        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-4xl mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-4 sm:mb-6 tracking-tight">
                Nem csak egy weboldal.<br />
                <span className="text-muted-foreground">Egy digitális rendszer, ami helyetted ad el.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6 sm:mb-8"
            >
              Sablonok helyett egyedi, kézzel épített weboldalak és webshopok. Kérj egy ingyenes látványtervet a saját márkádra, kötelezettségek nélkül.
            </motion.p>

            {/* Social Proof & Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1 flex items-center gap-1">
                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                Két kattintásos igénylés
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1 flex items-center gap-1">
                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                100% kockázatmentes
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1 flex items-center gap-1">
                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                Válasz 24 órán belül
              </Badge>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12"
            >
              <Button
                onClick={() => scrollToSection('demo')}
                size="lg"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Ingyenes demóterv
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                onClick={() => scrollToSection('portfolio')}
                size="lg"
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-medium border-2 hover:bg-secondary/50 transition-all duration-300"
              >
                Munkáim megtekintése
              </Button>
            </motion.div>
          </div>

          {/* Foundations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium text-center">Amit garantálok</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Unique Design */}
              <div className="bg-card/50 backdrop-blur-sm hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Egyedi Tervezés</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nem használok sablonokat. Minden pixel pontosan a te márkádhoz és céljaidhoz igazodik.
                </p>
              </div>

              {/* Card 2: Fast Performance */}
              <div className="bg-card/50 backdrop-blur-sm hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Villámgyors Működés</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Azonnali betöltés mobilon és gépen is, hogy a látogatók ne forduljanak vissza.
                </p>
              </div>

              {/* Card 3: Stable Background */}
              <div className="bg-card/50 backdrop-blur-sm hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group">
                <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Stabil Háttér</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Biztonságos és bővíthető rendszer, ami éjjel-nappal megbízhatóan kiszolgálja a vevőidet.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Szolgáltatások</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Miben tudok segíteni?</h2>
            <p className="text-muted-foreground">Komplex megoldások, hogy neked csak a vállalkozásoddal kelljen foglalkoznod.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full group hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-500 border-white/5 bg-card hover:bg-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Layout className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-accent transition-colors">Bemutatkozó oldalak, amik eladnak</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">Egyedi tervezésű landing page-ek és céges weboldalak, amik a látogatókból érdeklődőket csinálnak.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4 bg-white/10" />
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      SEO optimalizált szerkezet
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Villámgyors betöltés
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Mobilbarát kialakítás
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full group hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-500 border-white/5 bg-card hover:bg-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-accent transition-colors">Webshopok, amik termelik a pénzt</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">Stabil, biztonságos és könnyen kezelhető webshopok, egyedi funkciókkal és admin felülettel.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4 bg-white/10" />
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Termékfeltöltés és kezelés
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Fizetési és szállítási integrációk
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Kuponok, akciók, kapcsolódó termékek
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full group hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-500 border-white/5 bg-card hover:bg-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Settings className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-accent transition-colors">Karbantartás és SEO</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">Hogy az oldalad mindig naprakész, gyors és megtalálható legyen a Google-ben.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4 bg-white/10" />
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Technikai frissítések és backup
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Uptime figyelés és biztonság
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Alap SEO beállítások és optimalizálás
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full group hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-500 border-white/5 bg-card hover:bg-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                    <Wand2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-accent transition-colors">Egyedi fejlesztések</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">Ha van egy egyedi ötleted, amit meg szeretnél valósítani, én segítek benne.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4 bg-white/10" />
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Integrációk külső rendszerekkel
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Egyedi funkciók fejlesztése
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Konzultáció és tanácsadás
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Portfólió</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Munkáimból</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Bár ezek demó projektek, pontosan ugyanezzel a gondossággal készítem el a te oldaladat is.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/lilki_hero.png",
                category: "Webshop",
                title: "Lilki",
                desc: "Modern, letisztult webshop koncepció.",
                fullDesc: "Modern, letisztult webshop koncepció, amely a termékek bemutatására és a vásárlói élmény optimalizálására fókuszál.",
                tags: ["Design", "E-commerce", "Branding"],
                fullTitle: "Lilki – webshop koncepció",
                demoText: "Demó projekt – általam készített, nem megrendelt koncepció",
                isItalic: true
              },
              {
                image: "/ymolit_hero.png",
                category: "Kézműves webshop",
                title: "Ymolit",
                desc: "Kézműves termékek webshopja természetes anyagokkal.",
                fullDesc: "Kézműves termékek webshopja, amely a természetes anyagok és az egyedi készítés szépségét emeli ki.",
                tags: ["E-commerce", "Design", "Branding"],
                fullTitle: "Ymolit – kézműves webshop koncepció",
                demoText: "Demó projekt – általam készített, nem megrendelt koncepció",
                isItalic: false
              },
              {
                image: "/babacsillag_hero.png",
                category: "Márkaoldal + shop",
                title: "Babacsillag",
                desc: "Természetes hatású dizájn, mobilra optimalizálva.",
                fullDesc: "Természetes hatású dizájn, ami tükrözi a márka értékeit. Mobilra optimalizált, egyszerű vásárlási folyamattal.",
                tags: ["UI/UX", "Next.js", "SEO"],
                fullTitle: "Babacsillag – márkaoldal + shop koncepció",
                demoText: "Demó projekt – általam készített, nem megrendelt koncepció",
                isItalic: true
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer" onClick={() => setSelectedImage(project.image)}>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center text-center p-6 duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                    <p className="text-primary font-medium mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.category}</p>
                    <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 mb-2 line-clamp-3">{project.fullDesc}</p>
                    <p className={`text-white/60 text-xs translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-125 mb-4 ${project.isItalic ? 'italic' : ''}`}>{project.demoText || "Demó projekt – általam készített, nem megrendelt koncepció"}</p>
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                      <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors">
                        Megnézem
                      </span>
                    </div>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                {/* Mobile-only details shown below image for better readability on small screens if needed, 
                    but sticking to the requested design which was overlay-based. 
                    Adding a small caption below for mobile could be good, but user asked for "olyan mint amilyenre csinaltad" (like you made it).
                    The previous design had NO text below. I will stick to that. 
                */}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Tetszik ez a stílus?</h3>
            <p className="text-muted-foreground mb-6">Kérj hasonlót a saját márkádra!</p>
            <Button
              onClick={() => scrollToSection('demo')}
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Ingyenes demóterv kérése
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Visszajelzések</h2>
            <p className="text-muted-foreground mt-2">Akikkel már együtt dolgoztam</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                text: "Végre nem kell egész nap az Instán válaszolgatnom az árakkal kapcsolatban! A webshopom automatikusan kezeli a rendeléseket, én pedig tudok az ékszerekre koncentrálni.",
                author: "Kitti",
                role: "kézműves ékszerkészítő"
              },
              {
                text: "Feri nem csak megcsinálta, amit kértem, hanem jobb ötleteket is hozott. Az oldal sokkal profibb lett, mint amit elképzeltem, és a vevőim is imádják.",
                author: "Péter",
                role: "asztalos manufaktúra"
              },
              {
                text: "Féltem a technikai részektől, de Feri mindent elintézett. Türelmesen elmagyarázta, hogyan tudom később én is szerkeszteni az oldalt. Csak ajánlani tudom!",
                author: "Eszter",
                role: "jógaoktató"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-background border-none shadow-sm h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.author}</p>
                      <p className="text-xs text-primary">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Egyszerű, átlátható árazás</h2>
            <p className="text-muted-foreground mt-2">Nincsenek rejtett költségek. Azt kapod, amit megbeszélünk.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "One-Page",
                price: "180.000 Ft-tól",
                desc: "Tökéletes bemutatkozó oldal induló vállalkozásoknak.",
                features: ["Egyoldalas felépítés", "Bemutatkozás, Szolgáltatások", "Kapcsolati űrlap", "Mobilbarát design", "Alap SEO beállítás", "Admin felület szövegszerkesztéshez", "1 hónap támogatás"]
              },
              {
                name: "Mini Webshop",
                price: "320.000 Ft-tól",
                desc: "Kisebb termékkínálattal rendelkező márkáknak.",
                popular: true,
                features: ["Főoldal + Termékoldalak", "Kosár és Pénztár folyamat", "Bankkártyás fizetés (Stripe/Barion)", "Számlázó összekötés (Számlázz.hu)", "Admin felület termékfeltöltéshez", "3 hónap támogatás"]
              },
              {
                name: "Pro Webshop",
                price: "520.000 Ft-tól",
                desc: "Komplex igényekre, nagy forgalmú boltoknak.",
                features: ["Korlátlan termékkategória", "Egyedi szűrőrendszer", "Hírlevél integráció", "Blog funkció", "Haladó SEO és Analytics", "6 hónap támogatás"]
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg shadow-primary/10 scale-105 z-10' : 'border-border'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      Legnépszerűbb
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-3xl font-bold mb-6">{plan.price}</div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => scrollToSection('demo')} className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Ehhez kérek demótervet
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              100% Elégedettségi Garancia: Ha nem tetszik a demó, nem fizetsz semmit.
            </p>
          </div>

          {/* Maintenance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Havi karbantartás és support</h3>
              <p className="text-muted-foreground text-center mb-8">
                Szeretnél úgy aludni, hogy tudod: az oldalad biztonságban van, frissül, és ha elromlik valami, nem neked kell fórumokat bújni?
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-background border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl">Nyugodt háttér</CardTitle>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-bold text-foreground">15.000</span>
                      <span className="text-muted-foreground">Ft / hó-tól</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Technikai frissítések, backup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Uptime figyelés, alap biztonság</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Havi 30 perc apró módosítás (szöveg, kép csere)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-background border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl">Növekedés</CardTitle>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-bold text-foreground">30.000</span>
                      <span className="text-muted-foreground">Ft / hó-tól</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Minden az alap csomagból</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Havi 1 kisebb fejlesztés / új szekció</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Havi SEO / analitika check, rövid javaslatokkal</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk-Free Demo Section */}
      <section id="demo" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Kockázatmentes Demó</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Csak akkor fizetsz, ha tényleg tetszik, amit kapsz</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Teljesen érthető, ha nehéz úgy dönteni egy weboldalról, hogy még nem látod, mit kapnál a végén.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">
                Éppen ezért demó-alapon dolgozom: először kapsz tőlem egy személyre szabott ízelítőt, és csak akkor vágunk bele a teljes projektbe, ha tényleg érzed, hogy ez neked szól.
              </p>
            </div>

            {/* 3 Steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Step 1 */}
              <Card className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 font-bold text-xl">
                    1
                  </div>
                  <CardTitle className="text-xl mb-3">Ingyenes Demóterv – kötelezettség nélkül</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Átnézem a jelenlegi online jelenléted (Insta, Facebook, meglévő weboldal, ha van), és készítek egy személyre szabott demótervet:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>a márkád színeivel és hangulatával</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>egy főoldal / kezdőszekció látványával</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>rövid magyarázattal, hogy mit miért így csinálnék</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    Ezt teljesen ingyen kapod meg, akkor is, ha végül nem dolgozunk együtt.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 font-bold text-xl">
                    2
                  </div>
                  <CardTitle className="text-xl mb-3">Ha tetszik az irány, megbeszéljük a teljes projektet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Ha azt érzed, hogy „na, pontosan ilyet akarok", kapsz tőlem egy átlátható ajánlatot:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>pontosan milyen oldalt vagy webshopot építünk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>mennyi idő alatt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>mennyiért</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    Nincs nyomás, nincs kötelező igen – csak akkor vágunk bele, ha számodra is kényelmes.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 font-bold text-xl">
                    3
                  </div>
                  <CardTitle className="text-xl mb-3">Fizess csak azért, amit tényleg rendben érzel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A munkát átlátható mérföldkövekre bontom. Ha a végén nem azt kapod, amit az elején közösen megbeszéltünk, a végső részletet addig nem kérem el, amíg nem érzed úgy, hogy az oldalad a helyén van.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">Neked kockázatmentes – előbb látsz valamit, aztán döntesz.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">Nekem pedig lehetőség, hogy bizonyítsak, és hosszú távú ügyfélként számítsak rád.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Kérem az ingyenes Demótervet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-secondary text-secondary-foreground overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Miért jó velem dolgozni?</h2>
              <p className="text-gray-300 text-lg mb-8">
                Tudom, hogy vállalkozóként ezer dolgod van. A célom, hogy a weboldalad ne egy újabb feladat legyen, hanem egy eszköz, ami leveszi a terhet a válladról.
              </p>
              <Button onClick={() => scrollToSection('contact')} variant="secondary" size="lg" className="rounded-full">
                Kérem a demótervet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "1. Kevesebb üzenet, több szabadidő",
                  desc: "A vásárlók minden infót megtalálnak az oldalon, így nem kell naponta 50-szer leírnod ugyanazt Messengeren."
                },
                {
                  title: "2. Nem kell technikai gurunak lenned",
                  desc: "A domaintől a kész oldalig mindent intézek. Átadás után pedig egy olyan egyszerű magyar nyelvű felületet kapsz, ahol te is bármikor átírhatsz szövegeket vagy feltölthetsz új képeket – programozói tudás nélkül."
                },
                {
                  title: "3. Olyan oldalad lesz, amit büszkén mutatsz",
                  desc: "Ha te szereted az oldalad, az ügyfeleid is érezni fogják a profizmust."
                },
                {
                  title: "4. Weboldal, ami pénzt is termel",
                  desc: "Nem csak \"szép\", hanem logikus felépítésű, egyértelmű gombokkal, hogy a látogató vásárlóvá váljon."
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-white">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Munkafolyamat</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Hogyan dolgozom?</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10" />

            {[
              { step: "01", title: "Kockázatmentes demó", desc: "Készítek egy látványtervet a márkádra szabva. Ha tetszik, folytatjuk. Ha nem, nem került semmibe – nincs vesztenivalód." },
              { step: "02", title: "Tervezés és egyeztetés", desc: "Átbeszéljük a célokat, elkészítem a struktúrát és a szöveges vázlatot." },
              { step: "03", title: "Fejlesztés", desc: "Lekódolom az oldalt, beállítom a dizájnt, színeket, funkciókat. Minden a te márkádra szabva készül." },
              { step: "04", title: "Átadás", desc: "Megmutatom, hogyan használd, és elindítjuk az új weboldaladat vagy webshopodat." }
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background pt-4 md:pt-0"
              >
                <div className="h-16 w-16 rounded-2xl bg-white border-2 border-white text-black font-bold text-xl flex items-center justify-center shadow-sm mb-6 mx-auto md:mx-0 relative z-10">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center md:text-left">{phase.title}</h3>
                <p className="text-muted-foreground text-center md:text-left">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="mb-2">
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">Rólam</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ki vagyok és mivel foglalkozom?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-base">
                  Balogh Ferenc vagyok. Egyedi weboldalakat és webshopokat készítek, sablonok nélkül, mindent kódolva. Backend és frontend fejlesztőként dolgozom, de a fókusz nem a technikai részleteken van – hanem azon, hogy a te vállalkozásod hogyan növekedjen.
                </p>
                <p className="text-base">
                  Egyedi megoldásokat készítek, ami azt jelenti: gyorsabb, biztonságosabb és rugalmasabb rendszert kapsz, mint amit egy kész sablon adna. Nem kell kompromisszumot kötnöd olyan funkciók miatt, amik nincsenek benne.
                </p>
                <p className="text-base">
                  Nincsenek előre felállított korlátok: ha van egy ötleted, meg tudjuk valósítani. Gyorsan dolgozom, átlátható folyamatokkal, és a közös munka előtt mindig kapsz egy személyre szabott demótervet, hogy pontosan lásd, mire számíthatsz.
                </p>
                <p className="text-base">
                  A célom mindig ugyanaz: olyan oldalad legyen, ami érthető, gyorsan betölt, és ami a legfontosabb: pénzt termel helyetted, nem csak "jól néz ki".
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white border-none shadow-xl shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2 text-black">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    Miért én?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Teljes technikai háttér – stabil és gyors megoldások",
                      "Nincs sablon – egyedi design, ami kitűnik a tömegből",
                      "100%-ban a te márkádra szabva",
                      "Bármilyen egyedi funkció megvalósítható"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                        <Check className="h-4 w-4 text-black mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section (NEW) */}
      <section id="faq" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gyakori kérdések</h2>
            <p className="text-muted-foreground">Minden, amit tudnod kell az együttműködésről.</p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Miért jobb ez, mint a WordPress vagy Wix?",
                a: "A WordPress oldalak gyakran lassúak, és folyamatosan frissíteni kell őket, hogy ne törjék fel. A Wix pedig havidíjas, és sosem lesz igazán a tiéd. Az általam írt kód örökre a tiéd marad, nincsenek kötelező havidíjak, villámgyorsan tölt be (amit a Google imád), és feltörhetetlenül biztonságos, mert nincsenek benne felesleges bővítmények."
              },
              {
                q: "Mennyibe kerül egy weboldal?",
                a: "Árazás, ami kiszámítható – nem meglepetés. One-Page bemutatkozó oldal 180.000 Ft-tól, Mini webshop 320.000 Ft-tól, Pro webshop 520.000 Ft-tól. Minden projekt egyedi, de ezek az iránymutató árak, amikből látod, hogy milyen nagyságrendben gondolkodom."
              },
              {
                q: "Mennyi idő alatt készül el?",
                a: "Gyorsan dolgozom. A tartalom rendelkezésre állásától számítva egy egyszerűbb oldal 2-3 nap, egy komplexebb webshop 4-6 nap alatt készül el."
              },
              {
                q: "Van havidíj?",
                a: "A karbantartásnak van havi díja, ha szeretnéd: 15.000-50.000 Ft/hó között, attól függ, hogy milyen szintű támogatást szeretnél. Az alap csomag (15.000 Ft/hó) tartalmazza a technikai frissítéseket, backup-ot, uptime figyelést és havi 30 perc apró módosítást."
              },
              {
                q: "Használsz templateket?",
                a: "Soha nem használok templateket. Mindent kódolok, minden egyedi. Backend és Frontend fejlesztés, tökéletesen rá szabom a te márkádra, színeidre, stílusodra. Nincs előre akadály – bármit meg tudok csinálni."
              },
              {
                q: "Hogyan dolgozol?",
                a: "Kétféle módon: vagy megkereslek embereket, akiknek nincs oldaluk, és rájuk szabva készítek egy demo oldalt, amit megmutatok nekik – ha tetszik, övék. Vagy te keresel meg, és közvetlenül készítem el az oldalt."
              },
              {
                q: "Mi történik, ha elkészíted a demót, de nekem mégsem tetszik?",
                a: "Semmi gond. Megköszönöm a lehetőséget, és barátsággal elválunk. Nem tartozol semmivel, és az elkészült tervet sem használom fel máshol."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`} className="bg-card border border-border/50 rounded-xl px-6 shadow-sm">
                  <AccordionTrigger className="text-lg font-medium hover:text-primary hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="contact" className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Beszéljünk az oldaladról!</h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Akár konkrét elképzelésed van, akár csak érdeklődsz, írj bátran! Dolgozhatunk úgy is, hogy én készítek egy demótervet a márkádra szabva, vagy úgy, hogy te hozod az ötletet, és közösen tervezzük meg az első pillanattól.
                  </p>
                  <p>
                    Mindkét esetben kötelezettség nélkül indulunk.
                  </p>
                  <p>
                    Ha megadod az online felületeid linkjeit (Instagram, Facebook, weboldal, Etsy, stb.), én átnézem őket, és ezek alapján készítek neked egy személyre szabott demótervet – nem kell semmit előkészítened, elég a link.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Email cím</p>
                      <p className="font-bold text-xl break-all sm:break-normal">hello@baloghferenc.hu</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Telefon</p>
                      <p className="font-bold text-xl">+36 30 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center w-full"
            >
              <Card className="border-none shadow-2xl w-full max-w-lg mx-auto">
                <CardHeader className="px-5 sm:px-8 pt-8">
                  <CardTitle className="text-2xl text-foreground">Írj üzenetet</CardTitle>
                  <CardDescription>Általában 24 órán belül válaszolok.</CardDescription>
                </CardHeader>
                <CardContent className="px-5 sm:px-8 pb-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Név</FormLabel>
                            <FormControl>
                              <Input placeholder="Kovács Anna" {...field} className="bg-muted/30" />
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
                            <FormLabel className="text-foreground">Email cím</FormLabel>
                            <FormControl>
                              <Input placeholder="anna@pelda.hu" {...field} className="bg-muted/30" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Miben gondolkodsz?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-muted/30">
                                  <SelectValue placeholder="Válassz egy opciót" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="new-website">Új bemutatkozó oldal</SelectItem>
                                <SelectItem value="new-webshop">Új webshop</SelectItem>
                                <SelectItem value="redesign">Meglévő oldal átalakítása</SelectItem>
                                <SelectItem value="inquiry">Még nem tudom, csak érdeklődöm</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Üzenet</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Szia! Érdeklődnék a webshop készítéssel kapcsolatban..."
                                className="min-h-[120px] bg-muted/30"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Online Presence Section */}
                      <Collapsible open={socialMediaOpen} onOpenChange={setSocialMediaOpen} className="space-y-4">
                        <CollapsibleTrigger className="flex items-start sm:items-center justify-between w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors gap-2">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span>Online jelenlét (opcionális)</span>
                            <Badge variant="secondary" className="text-xs w-fit whitespace-normal text-left leading-tight">Segíts nekem egy személyre szabott demót készíteni</Badge>
                          </div>
                          <ChevronDown className={`h-4 w-4 shrink-0 mt-1 sm:mt-0 transition-transform duration-200 ${socialMediaOpen ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 pt-2">
                          <p className="text-xs text-muted-foreground mb-4">
                            Ha megadod a social media profiljaidat vagy weboldaladat, személyre szabottabb demót tudok készíteni a márkádra.
                          </p>
                          
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  Weboldal URL
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://pelda.hu" 
                                    {...field} 
                                    className="bg-muted/30" 
                                    type="url"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="facebook"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <Facebook className="h-4 w-4" />
                                    Facebook
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="facebook.com/username" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="instagram"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <Instagram className="h-4 w-4" />
                                    Instagram
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="instagram.com/username" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <Linkedin className="h-4 w-4" />
                                    LinkedIn
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="linkedin.com/in/username" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="twitter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <Twitter className="h-4 w-4" />
                                    Twitter/X
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="x.com/username" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="tiktok"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <span className="text-sm font-bold">TikTok</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="tiktok.com/@username" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="youtube"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <span className="text-sm font-bold">YouTube</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="youtube.com/@channel" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="pinterest"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground flex items-center gap-2">
                                    <span className="text-sm font-bold">Pinterest</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="pinterest.com/username" 
                                      {...field} 
                                      className="bg-muted/30" 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      
                      <Button type="submit" className="w-full text-lg py-6 rounded-xl">
                        Üzenet küldése
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section (NEW) */}
      <section className="py-20 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">Ingyenes letöltés</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">5 hiba, ami miatt pénzt veszítesz a webshopoddal</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Összeszedtem a leggyakoribb hibákat, amiket a legtöbb kezdő webshop elkövet. Töltsd le a listát, és ellenőrizd, hogy a te oldalad rendben van-e!
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Email címed…" className="bg-white/90 text-foreground border-0 h-12" />
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-bold">
                    Megnézem, mit rontok el
                  </Button>
                </form>
                <p className="text-xs mt-3 opacity-60">Kizárólag hasznos tartalmat küldök. Bármikor leiratkozhatsz.</p>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative w-64 h-80 bg-white rounded-lg shadow-2xl rotate-3 flex items-center justify-center text-primary font-bold text-2xl border-4 border-accent/50">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <Zap className="h-16 w-16 text-accent mb-4" />
                    CHECKLIST – Webshop Audit 2025
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-16 pb-8 text-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="font-heading font-bold text-xl text-foreground tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center text-background font-bold">B</div>
                Balogh Ferenc
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Egyedi weboldalak és webshopok vállalkozásoknak, akik többre vágynak egy sablonnál.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground text-lg mb-4">Navigáció</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Szolgáltatások</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Árazás</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">Munkáim</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">Rólam</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-primary transition-colors">GYIK</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground text-lg mb-4">Jogi</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Adatkezelési tájékoztató</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ÁSZF</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Impresszum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Süti kezelés</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground text-lg mb-4">Kapcsolat</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  hello@baloghferenc.hu
                </li>
                <li className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-primary" />
                  +36 30 123 4567
                </li>
                <li className="pt-4">
                  <Button onClick={() => scrollToSection('contact')} variant="outline" className="w-full rounded-full">
                    Üzenet küldése
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-border/50 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs">
            <p>&copy; 2025 Balogh Ferenc. Minden jog fenntartva.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 hover:text-foreground transition-colors">
              Vissza az oldal tetejére
              <ArrowRight className="h-3 w-3 -rotate-90" />
            </button>
          </div>
        </div>
      </footer>

      {/* Portfolio Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Portfolio Preview"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

