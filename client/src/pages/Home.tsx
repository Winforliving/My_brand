import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Code, Layout, Mail, MessageSquare, Monitor, Smartphone, Zap, Star, ExternalLink, Search, Database, PenTool, GitBranch, Layers } from "lucide-react";
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
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('about')} className="hover:text-foreground transition-colors">Rólam</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-foreground transition-colors">Tapasztalat</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-foreground transition-colors">Munkáim</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-foreground transition-colors">Kapcsolat</button>
          </div>
          <Button onClick={() => scrollToSection('contact')} variant="default" size="sm" className="rounded-full px-6 font-medium">
            Beszéljünk
          </Button>
        </div>
      </nav>

      {/* Hero Section (Minimalist) */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl mb-24">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight text-foreground mb-8 tracking-tight">
              Ötletekből<br />
              <span className="text-muted-foreground">digitális élmény.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12">
              Szia! Balogh Ferenc vagyok, Designer és Webfejlesztő. Célom, hogy az elképzeléseidet hatásos digitális megoldásokká alakítsam.
            </p>

            {/* Ask me anything Input */}
            <div className="relative max-w-xl group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Kérdezz bármit..."
                className="w-full bg-secondary/50 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                readOnly
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-xs text-muted-foreground">
                  ↵
                </div>
              </div>
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
                  A vászon, ahol a kreativitás találkozik a hatékonysággal. Ahol minden pixel a helyére kerül.
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
                  Gyors, reszponzív és skálázható felületek építése modern eszközökkel.
                </p>
              </div>

              {/* Card 3: Backend */}
              <div className="bg-card hover:bg-card/80 border border-white/5 p-8 rounded-3xl transition-colors group">
                <div className="h-12 w-12 bg-[#777BB4]/20 rounded-xl flex items-center justify-center mb-6 text-[#777BB4]">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NodeJS & SQL</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Stabil háttérrendszerek, amelyek biztonságosan működtetik az alkalmazásodat.
                </p>
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
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Balogh Ferenc vagyok, és egyedi weboldalakat, illetve webshopokat tervezek és építek. Kifejezetten olyan kreatív vállalkozókkal, kézműves márkákkal és szolgáltatókkal szeretek együtt dolgozni, akiknek fontos az igényes megjelenés.
                </p>
                <p>
                  Nem hiszek a sablonmegoldásokban. A célom mindig az, hogy olyan oldalt kapj, ami átlátható, gyorsan betölt, és ami a legfontosabb: <strong>elad helyetted</strong>. Figyelek a felhasználói élményre és a keresőoptimalizálás (SEO) alapjaira is, hogy ne csak szép legyen az oldalad, hanem meg is találják.
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
                    "Egyéni vállalkozó, rugalmas együttműködés",
                    "Nem csak dizájn – technikailag is összerakom",
                    "Segítek szövegben és struktúrában is",
                    "Közvetlen kommunikáció, nincs 'ügynökségi' sallang"
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
                title: "Webshop készítés",
                desc: "Kézműves márkáknak, hogy a vevők mindent megtaláljanak egy helyen.",
                features: ["Termékoldalak & Kosár", "Automata visszaigazolások", "Kevesebb DM üzenet"]
              },
              {
                icon: <Layout className="h-6 w-6" />,
                title: "Bemutatkozó oldalak",
                desc: "Egyoldalas vagy többoldalas site-ok, amik eladják a szolgáltatásod.",
                features: ["Strukturált tartalom", "Sales fókuszú felépítés", "Bio linknek is tökéletes"]
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "SEO alapok",
                desc: "Hogy a Google és a vásárlóid is könnyen megtaláljanak.",
                features: ["Technikai beállítások", "Kulcsszó alapú szövegek", "Meta adatok beállítása"]
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: "Karbantartás",
                desc: "Ha már van oldalad, de ráférne egy kis frissítés vagy gyorsítás.",
                features: ["Gyorsítás & Optimalizálás", "Új funkciók fejlesztése", "Hibajavítás"]
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
                Tudom, hogy vállalkozóként ezer dolgod van. A célom, hogy a weboldalad ne egy újabb teher legyen, hanem egy eszköz, ami leveszi a terhet a válladról.
              </p>
              <Button onClick={() => scrollToSection('contact')} variant="secondary" size="lg" className="rounded-full">
                Vágjunk bele
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Kevesebb üzenet, több szabadidő",
                  desc: "A vásárlók minden infót megtalálnak az oldalon, így nem kell naponta 50-szer leírnod ugyanazt Messengeren."
                },
                {
                  title: "Nem kell technikai gurunak lenned",
                  desc: "A domaintől a kész oldalig mindent intézek. Neked csak a tartalmat kell jóváhagynod."
                },
                {
                  title: "Olyan oldalad lesz, amit büszkén mutatsz",
                  desc: "Ha te szereted az oldalad, az ügyfeleid is érezni fogják a profizmust."
                },
                {
                  title: "Weboldal, ami pénzt is termel",
                  desc: "Nem csak 'szép', hanem logikus felépítésű, egyértelmű gombokkal, hogy a látogató vásárlóvá váljon."
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
                  <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1 font-bold">
                    {i + 1}
                  </div>
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
                image: "/stones_hero.png",
                category: "Webshop",
                title: "Stones Ékszer",
                desc: "Elegáns, minimalista webshop egyedi ékszereknek. A fókusz a nagy, részletes termékfotókon és a bizalomépítésen volt.",
                tags: ["Design", "Shopify", "Branding"]
              },
              {
                image: "/babacsillag_hero.png",
                category: "Márkaoldal + Shop",
                title: "Babacsillag",
                desc: "Természetes hatású dizájn, ami tükrözi a márka értékeit. Mobilra optimalizált vásárlási folyamattal.",
                tags: ["UI/UX", "Next.js", "SEO"]
              },
              {
                image: "/ymolit_hero.png",
                category: "Vállalati Weboldal",
                title: "Ymolit",
                desc: "Modern, letisztult vállalati bemutatkozó oldal, amely a szakértelmet és a megbízhatóságot sugározza.",
                tags: ["Corporate", "Design", "Development"]
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
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                  <div className="flex gap-2 flex-wrap pt-2">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs font-normal text-muted-foreground bg-secondary/50">
                        {tag}
                      </Badge>
                    ))}
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
                role: "Kézműves ékszerkészítő"
              },
              {
                text: "Feri nem csak megcsinálta, amit kértem, hanem jobb ötleteket is hozott. Az oldal sokkal profibb lett, mint amit elképzeltem, és a vevőim is imádják.",
                author: "Péter",
                role: "Asztalos manufaktúra"
              },
              {
                text: "Féltem a technikai részektől, de Feri mindent elintézett. Türelmesen elmagyarázta, hogyan tudom később én is szerkeszteni az oldalt. Csak ajánlani tudom!",
                author: "Eszter",
                role: "Yoga oktató"
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
              { step: "01", title: "Konzultáció", desc: "Egy rövid beszélgetés, ahol átbeszéljük a céljaidat és az igényeidet." },
              { step: "02", title: "Tervezés", desc: "Elkészítem a weboldal struktúráját és a szöveges vázlatot." },
              { step: "03", title: "Fejlesztés", desc: "Felépítem az oldalt, beállítom a dizájnt és tesztelem mobilon." },
              { step: "04", title: "Átadás", desc: "Megmutatom hogyan használd, és elindítjuk az új weboldaladat." }
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
                <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">Ingyenes Letöltés</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">5 Hiba, ami miatt pénzt veszítesz a webshopoddal</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Összeszedtem a leggyakoribb hibákat, amiket a legtöbb kezdő webshop elkövet. Töltsd le a listát, és ellenőrizd, hogy a te oldalad rendben van-e!
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Email címed..." className="bg-white/90 text-foreground border-0 h-12" />
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-bold">
                    Kérem a listát
                  </Button>
                </form>
                <p className="text-xs mt-3 opacity-60">Nem küldök spamet. Bármikor leiratkozhatsz.</p>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative w-64 h-80 bg-white rounded-lg shadow-2xl rotate-3 flex items-center justify-center text-primary font-bold text-2xl border-4 border-accent/50">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <Zap className="h-16 w-16 text-accent mb-4" />
                    CHECKLIST
                    <span className="text-sm font-normal text-muted-foreground mt-2">Webshop Audit 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (NEW) */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gyakori Kérdések</h2>
            <p className="text-muted-foreground">Minden, amit tudnod kell az együttműködésről.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Mennyibe kerül egy weboldal?",
                a: "Minden projekt egyedi, de általánosságban elmondható, hogy egy bemutatkozó oldal 150.000 Ft-tól, egy webshop 350.000 Ft-tól indul. Pontos árajánlatot a konzultáció után tudok adni."
              },
              {
                q: "Mennyi idő alatt készül el?",
                a: "A tartalom rendelkezésre állásától számítva egy egyszerűbb oldal 2-3 hét, egy komplexebb webshop 4-6 hét alatt készül el."
              },
              {
                q: "Kell havidíjat fizetnem?",
                a: "Nekem nem. A domain névnek (kb. 3000 Ft/év) és a tárhelynek (kb. 10-20.000 Ft/év) van díja, amit közvetlenül a szolgáltatónak fizetsz. Én segítek ezeket kiválasztani és beállítani."
              },
              {
                q: "Tudom majd én is szerkeszteni az oldalt?",
                a: "Igen! Olyan rendszert építek (általában WordPress vagy egyedi megoldás admin felülettel), amit te is könnyen tudsz kezelni. Az átadáskor betanítalak a használatára."
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
                  Akár konkrét elképzelésed van, akár csak érdeklődsz, írj bátran! Szívesen készítek egy demó ötletet a saját márkádra szabva, kötelezettség nélkül.
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
          <p>&copy; {new Date().getFullYear()} Minden jog fenntartva.</p>
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
