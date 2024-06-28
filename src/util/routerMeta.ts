export interface IRouterMeta {
  name?: string;
  path: string;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const routerMeta: RouterMetaType = {
  ListClients: {
    name: 'Clients',
    path: '/',
  },
  CreateClient: {
    name: 'New Client',
    path: '/create',
  },
  EditClient: {
    name: 'Edit Client',
    path: '/client/:slug',
  },
  NotFoundPage: {
    path: '/*',
  },
};

export default routerMeta;
