import { creditCard } from "./creditCard";

export interface Customer {
  email: string;
  name: string;
  customerId: string;
  username: string;
  creditCard: creditCard[]
}
