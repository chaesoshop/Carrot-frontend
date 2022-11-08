import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import Jobs from "./routes/Jobs";
import Realty from "./routes/Realty";
import HotArticles from "./routes/HotArticles";
import Region from "./routes/Region";
import Login from "./routes/Login";
import RegionTwo from "./routes/RegionTwo";
import Join from "./routes/Join";
import Jobspost from "./components/Jobspost";
import JobsWrite from "./components/JobsWrite";
import Articles from "./routes/Articles";
import Realtypost from "./components/Realtypost";
import ProductWrite from "./routes/ProductWrite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RealtyWrite from "./components/RealtyWrite";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/hot_articles" element={<HotArticles />} />
        <Route path="/region/:address" element={<Region />} />
        <Route path="/region/:address/:addressTwo" element={<RegionTwo />} />
        <Route path="/realty" element={<Realty />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productPost/:num" element={<Articles />} />
        <Route path="/productWrite" element={<ProductWrite />} />
        <Route path="/jobspost/:num" element={<Jobspost />} />
        <Route path="/jobswrite" element={<JobsWrite />} />
        <Route path="/realtypost" element={<Realtypost />} />
        <Route path="/realtyWrite" element={<RealtyWrite />} />
      </Routes>
    </Router>
  );
}

export default App;
