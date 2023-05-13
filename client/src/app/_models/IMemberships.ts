export interface ICustomerPortal {
  url: string;
}


export interface ISession {
  sessionId: string;
}


export interface IMemberShipPlan {
  id: string;
  priceId: string;
  name: string;
  price: string;
  features: string[];
}
