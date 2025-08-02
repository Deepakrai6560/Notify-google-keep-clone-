import { Header } from "./components/header/Header";
import { SideBar } from "./components/sideBar/SideBar";
import AddNotes from "./components/addNotes/AddNotes";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Index";
import Signup from "../src/screens/Signup/index";
import Archive from "./screens/Archieve/Index";
import Reminder from "./screens/Reminder/Index";
import Bin from "./screens/Trash-bin/Index";
import Edit from "./screens/Edit-Lable/Index";

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-layout">
              <SideBar />
              <AddNotes />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/archive"
          element={
            <div className="main-layout">
              <SideBar />
              <Archive />
            </div>
          }
        />
        <Route
          path="/reminders"
          element={
            <div className="main-layout">
              <SideBar />
              <Reminder />
            </div>
          }
        />
        <Route
          path="/trash"
          element={
            <div className="main-layout">
              <SideBar />
              <Bin />
            </div>
          }
        />
        <Route
          path="/edit-labels"
          element={
            <div className="main-layout">
              <SideBar />
              <Edit />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
