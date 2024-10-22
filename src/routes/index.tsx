import Search from "../pages/Search";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Info from "../pages/Info";
import SavedMovies from "../pages/SavedMovies";
import ViewingHistory from "../pages/ViewingHistory";
import UserInfo from "../pages/UserInfo";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/dang-nhap", component: Login },
  { path: "/dang-ky", component: Register },
  { path: "/chi-tiet/:slug", component: Detail },
  { path: "/tim-kiem/:slug", component: Search },
  { path: "/thong-tin/:slug", component: Info },
  { path: "/phim-da-luu", component: SavedMovies },
  { path: "/lich-su-da-xem", component: ViewingHistory },
  { path: "/thong-tin-nguoi-dung/:username", component: UserInfo },
  // { path: "/notfound", conponent: NotFound }
];
export default publicRoutes;
