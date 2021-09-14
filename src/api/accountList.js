import axios from "axios";
import createAction from "../Store/Actions/action";
import actionType from "../Store/Actions/type";

export const fetchUserList = (paramsString) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&${paramsString}&soPhanTuTrenTrang=12`,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionType.GET_USER_LIST, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchUserListSearch = (paramsSearch,paramsPage) => {
  return dispatch=>{
    axios({
      method: "GET",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&${paramsSearch}&${paramsPage}&soPhanTuTrenTrang=12`,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionType.GET_USER_LIST, res.data));
      })
      .catch((err) => {
        console.log(err);
        alert("Can not found your information");
      });
  }
  
}

export const handleDeleteUserApi = (paramsDelete, managerToken,taiKhoanDelete) => {
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/XoaNguoiDung?${paramsDelete}`,
      headers: {
        Authorization: "Bearer " + managerToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        alert("Delete user success");
        dispatch(fetchUserList());
      })
      .catch((err) => {
        console.log(err);
        alert("Người dùng này đã đặt vé xem phim không thể xóa!");
          console.log(taiKhoanDelete);
      });
  };
};

export const fetchMe = (managerToken) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      headers: {
        Authorization: "Bearer " + managerToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionType.SET_ME, res.data));
      })

      .catch((err) => {
        console.log(err);
      });
  };
};
