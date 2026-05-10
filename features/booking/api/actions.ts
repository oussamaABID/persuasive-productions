"use server";

import { BookingRequest, BookingResponse } from '../types';
import { sendEmail } from '@/lib/mail';

/**
 * Server Action to handle booking submissions.
 * Orchestrates validation and delegates email dispatch to the centralized mail service.
 * 
 * @param {FormData} formData - The raw form data from the client.
 * @returns {Promise<BookingResponse>} The result of the booking process.
 */
export async function sendBookingEmail(formData: FormData): Promise<BookingResponse> {
  // Simulate a small delay for premium feel
  await new Promise(resolve => setTimeout(resolve, 1500));

  const data: BookingRequest = {
    package: formData.get('package') as string || 'General Inquiry',
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    vision: formData.get('vision') as string,
    turnstileToken: formData.get('cf-turnstile-response') as string,
  };

  // Server-side validation
  if (!data.name || !data.email || !data.vision) {
    return { success: false, error: "Missing required fields." };
  }

  try {
    // Delegate implementation to the centralized library
    await sendEmail({
      to: 'studio@persuasive-productions.com',
      subject: `New Booking Inquiry: ${data.package}`,
      fromName: data.name,
      fromEmail: data.email,
      text: `
        VISION REQUEST
        --------------
        Client: ${data.name} (${data.email})
        Phone: ${data.phone || 'Not provided'}
        Package: ${data.package}

        CREATIVE VISION:
        ${data.vision}
      `.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error("Booking action failed:", error);
    return { success: false, error: "An error occurred while processing your request." };
  }
}
