import { creditCard } from "./creditCard";

export interface Customer {
  email: string;
  name: string;
  customerId: string;
  creditCard: creditCard[]
}
