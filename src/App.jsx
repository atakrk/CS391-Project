import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  JobList,
  UserProfile,
  AppliedJobs,
  Register,
} from "./containers";
import { CustomNavbar } from "./components/CustomNavbar";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" index element={<JobList />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
