import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { Button, Container, TextField, Typography } from "@material-ui/core";

const schema = yup.object().shape({
  hoTen: yup.string().required("This is required !"),
  taiKhoan: yup.string().required("This is required !"),
  matKhau: yup.mixed().required("This is required !"),
  email: yup.string().required("This is required !").email("Invalid Email"),
  soDt: yup
    .string()
    .required("This is required !")
    .matches(/^[0-9]+$/g),
  maLoaiNguoiDung: yup.string().required("This is required !"),
});
const EditUser = () => {
  const {
    handleChange,
    errors,
    values,
    handleBlur,
    isValid,
    touched,
    setTouched,
  } = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleUpdate=()=>{
      axios({
          method:"POST",
          url:"http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
          data:values,
          headers:{
              Authorization:"Bearer "+localStorage.getItem("managerToken"),
          }
      })
      .then((res)=>{
          console.log(res.data);
          alert("Update user success");
        //   window.location.reload();
      })
      .catch((err)=>{
          console.log(err);
          alert("Update user error , you need to enter the correct account name");
      })
  }

  const handleSubmit=(event)=>{
      event.preventDefault();
      setTouched({
        hoTen: true,
        taiKhoan: true,
        matKhau: true,
        email: true,
        soDt: true,
        maLoaiNguoiDung: true,
      })
      if(isValid){
          handleUpdate();
      }
  }

  return (
    <div>
      <Header />
      <Container style={{ paddingBottom: 50 }} maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="hoTen"
              variant="outlined"
              label="Full Name :"
            ></TextField>
            {touched.hoTen && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.hoTen}
              </Typography>
            )}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="taiKhoan"
              variant="outlined"
              label="Account Name"
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
              name="matKhau"
              type="password"
              variant="outlined"
              label="Password"
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
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              variant="outlined"
              label="Email"
            ></TextField>
            {touched.email && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.email}
              </Typography>
            )}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="soDt"
              variant="outlined"
              label="Phone number"
            ></TextField>
            {touched.soDt && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.soDt}
              </Typography>
            )}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              name="maNhom"
              variant="outlined"
              defaultValue="GP01"
              label="Group Code"
              InputProps={{ readOnly: true }}
              helperText="Default Group Code"
            ></TextField>
            {/* {touched.soDt && <Typography style={{color:"red",paddingTop:"10px"}} variant="subtitle2" component="p">{errors.soDt}</Typography>} */}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="maLoaiNguoiDung"
              variant="outlined"
              label="User Type"
              helperText="Must be KhachHang or QuanTri"
            ></TextField>
            {touched.maLoaiNguoiDung && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.maLoaiNguoiDung}
              </Typography>
            )}
          </div>
          <div className="button">
            <Button variant="contained" color="primary" type="submit">
              Update User
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default EditUser;
