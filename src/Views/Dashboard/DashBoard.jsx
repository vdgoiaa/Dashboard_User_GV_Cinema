import { Container, Grid } from "@material-ui/core";
import { stringify } from "query-string";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import Pagination from "../../Components/Pagination/Pagination";
import Profile from "../../Components/Profile/Profile";
import Loading from "../../Components/LoadingScreen/Loading";
import useLoading from "../../Components/LoadingScreen/useLoading";
import { fetchUserList } from "../../api/accountList";

const DashBoard = () => {
  const [filter, setFilter] = useState({
    soTrang: 1,
  });

  const {loading}=useLoading();

  const paramsString = stringify(filter);

  const dispatch = useDispatch();

  const userList = useSelector((state) => {
    return state.user.userList.content;
  });


  useEffect(() => {
    dispatch(fetchUserList(paramsString));
  }, [dispatch, paramsString]);

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilter({
      ...filter,
      soTrang: newPage,
    });
  };

  return (
    <div style={{ backgroundColor: "#bcbcbc",height:"100%" }}>
      <Header />
      <h1 style={{ textAlign: "center" }}>Account User List</h1>
      {loading === true ? (
        <Loading/>
      ) : (
        <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
          <Grid container spacing={3} style={{ paddingBottom: 50 }}>
            {userList?.items.map((item) => {
              return (
                <Grid xs={12} sm={6} md={4} item>
                  <Profile key={item.taiKhoan} profile={item}></Profile>
                </Grid>
              );
            })}
          </Grid>
          <Pagination page={userList} onPageChange={handlePageChange} />
        </Container>
      )}
    </div>
  );
};
export default DashBoard;
