import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

// Contact form schema matching the frontend
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  tiktok: z.string().optional().or(z.literal("")),
  youtube: z.string().optional().or(z.literal("")),
  pinterest: z.string().optional().or(z.literal("")),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = contactFormSchema.parse(req.body);

      // Build social media object (only include non-empty values)
      const socialMedia: Record<string, string> = {};
      if (validatedData.facebook) socialMedia.facebook = validatedData.facebook;
      if (validatedData.instagram) socialMedia.instagram = validatedData.instagram;
      if (validatedData.linkedin) socialMedia.linkedin = validatedData.linkedin;
      if (validatedData.twitter) socialMedia.twitter = validatedData.twitter;
      if (validatedData.tiktok) socialMedia.tiktok = validatedData.tiktok;
      if (validatedData.youtube) socialMedia.youtube = validatedData.youtube;
      if (validatedData.pinterest) socialMedia.pinterest = validatedData.pinterest;

      // Prepare contact data for storage
      const contactData = {
        name: validatedData.name,
        email: validatedData.email,
        projectType: validatedData.projectType,
        message: validatedData.message || "",
        website: validatedData.website || undefined,
        socialMedia: Object.keys(socialMedia).length > 0 ? JSON.stringify(socialMedia) : undefined,
      };

      // Validate with insertContactSchema
      const insertData = insertContactSchema.parse(contactData);

      // Save to storage
      const contact = await storage.createContact(insertData);

      // TODO: Send email notification here (when email is configured)
      // For now, just log it
      console.log("New contact submission:", {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        projectType: contact.projectType,
        hasSocialMedia: !!contact.socialMedia,
      });

      return res.status(201).json({
        success: true,
        message: "Contact submitted successfully",
        contact: {
          id: contact.id,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("Error processing contact submission:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  return httpServer;
}
