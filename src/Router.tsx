import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import ListClients from '@/pages/ListClients';
import CreateClient from '@/pages/CreateClient';
import EditClient from '@/pages/EditClient';
import NotFound from './pages/NotFound';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from '@/components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingFallback from '@/components/LoadingFallback';
import { Suspense } from 'react';

const Router = () => {

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<ListClients />
            }
          />
          <Route
            path='/create'
            element={<CreateClient />}
          />
          <Route
            path='/client/:slug'
            element={<EditClient />}
          />
        </Route>

        {/* 404 Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
