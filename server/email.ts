import nodemailer from "nodemailer";

// Email configuration from environment variables
// For Gmail, you'll need to use an App Password (not your regular password)
const emailConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "kvantumdigital@gmail.com",
    pass: process.env.SMTP_PASSWORD || "", // App Password for Gmail
  },
};

// Create reusable transporter
const transporter = nodemailer.createTransport(emailConfig);

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message?: string;
  website?: string;
  socialMedia?: string;
}

export async function sendDemoRequestEmail(data: ContactFormData): Promise<void> {
  try {
    // Parse social media if it exists
    let socialMediaText = "";
    if (data.socialMedia) {
      try {
        const socialMedia = JSON.parse(data.socialMedia);
        const socialLinks: string[] = [];
        if (socialMedia.instagram) socialLinks.push(`Instagram: ${socialMedia.instagram}`);
        if (socialMedia.facebook) socialLinks.push(`Facebook: ${socialMedia.facebook}`);
        if (socialMedia.website) socialLinks.push(`Website: ${socialMedia.website}`);
        if (socialLinks.length > 0) {
          socialMediaText = `\n\nOnline Presence:\n${socialLinks.join("\n")}`;
        }
      } catch (e) {
        // If parsing fails, ignore
      }
    }

    // Map project types to readable text
    const projectTypeMap: Record<string, string> = {
      "new-webshop": "New Webshop",
      "new-website": "New Website / Service Page",
      "redesign": "Redesign / Maintenance",
      "inquiry": "General Inquiry",
    };

    const projectTypeText = projectTypeMap[data.projectType] || data.projectType;

    // Build email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          New Demo Request
        </h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Project Type:</strong> ${projectTypeText}</p>
          ${data.website ? `<p><strong>Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>` : ""}
        </div>

        ${data.message ? `
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; color: #666;">${data.message}</p>
          </div>
        ` : ""}

        ${socialMediaText ? `
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1976d2;">Online Presence:</h3>
            <pre style="white-space: pre-wrap; color: #666; margin: 0;">${socialMediaText.replace(/^\n\n/, "")}</pre>
          </div>
        ` : ""}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p>This email was sent from the BrandDesigner contact form.</p>
        </div>
      </div>
    `;

    const textContent = `
New Demo Request

Name: ${data.name}
Email: ${data.email}
Project Type: ${projectTypeText}
${data.website ? `Website: ${data.website}` : ""}

${data.message ? `Message:\n${data.message}\n` : ""}
${socialMediaText ? socialMediaText.replace(/^\n\n/, "") : ""}

---
This email was sent from the BrandDesigner contact form.
    `.trim();

    // Send email
    const mailOptions = {
      from: `"BrandDesigner Contact Form" <${emailConfig.auth.user}>`,
      to: "kvantumdigital@gmail.com",
      subject: `New Demo Request from ${data.name}`,
      text: textContent,
      html: htmlContent,
      replyTo: data.email, // So you can reply directly to the sender
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Demo request email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending demo request email:", error);
    // Don't throw - we don't want email failures to break the contact submission
    // The contact is already saved to the database
  }
}

// Verify transporter configuration (optional, for testing)
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("Email server is ready to send messages");
    return true;
  } catch (error) {
    console.error("Email server configuration error:", error);
    return false;
  }
}


