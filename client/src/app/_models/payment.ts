export interface Payment {
  customerId: string;
  username: string;
  recipientEmail: string;
  description: string;
  currency: string;
  amount: number;
}
