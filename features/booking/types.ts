export interface BookingRequest {
  package: string;
  name: string;
  email: string;
  phone?: string;
  vision: string;
  turnstileToken: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  error?: string;
}
