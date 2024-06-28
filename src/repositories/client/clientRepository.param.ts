export interface createClientParam {
  name: string;
  email: string;
  cin: string;
  pin: string;
}

export interface getClientsParam {
  pageNumber: number;
  perPage: number;
  name: string | null;
  email: string | null;
  cin: string | null;
  id: number | null;
}
