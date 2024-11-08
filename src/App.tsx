import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import publicRoutes from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUser } from "./redux/asyncThunk/userThunk";
import toast from "react-hot-toast";

function App() {
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleInit = async () => {
      const res: any = await dispatch(getUser());
      if (+res.payload?.EC !== 0) {
        toast.error(res.payload?.EM);
      } else {
        toast.success(res.payload?.EM);
      }
    };

    if (!user?.access_token || !user?.refresh_token) {
      handleInit();
    }
  }, []);

  useEffect(() => {
    document.title = "Thế Giới Phim - Xem Phim Hay, Phim Mới Mỗi Ngày!";
  }, [window.location.pathname]);

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
