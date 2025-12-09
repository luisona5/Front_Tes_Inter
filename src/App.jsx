// src/App.jsx o similar
import { BrowserRouter, Routes, Route } from "react-router";
import{ Home }from "../src/pages/Principal/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
