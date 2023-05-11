export interface Payment {
  customerId: string;
  recipientEmail: string;
  description: string;
  currency: string;
  amount: number;
}
