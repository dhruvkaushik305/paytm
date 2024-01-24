import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashBoard } from "./components/dashboard";
import { Signup } from "./components/signup";
import { Signin } from "./components/signin";
import { AppBar } from "./components/appbar";
import { Homepage } from "./components/homepage";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
