import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Code, Layout, Mail, MessageSquare, Monitor, Smartphone, Zap, Star, ExternalLink, Database, PenTool, GitBranch, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

// Assets
// Assets
import heroBg from "@assets/generated_images/minimalist_bright_home_office_workspace_with_laptop.png";

// Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter legyen." }),
  email: z.string().email({ message: "Érvényes email címet adj meg." }),
  message: z.string().min(10, { message: "Az üzenet legalább 10 karakter legyen." }),
});

export default function Home() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    toast({
      title: "Üzenet elküldve!",
      description: "Hamarosan felveszem veled a kapcsolatot.",
    });
    form.reset();
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
            <button onClick={() => scrollToSection('pricing')} className="hover:text-foreground transition-colors">Árazás</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-foreground transition-colors">Munkáim</button>
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
                  <button onClick={() => scrollToSection('pricing')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Árazás
                  </button>
                  <button onClick={() => scrollToSection('portfolio')} className="text-left text-lg font-medium hover:text-primary transition-colors py-2">
                    Munkáim
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

      {/* Hero Section (Minimalist) */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden min-h-[70vh] flex flex-col justify-center">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-4 sm:mb-6 tracking-tight">
              Nem csak egy weboldal.<br />
              <span className="text-muted-foreground">Egy digitális rendszer, ami helyetted ad el.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-3 sm:mb-4">
              Full-stack fejlesztés sablonok nélkül. Gyors, biztonságos és 100%-ban a te vállalkozásodra szabott megoldások – felesleges korlátok nélkül.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8 sm:mb-12">
              Kérhetsz egy ingyenes demótervet: ha tetszik az irány, folytatjuk a munkát. Ha nem, nem került semmibe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
              <Button 
                onClick={() => scrollToSection('demo')} 
                size="lg" 
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-medium bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Kérem az ingyenes Demótervet
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection('portfolio')} 
                size="lg" 
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-medium border-2"
              >
                Munkáim megtekintése
              </Button>
            </div>
          </div>

          {/* Foundations Grid */}
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Eszközök, amikkel dolgozom</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Figma */}
              <div className="bg-card hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-colors group">
                <div className="h-12 w-12 bg-[#F24E1E]/20 rounded-xl flex items-center justify-center mb-6 text-[#F24E1E]">
                  <PenTool className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Figma</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A vászon, ahol a tervezés történik – itt áll össze a weboldalad felépítése és vizuális világa.
                </p>
              </div>

              {/* Card 2: React & Tailwind */}
              <div className="bg-card hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-colors group">
                <div className="flex gap-2 mb-6">
                  <div className="h-12 w-12 bg-[#61DAFB]/20 rounded-xl flex items-center justify-center text-[#61DAFB]">
                    <Code className="h-6 w-6" />
                  </div>
                  <div className="h-12 w-12 bg-[#38B2AC]/20 rounded-xl flex items-center justify-center text-[#38B2AC]">
                    <Layout className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">React & Tailwind</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Modern, gyors és reszponzív felületek, amik minden eszközön szépen működnek.
                </p>
              </div>

              {/* Card 3: Backend */}
              <div className="bg-card hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-colors group">
                <div className="h-12 w-12 bg-[#777BB4]/20 rounded-xl flex items-center justify-center mb-6 text-[#777BB4]">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NodeJS & SQL</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Stabil háttérrendszerek, amelyek biztonságosan és megbízhatóan kiszolgálják az oldalad és a webshopod.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Szolgáltatások</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Miben tudok segíteni?</h2>
            <p className="text-muted-foreground">Komplex megoldások, hogy neked csak a vállalkozásoddal kelljen foglalkoznod.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MessageSquare className="h-6 w-6" />,
                title: "Automata Értékesítési Rendszer (Webshop)",
                desc: "Kézműves márkáknak és kisvállalkozásoknak, akik eddig üzenetben intézték a rendeléseket.",
                features: ["Termékoldalak, kosár, rendelési folyamat", "Automata visszaigazolások", "Kevesebb DM – a vevők maguktól találnak meg mindent"]
              },
              {
                icon: <Layout className="h-6 w-6" />,
                title: "Márkaépítő Weboldal",
                desc: "Egy- vagy többoldalas weboldalak, amik eladják a szolgáltatásod.",
                features: ["Strukturált tartalom, érthető felépítés", "Sales-fókuszú logika, egyértelmű gombok", "Tökéletes link hirdetésekhez vagy bio-ba"]
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "SEO alapok",
                desc: "Hogy a Google és a vásárlóid is könnyen megtaláljanak.",
                features: ["Technikai beállítások", "Kulcsszó-alapú szövegstruktúra", "Meta adatok beállítása"]
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: "Karbantartás",
                desc: "Ha már van oldalad, de ráfér egy frissítés vagy gyorsítás.",
                features: ["Gyorsítás & optimalizálás", "Új funkciók fejlesztése", "Hibajavítás"]
              }
            ].map((service, i) => (
              <Card key={i} className="group hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-500 border-white/5 bg-card hover:bg-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-white/5 text-white flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-accent transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">{service.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4 bg-white/10" />
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-3 group-hover:text-white/70 transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Árazás</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Kiszámítható árak – nem meglepetés</h2>
            <p className="text-muted-foreground">
              Minden projekt egyedi, de nem szeretem a „majd meglátjuk, mennyi lesz” típusú ajánlatokat. 
              Ezért van néhány jól érthető csomagom, iránymutató árakkal, amikből látod, hogy milyen nagyságrendben gondolkodom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Package 1: One-Page */}
            <Card className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl mb-2">Kezdő lendület</CardTitle>
                <CardDescription className="text-base mb-4">One-Page bemutatkozó</CardDescription>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">180.000</span>
                  <span className="text-muted-foreground">Ft-tól</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Ha most építed az online jelenlétedet, és egy igényes, mobilbarát, egyoldalas weboldalra van szükséged, ami elmondja, ki vagy és mit csinálsz.
                </p>
                <Separator />
                <ul className="space-y-3">
                  {[
                    "Modern, reszponzív dizájn",
                    "Átlátható szerkezet (hero, bemutatkozás, szolgáltatások, vélemények, kapcsolat)",
                    "Alap SEO beállítások",
                    "Jogi oldalak (impresszum, adatkezelés)"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Package 2: Mini Webshop */}
            <Card className="bg-card border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-xl relative overflow-hidden scale-105">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">Népszerű</Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl mb-2">Első webshop</CardTitle>
                <CardDescription className="text-base mb-4">Mini webáruház</CardDescription>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">320.000</span>
                  <span className="text-muted-foreground">Ft-tól</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Ha eleged van abból, hogy minden rendelést üzenetben kell egyeztetned, és szeretnéd, hogy a vásárlók maguktól végigmenjenek a „mit, mennyiért, hogyan tudom megvenni?” folyamaton.
                </p>
                <Separator />
                <ul className="space-y-3">
                  {[
                    "1 főoldal + terméklista + termékoldalak + kosár + rendelés",
                    "20–30 termék feltöltése",
                    "Szállítási és fizetési módok beállítása",
                    "Alap SEO, jogi oldalak"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Package 3: Pro Webshop */}
            <Card className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl mb-2">Növekedésre kész</CardTitle>
                <CardDescription className="text-base mb-4">Pro webshop</CardDescription>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">520.000</span>
                  <span className="text-muted-foreground">Ft-tól</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Ha a webshop már nem csak „jó lenne”, hanem konkrétan bevételt és kampányokat szeretnél rá építeni.
                </p>
                <Separator />
                <ul className="space-y-3">
                  {[
                    "Akár 50–100 termék és kategória-struktúra",
                    "Kuponok, akciók, kapcsolódó termékek",
                    "Blog- és SEO-barát felépítés",
                    "Konverzió-fókuszú finomhangolás"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Maintenance Section */}
          <div className="mt-16 max-w-4xl mx-auto">
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
          </div>
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
                Kérem a Demo Tervemet
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
                  desc: "A domaintől a kész oldalig mindent intézek. Neked csak a tartalmat kell jóváhagynod."
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Portfólió</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Munkáimból</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "/lilki_hero.png",
                category: "Webshop",
                title: "Lilki",
                desc: "Modern, letisztult webshop koncepció, amely a termékek bemutatására és a vásárlói élmény optimalizálására fókuszál. A dizájn egyensúlyt teremt a funkcionalitás és az esztétika között.",
                tags: ["Design", "E-commerce", "Branding"],
                fullTitle: "Lilki – webshop koncepció",
                demoText: "Demó projekt – általam készített, nem megrendelt koncepció",
                isItalic: true
              },
              {
                image: "/ymolit_hero.png",
                category: "Kézműves webshop",
                title: "Ymolit",
                desc: "Kézműves termékek webshopja, amely a természetes anyagok és az egyedi készítés szépségét emeli ki. A fókusz a kézműves értékek bemutatásán és a vásárlói bizalom építésén volt.",
                tags: ["E-commerce", "Design", "Branding"],
                fullTitle: "Ymolit – kézműves webshop koncepció",
                demoText: "Demó projekt – általam készített, nem megrendelt koncepció",
                isItalic: false
              },
              {
                image: "/babacsillag_hero.png",
                category: "Márkaoldal + shop",
                title: "Babacsillag",
                desc: "Természetes hatású dizájn, ami tükrözi a márka értékeit. Mobilra optimalizált, egyszerű vásárlási folyamattal.",
                tags: ["UI/UX", "Next.js", "SEO"],
                fullTitle: "Babacsillag – márkaoldal + shop koncepció",
                demoText: "Demó projekt – általam készített, nem megrendelt koncepció",
                isItalic: true
              }
            ].map((project, i) => (
              <div key={i} className="group flex flex-col h-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 shadow-lg border border-border/50 group-hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => setSelectedImage(project.image)}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full font-bold text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                      Megnézem
                    </div>
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.fullTitle || project.title}</h3>
                  <p className={`text-xs text-muted-foreground/70 ${project.isItalic ? 'italic' : ''}`}>{project.demoText || "Demó projekt – általam készített, nem megrendelt koncepció"}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      – {project.tags.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Visszajelzések</h2>
            <p className="text-muted-foreground mt-2">Akikkel már együtt dolgoztam</p>
          </div>

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
              <Card key={i} className="bg-background border-none shadow-sm">
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
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Munkafolyamat</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Hogyan dolgozom?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10" />

            {[
              { step: "01", title: "Kockázatmentes demó", desc: "Készítek egy látványtervet a márkádra szabva. Ha tetszik, folytatjuk. Ha nem, nem került semmibe – nincs vesztenivalód." },
              { step: "02", title: "Tervezés és egyeztetés", desc: "Átbeszéljük a célokat, elkészítem a struktúrát és a szöveges vázlatot." },
              { step: "03", title: "Fejlesztés", desc: "Lekódolom az oldalt, beállítom a dizájnt, színeket, funkciókat. Minden a te márkádra szabva készül." },
              { step: "04", title: "Átadás", desc: "Megmutatom, hogyan használd, és elindítjuk az új weboldaladat vagy webshopodat." }
            ].map((phase, i) => (
              <div key={i} className="bg-background pt-4 md:pt-0">
                <div className="h-16 w-16 rounded-2xl bg-white border-2 border-white text-black font-bold text-xl flex items-center justify-center shadow-sm mb-6 mx-auto md:mx-0 relative z-10">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center md:text-left">{phase.title}</h3>
                <p className="text-muted-foreground text-center md:text-left">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet Section (NEW) */}
      <section className="py-20 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-5xl mx-auto">
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
                    Kérem a listát
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
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
            <div className="space-y-6">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Rólam</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ki vagyok és mivel foglalkozom?</h2>
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
            </div>

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
          </div>
        </div>
      </section>

      {/* FAQ Section (NEW) */}
      <section id="faq" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gyakori kérdések</h2>
            <p className="text-muted-foreground">Minden, amit tudnod kell az együttműködésről.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Miért jobb ez, mint a WordPress vagy Wix?",
                a: "Mert nincs felesleges kód, ami lassítaná az oldalt. Biztonságosabb, mert nem függsz pluginoktól. És pontosan azt kapod, amire szükséged van, kompromisszumok nélkül."
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
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border/50 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-lg font-medium hover:text-primary hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="contact" className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Beszéljünk az oldaladról!</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Akár demótervet kérsz, akár csak egy rövid, ingyenes konzultációt szeretnél az oldaladról, itt tudsz írni nekem. Dolgozhatunk úgy is, hogy én készítek egy demót a márkádra szabva, vagy úgy, hogy te keresel meg, és közösen tervezzük meg az első pillanattól. Mindkét esetben kötelezettség nélkül indulunk.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Email cím</p>
                    <p className="font-bold text-xl">hello@baloghferenc.hu</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Telefon</p>
                    <p className="font-bold text-xl">+36 30 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Írj üzenetet</CardTitle>
                <CardDescription>Általában 24 órán belül válaszolok.</CardDescription>
              </CardHeader>
              <CardContent>
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
                    <Button type="submit" className="w-full text-lg py-6 rounded-xl">
                      Üzenet küldése
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p className="mb-4 font-bold text-foreground text-lg font-heading">Balogh Ferenc</p>
          <p>&copy; 2025 Minden jog fenntartva.</p>
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

