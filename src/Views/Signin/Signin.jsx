import { Button, Container, TextField, Typography } from "@material-ui/core";
import React from "react";
import Header from "../../Components/Header/Header";
import "./signin.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { handleSignin } from "../../api/auth";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("This is required"),
  matKhau: yup.mixed().required("This is required"),
});

const Signin = (props) => {

  // account quản trị để test
  // Account : abc4567
 // Password : A@123456

 const dispatch=useDispatch();

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
    isValid,
    setTouched,
    setValues,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    setTouched({
      taiKhoan:true,
      matKhau:true,
    })
    if(isValid){
      dispatch(handleSignin(values,props));
    }
  };

  const handleNotice=()=>{
    alert("You must signin with Ma Loai Nguoi Dung : Quan Tri");
  }

  const defaultAdmin=()=>{
    setValues({
      taiKhoan:"abc4567",
      matKhau:"A@123456",
    })
  }


  return (
    <div style={{height: "100vh" }}>
      <Header />
      <h1 style={{ textAlign: "center" }}>Signin</h1>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="taiKhoan"
              variant="outlined"
              label="Account Name"
              value={values.taiKhoan}
            ></TextField>
            {touched.taiKhoan && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.taiKhoan}
              </Typography>
            )}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="matKhau"
              variant="outlined"
              label="Password"
              value={values.matKhau}
            ></TextField>
            {touched.matKhau && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.matKhau}
              </Typography>
            )}
          </div>
          <div className="button">
            <Button
              style={{ marginRight: "15px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Signin
            </Button>
            <Button style={{ marginRight: "15px" }} onClick={handleNotice} variant="contained" color="secondary" type="button">
              Notice
            </Button>
            <Button onClick={defaultAdmin} variant="contained" color="secondary" type="button">
              Default Admin Account
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Signin;
