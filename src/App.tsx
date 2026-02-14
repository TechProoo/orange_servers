import "./App.css";
import {  Route, Routes } from "react-router-dom";
import Wordpress from "./Pages/Wordpress";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wordpress" element={<Wordpress />} />
    </Routes>
  );
}

export default App;
