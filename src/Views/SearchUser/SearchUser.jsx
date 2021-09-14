import { Container, Grid, TextField, Typography } from "@material-ui/core";
import React, {  useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../../Components/Header/Header";
import Profile from "../../Components/Profile/Profile";
import { stringify } from "query-string";
import Pagination from "../../Components/Pagination/Pagination";
import useLoading from "../../Components/LoadingScreen/useLoading";
import Loading from "../../Components/LoadingScreen/Loading";
import { fetchUserListSearch } from "../../api/accountList";

const SearchUser = (props) => {
  const dispatch = useDispatch();

  const typingTimeout = useRef(null);

  const userListSearch = useSelector((state) => {
    return state.user.userList.content;
  });

  const [filter, setFilter] = useState({
    soTrang: 1,
  });
  const [searchForm, setSearchForm] = useState({
    tuKhoa: "",
  });

  const { loading } = useLoading();

  const paramsSearch = stringify(searchForm);

  const paramsPage = stringify(filter);

  useEffect(() => {
    dispatch(fetchUserListSearch(paramsSearch,paramsPage));
    console.log(searchForm);
  }, [dispatch, paramsPage, paramsSearch, searchForm]);

  const handleFormChange = (event) => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      setSearchForm({
        ...searchForm,
        [event.target.name]: event.target.value,
      });
    }, 500);
  };

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilter({
      ...filter,
      soTrang: newPage,
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#bcbcbc",
        height: "100%",
        paddingBottom: "50px",
      }}
    >
      <Header />
      <h1 style={{ textAlign: "center" }}>Search User</h1>
      {loading === true ? (
        <Loading />
      ) : (
        <Container maxWidth="xl">
          <form
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              onChange={handleFormChange}
              style={{ width: "400px" }}
              label="Key Word"
              variant="outlined"
              name="tuKhoa"
            />
          </form>
          {userListSearch ? (
            <div>
              <Grid container spacing={3} style={{ paddingBottom: 50 }}>
                {userListSearch?.items.map((item) => {
                  return (
                    <Grid xs={12} sm={6} md={4} item>
                      <Profile key={item.taiKhoan} profile={item} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          ) : (
            <Typography
              variant="h6"
              align="center"
              component="h4"
              style={{ paddingTop: "20px" }}
            >
              Please search keyword
            </Typography>
          )}
          <Pagination page={userListSearch} onPageChange={handlePageChange} />
        </Container>
      )}
    </div>
  );
};
export default SearchUser;
