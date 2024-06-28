import PaginationComponent from "@/components/Pagination";
import { ClientInterface } from "@/interfaces/ClientInterfaces";
import { deleteClient, getClients } from "@/repositories/client/clientRepository";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListClients: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [shouldFetchClients, setShouldFetchClients] = useState(false);


  const [pagination, setPagination] = useState({
    totalRows: 0,
    currentPage: 0,
    perPage: 10
  })

  const initialFilterValue = {
    name: null,
    email: null,
    id: null,
    cin: null,
  }
  const [filters, setFilters] = useState(initialFilterValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetFilters = async () => {
    setFilters(initialFilterValue);
    setShouldFetchClients(true);
  };

  async function handlePageChanged(pageNumber: number) {
    await fetchClients(pageNumber);
  }

  async function fetchClients(pageNumber: number = 1) {
    try {
      const clientData = await getClients({
        pageNumber: pageNumber,
        perPage: pagination.perPage,
        email: filters.email,
        name: filters.name,
        cin: filters.cin,
        id: filters.id
      });
      setClients(clientData.clients.items);
      setPagination((prevState) => ({
        ...prevState,
        currentPage: clientData.clients.page,
        totalRows: clientData.clients.totalItems
      }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Something went wrong! Please try again');
    }
  }

  async function handleClientEdit(id: number) {
    navigate(`/client/${id}`);
  }

  async function handleCreateClient() {
    navigate(`/create`);
  }

  async function handleClientDelete(id: number) {
    try {
      await deleteClient(id);
      setClients(prevClients => prevClients.filter((company: ClientInterface) => company.id !== id))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Something went wrong! Please try again');
    }
  }

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shouldFetchClients) {
      fetchClients().then(() => setShouldFetchClients(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchClients])

  const renderClientListing = () => {
    return (<tbody >
      {
        clients.length ? clients.map((client: ClientInterface) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.cin}</td>
            <td>{client.pin}</td>
            <td>
              <div className="d-flex">
                <svg onClick={() => handleClientEdit(client.id)} width="80" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                </svg>
                <svg onClick={() => handleClientDelete(client.id)} width="80" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </div>
            </td>
          </tr>
        )) : <tr>
          <td colSpan={8} className="text-center">
            No Data Found
          </td >
        </tr>
      }
    </tbody >)
  }


  return (
    <section className="mid-section d-flex flex-column">
      <div className="mid-info container-fluid py-4">
        <div className="d-flex justify-content-between">
          <h4 className="m-0 fw-semibold">Search Filters</h4>
          <button onClick={handleCreateClient} className="btn btn-primary">Create Client</button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded p-3 mt-3">
          <div className="row">
            <div className="mb-3 col-md-6 col-lg-2">
              <label className="mb-2 lh-sm small">Search by Client ID</label>
              <input type="number" name="id" min="0" className="form-control" placeholder="Search by Client ID" value={filters.id || ''} onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6 col-lg-2">
              <label className="mb-2 lh-sm small">Search by Name</label>
              <input type="text" name="name" className="form-control" placeholder="Search by Name" value={filters.name || ''} onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6 col-lg-2">
              <label className="mb-2 lh-sm small">Search by Email</label>
              <input type="text" name="email" className="form-control" placeholder="Search by Email" value={filters.email || ''} onChange={handleChange} />
            </div>
            <div className="mb-3 col-md-6 col-lg-2">
              <label className="mb-2 lh-sm small">Search by CIN</label>
              <input type="text" name="cin" className="form-control" placeholder="Search by CIN" value={filters.cin || ''} onChange={handleChange} />
            </div>
            <div className="col-md-6 col-lg-4 d-flex align-items-end mb-3">
              <button className="btn btn-success" onClick={() => fetchClients()}>Search</button>
              <button type="reset" className="btn btn-secondary ms-2" onClick={resetFilters}>Reset</button>
            </div>
          </div>
        </div >

        {/* Listing */}
        <div className="table-responsive rounded my-4">
          <table className="table m-0 size-sm" width="100%" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">CIN</th>
                <th className="text-left">PIN</th>
                <th className="text-left"></th>

              </tr>
            </thead>
            {renderClientListing()}
          </table >
        </div >

        {/* Pagination */}
        <PaginationComponent totalRows={pagination.totalRows} perPage={pagination.perPage} currentPage={pagination.currentPage} onPageChanged={handlePageChanged} />
      </div >
    </section >
  )
}

export default ListClients