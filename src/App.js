import { ROUTE_SEARCH, ROUTE_MIGRATE } from "./routes";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={ROUTE_MIGRATE} element={<UploadPage />} />
        <Route path={ROUTE_SEARCH} element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
