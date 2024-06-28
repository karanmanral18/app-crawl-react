import LoadingFallback from '@/components/LoadingFallback';
import { lazy, Suspense } from 'react';

export function lazyLoadRoutes(componentName: string) {
    const LazyElement = lazy(() => import(`../pages/${componentName}.tsx`));

    return (
        <Suspense fallback={<LoadingFallback />}>
            <LazyElement />
        </Suspense>
    );
}
