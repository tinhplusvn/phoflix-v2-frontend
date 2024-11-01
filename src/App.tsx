import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/joy";
import publicRoutes from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout";
import { createTheme } from "@mui/material";

function App() {
     
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
