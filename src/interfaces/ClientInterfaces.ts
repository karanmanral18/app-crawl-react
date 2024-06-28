export interface ICreateClientFormValues {
  name: string;
  email: string;
  cin: string;
  pin: string;
}

export interface IUpdateClientFormValues extends ICreateClientFormValues {}

export interface ClientInterface {
  id: number;
  name: string;
  email: string;
  cin: string;
  pin: string;
}
