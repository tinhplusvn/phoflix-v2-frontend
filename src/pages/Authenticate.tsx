import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { verifyToken } from "../redux/asyncThunk/userThunk";
import toast from "react-hot-toast";
import { addActivityLog } from "../redux/asyncThunk/activityLogThunk";

const Authenticate = () => {
  const dispatch: AppDispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

    if (+res.payload.EC === 0) {
      toast.success(res.payload.EM);
      await dispatch(
        addActivityLog({
          userId: res.payload?.DT?.id ?? "",
          action: "Đăng nhập hệ thống!",
        })
      );
      navigate("/");
    } else {
      toast.error("Đăng nhập thất bại!");
    }

    console.log(res);
  };

  return <></>;
};

export default Authenticate;
