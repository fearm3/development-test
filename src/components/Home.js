import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { addUserViews } from "../redux/actions";
import LastView from "./LastView";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const Home = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      cell: (row) => (
        <Button
          size="small"
          color="info"
          variant="contained"
          onClick={() => handleButtonClick(row)}
        >
          Details
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  const handleButtonClick = (row) => {
    dispatch(addUserViews(row));
    navigate(`detail/${row.id}`);
  };
  const fetchUsers = async (page) => {
    setLoading(true);

    const response = await axios.get(
      `https://gorest.co.in/public/v2/users?page=${page}`
    );

    setData(response.data);

    setLoading(false);
    // console.log(page);
    // console.log(response.data);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const filteredItems = data?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Spinner />
      <div></div>
    </div>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <DataTable
          title="Employee List"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          paginationServer
          paginationTotalRows={10000}
          onChangePage={handlePageChange}
          theme="dark"
          striped
          progressPending={pending}
          progressComponent={<CustomLoader />}
        />
      </Grid>
      <Grid item xs={3}>
        <LastView />
      </Grid>
    </Grid>
  );
};

export default Home;

//*styled-components
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: blue;
  &:hover {
    background-color: red;
    color: white;
    cursor: pointer;
  }
`;
const rotate360 = keyframes`
 from {    transform: rotate(0deg);  }
  to {
    transform: rotate(360deg);
  }`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid white;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
