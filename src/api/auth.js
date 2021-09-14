import axios from "axios";
import createAction from "../Store/Actions/action";
import actionType from "../Store/Actions/type";

export const handleSignin = (values, props) => {
    return (dispatch) => {
      axios({
        method: "POST",
        url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
        data: values,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.content.maLoaiNguoiDung === "QuanTri") {
            alert("Signin success with admin");
            dispatch(createAction(actionType.SET_ME, res.data));
            localStorage.setItem("managerToken", res.data.content.accessToken);
            props.history.push("/");
          } else {
            alert(
              "Signin success but you want to be go to dashboard you must signin with Ma Loai Nguoi Dung : Quan Tri"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Signin error");
        });
    };
  };