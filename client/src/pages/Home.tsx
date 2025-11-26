import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Code, Layout, Mail, MessageSquare, Monitor, Smartphone, Zap, Star, ExternalLink } from "lucide-react";
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

// Assets
import heroBg from "@assets/generated_images/minimalist_bright_home_office_workspace_with_laptop.png";
import projectJewelry from "@assets/generated_images/elegant_jewelry_website_mockup.png";
import projectCosmetics from "@assets/generated_images/natural_cosmetics_website_mockup.png";
import projectCourse from "@assets/generated_images/online_course_platform_mockup.png";

// Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter legyen." }),
  email: z.string().email({ message: "Érvényes email címet adj meg." }),
  message: z.string().min(10, { message: "Az üzenet legalább 10 karakter legyen." }),
});

export default function Home() {
  const { toast } = useToast();
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-heading font-bold text-xl text-primary tracking-tight">
            Szecskó Zoltán
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">Rólam</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Szolgáltatások</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">Munkák</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Kapcsolat</button>
          </div>
          <Button onClick={() => scrollToSection('contact')} variant="default" size="sm" className="rounded-full px-6">
            Konzultáció
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        </div>
        
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Weboldalakat és webshopokat készítek <span className="text-primary">kisvállalkozásoknak</span>, amik nem csak szépek, hanem pénzt is hoznak.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Segítek kézműveseknek, ékszerkészítőknek és szolgáltatóknak olyan online jelenlétet építeni, ami csökkenti a repetitív üzeneteket és növeli a bevételeket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('contact')} size="lg" className="rounded-full text-base px-8 py-6 shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1">
                Kérj ingyenes konzultációt
              </Button>
              <Button onClick={() => scrollToSection('services')} variant="outline" size="lg" className="rounded-full text-base px-8 py-6 hover:bg-secondary/50 border-primary/20 text-primary">
                Nézd meg, miben segítek
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
               <img src={heroBg} alt="Szecskó Zoltán Workspace" className="object-cover w-full h-full" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
               <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Weboldal készítés folyamatban</p>
                      <p className="text-xs text-muted-foreground">Modern, gyors és mobilbarát</p>
                    </div>
                  </div>
               </div>
             </div>
          </motion.div>
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
                  Szecskó Zoltán vagyok, és egyedi weboldalakat, illetve webshopokat tervezek és építek. Kifejezetten olyan kreatív vállalkozókkal, kézműves márkákkal és szolgáltatókkal szeretek együtt dolgozni, akiknek fontos az igényes megjelenés.
                </p>
                <p>
                  Nem hiszek a sablonmegoldásokban. A célom mindig az, hogy olyan oldalt kapj, ami átlátható, gyorsan betölt, és ami a legfontosabb: <strong>elad helyetted</strong>. Figyelek a felhasználói élményre és a keresőoptimalizálás (SEO) alapjaira is, hogy ne csak szép legyen az oldalad, hanem meg is találják.
                </p>
              </div>
            </div>
            
            <Card className="bg-white border-none shadow-xl shadow-primary/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
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
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
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
              <Card key={i} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 bg-white">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
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
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
         </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Miért jó velem dolgozni?</h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
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
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-primary-foreground/70 leading-relaxed">{benefit.desc}</p>
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
                image: projectJewelry,
                category: "Webshop",
                title: "Luna Ékszermanufaktúra",
                desc: "Elegáns, minimalista webshop egyedi ékszereknek. A fókusz a nagy, részletes termékfotókon és a bizalomépítésen volt."
              },
              {
                image: projectCosmetics,
                category: "Márkaoldal + Shop",
                title: "Pure Nature Kozmetikumok",
                desc: "Természetes hatású dizájn, ami tükrözi a márka értékeit. Mobilra optimalizált vásárlási folyamattal."
              },
              {
                image: projectCourse,
                category: "Oktatási Platform",
                title: "WebDesigner Akadémia",
                desc: "Átlátható kurzus felület és értékesítési oldal (Sales Page) online oktatóknak."
              }
            ].map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 shadow-md border border-border/50">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-10 w-10 rounded-full bg-white text-foreground flex items-center justify-center shadow-lg">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
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
                text: "Zoli nem csak megcsinálta, amit kértem, hanem jobb ötleteket is hozott. Az oldal sokkal profibb lett, mint amit elképzeltem, és a vevőim is imádják.",
                author: "Péter",
                role: "Asztalos manufaktúra"
              },
              {
                text: "Féltem a technikai részektől, de Zoli mindent elintézett. Türelmesen elmagyarázta, hogyan tudom később én is szerkeszteni az oldalt. Csak ajánlani tudom!",
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
                  <div className="h-16 w-16 rounded-2xl bg-white border-2 border-primary text-primary font-bold text-xl flex items-center justify-center shadow-sm mb-6 mx-auto md:mx-0 relative z-10">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center md:text-left">{phase.title}</h3>
                  <p className="text-muted-foreground text-center md:text-left">{phase.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Beszéljünk az oldaladról!</h2>
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
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
                    <p className="font-bold text-xl">hello@szecskozoltan.hu</p>
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
          <p className="mb-4 font-bold text-foreground text-lg font-heading">Szecskó Zoltán</p>
          <p>&copy; {new Date().getFullYear()} Minden jog fenntartva.</p>
        </div>
      </footer>
    </div>
  );
}
