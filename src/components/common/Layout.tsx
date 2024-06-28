import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
