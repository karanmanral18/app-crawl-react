import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'List Clients';
      case '/create':
        return 'Create Client';
      // @ts-ignore
      case /^\/client\/\w+$/:
        return 'Edit Client';
      default:
        return 'Not Found';
    }
  };

  return (
    <header className="container-fluid py-3 py-lg-4 d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-between w-100">
        <h1 className="m-0 fw-semibold">{getPageTitle()}</h1>
      </div>
    </header>
  );
};

export default Header;
