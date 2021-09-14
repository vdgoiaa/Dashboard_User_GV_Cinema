import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { stringify } from "query-string";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleDeleteUserApi } from "../../api/accountList";

const Profile = (props) => {
  const taiKhoanDelete={
    TaiKhoan:props.profile?.taiKhoan,
  }

  const dispatch=useDispatch();

  const paramsDelete=stringify(taiKhoanDelete);

  const handleDeleteUser=()=>{
    const managerToken = localStorage.getItem("managerToken");
    dispatch(handleDeleteUserApi(paramsDelete,managerToken,taiKhoanDelete));
  }

  return (
    <div>
      <Card style={{minHeight:"300px"}}>
          <CardContent>
          <Typography color="textPrimary" variant="h6" gutterBottom>
              Name : {props.profile?.hoTen.substr(0,15) + "..."}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Account : {props.profile?.taiKhoan}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Password : {props.profile?.matKhau}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Email : {props.profile?.email.substr(0,15) + "..."}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Ma Loai Nguoi Dung : {props.profile?.maLoaiNguoiDung}
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink component={Button} variant="contained" size="medium" color="primary" to="/edituser" exact>Edit</NavLink>
            <Button onClick={handleDeleteUser} size="medium" variant="contained" color="secondary">Delete</Button>
          </CardActions>
        </Card>
        
    </div>
  );
};
export default Profile;
