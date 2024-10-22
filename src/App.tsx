import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/joy";
import publicRoutes from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout";

function App() {
  return (
    <Box>
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
    </Box>
  );
}

export default App;
