import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAxios } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  const configData = useAxios({
    method: "get",
    url: "/configuration",
  });

  const tvGenreData = useAxios({
    method: "get",
    url: "/genre/tv/list",
  });

  const movieGenreData = useAxios({
    method: "get",
    url: "/genre/movie/list",
  });
  

  useEffect(() => {
    getApiConfigData();
    getAllGenres();    
  }, [configData?.data, tvGenreData?.data, movieGenreData?.data]);

  const getApiConfigData = () => {
    const storeUrlData = {
      backdrop: configData?.data?.images?.secure_base_url + "original",
      poster: configData?.data?.images?.secure_base_url + "original",
      profile: configData?.data?.images?.secure_base_url + "original",
    };
    dispatch(getApiConfig(storeUrlData));
  }

  const getAllGenres = async () => {
    const allGenres = {};
    Promise.all([tvGenreData?.data?.genres, movieGenreData?.data?.genres]).then(
      (values) => {
        values.map((genres) => {
          return genres.map((item) => (allGenres[item.id] = item));
        });
        dispatch(getGenres(allGenres));
      }
    );

    // console.log('data', data)
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
