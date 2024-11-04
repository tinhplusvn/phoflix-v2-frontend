import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../custom/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { verifyToken } from "../redux/asyncThunk/userThunk";
import toast from "react-hot-toast";

const Authenticate = () => {
  const dispatch: AppDispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.users.user);

//   useEffect(() => {
//     if (user.access_token) {
//       navigate("/");
//     }
//   }, [user]);

  useEffect(() => {
    const token: string = searchParams.get("token") as string;
    const typeAccount: string = searchParams.get("type") as string;

    handleVerifyToken(token, typeAccount);
  }, []);

  const handleVerifyToken = async (token: string, typeAccount: string) => {
    const res = await dispatch(
      verifyToken({
        token,
        typeAccount,
      })
    );

    console.log(res)
    if (+res.payload.EC === 0) {
        toast.success(res.payload.EM);
        navigate('/')
    } else {
        toast.error("Đăng nhập thất bại!")

    }

    console.log(res)
  };

  return <></>;
};

export default Authenticate;
