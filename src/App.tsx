import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Follows from "./pages/Follows";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import DetailThread from "./pages/DetailThreads";
import DetailImage from "./components/DetailImage";
import DetailProfile from "./components/DetailProfile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:threadId" element={<DetailThread />} />
            <Route path="/detail-image/:threadId" element={<DetailImage />} />
            <Route path="/profile/:userId" element={<DetailProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
