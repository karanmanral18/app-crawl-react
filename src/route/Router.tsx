import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import NotFound from '../pages/NotFound.tsx';
import { lazyLoadRoutes } from './LazyLoadRoutes.tsx';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path='/'
          element={lazyLoadRoutes('ListClients')}
        />
        <Route
          path='/create'
          element={lazyLoadRoutes('CreateClient')}
        />
        <Route
          path='/client/:id'
          element={lazyLoadRoutes('EditClient')}
        />
      </Route>

      {/* 404 Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
