import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import ListClients from '@/pages/ListClients';
import CreateClient from '@/pages/CreateClient';
import EditClient from '@/pages/EditClient';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route
            path='/'
            element={<ListClients/>}
          />
          <Route
            path='/create'
            element={<CreateClient/>}
          />
          <Route
            path='/client/:slug'
            element={<EditClient/>}
          />
      </Route>

      {/* 404 Page Not Found */}
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default Router;
