import apiClient from "../apiClient";
import { createClientParam, getClientsParam } from "./clientRepository.param";

export const createClient = async ({
  email,
  name,
  pin,
  cin,
}: createClientParam) => {
  return await apiClient({
    method: "post",
    url: `/clients`,
    data: {
      email,
      name,
      pin,
      cin,
    },
  });
};

export const updateClient = async (
  id: number,
  { email, name, pin, cin }: createClientParam
) => {
  return await apiClient({
    method: "post",
    url: `/clients/${id}`,
    data: {
      email,
      name,
      pin,
      cin,
    },
  });
};

export const getClients = async (options: getClientsParam) => {
  const { pageNumber, perPage, id = null, email, cin, name } = options;
  const result = await apiClient({
    method: "get",
    url: `/clients`,
    params: {
      page: pageNumber,
      perPage: perPage,
      id: id,
      email: email,
      cin: cin,
      name: name,
    },
  });
  return result.data;
};

export const deleteClient = async (id: number) => {
  return await apiClient({
    method: "delete",
    url: `/clients/${id}`,
  });
};

export const getClient = async (id: number) => {
  return await apiClient({
    method: "get",
    url: `/clients/${id}`,
  });
};
