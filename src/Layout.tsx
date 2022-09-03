import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
function Layout() {
  let location = useLocation();
  const [executorWorks, setExecutorWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    id: 0,
    token: "",
  });
  let [, setSearchParams] = useSearchParams();

  function handleQueryParams(str: string) {
    if (!str.length) return;
    const queryInit = str.split("?")[1].split("&");
    const q = (n: number) => queryInit[n].split("=")[1];
    const id = Number(q(0));
    const token = q(1);
    return setQueryParams({
      id,
      token,
    });
  }
  if (queryParams.id === 0) {
    handleQueryParams(location.search);
  }
  useEffect(() => {
    async function fetchContacts() {
      setIsLoading(true);
      const response = await fetch(
        `https://dev.api.rm.pragma.info/projects/${queryParams.id}/works/msg/executor`,
        {
          headers: {
            Authorization: `Bearer ${queryParams.token}`,
          },
        },
      );
      const json = await response.json();

      if (response.ok) {
        setExecutorWorks(json);
      }
      setIsLoading(false);
    }

    if (location.search.length && queryParams.token.length) {
      console.log(queryParams.id, queryParams.token);
      fetchContacts();
    }
    setSearchParams({});
  }, [location.search.length, queryParams, setSearchParams]);

  if (isLoading) {
    return <div>Waiting...</div>;
  }

  return (
    <div>
      <h1>Bookkeeper!</h1>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet context={[executorWorks]} />
    </div>
  );
}

export default Layout;
