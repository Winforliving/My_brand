import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const simpleContactSchema = z.object({
  name: z.string().min(2, { message: "A név legalább 2 karakter legyen." }),
  email: z.string().email({ message: "Érvényes email címet adj meg." }),
  message: z.string().min(10, { message: "Az üzenet legalább 10 karakter legyen." }),
});

type SimpleContactValues = z.infer<typeof simpleContactSchema>;

export function SimpleContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SimpleContactValues>({
    resolver: zodResolver(simpleContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: SimpleContactValues) {
    setIsSubmitting(true);
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
        description: "Köszönöm! Hamarosan válaszolok a megadott email címen.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Hiba történt",
        description: error instanceof Error ? error.message : "Nem sikerült elküldeni az üzenetet.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-none shadow-2xl w-full max-w-lg mx-auto bg-card/50 backdrop-blur-sm">
      <CardHeader className="px-6 pt-8 pb-4">
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          Gyors üzenetküldés
        </CardTitle>
        <CardDescription>
          Ha csak egy gyors kérdésed van, írj itt közvetlenül.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-8">
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
                    <Input placeholder="ahova.a.valaszt.kered@gmail.com" {...field} />
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
                  <FormLabel>Üzeneted</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Miben segíthetek?" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Küldés...
                </>
              ) : (
                <>
                  Üzenet elküldése <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}





