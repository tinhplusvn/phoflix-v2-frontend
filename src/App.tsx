import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/joy";
import publicRoutes from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUser } from "./redux/asyncThunk/userThunk";

function App() {
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!user.access_token) {
        dispatch(getUser())
    }
  }, []);

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
