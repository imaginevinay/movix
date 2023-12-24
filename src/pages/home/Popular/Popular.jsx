import React, { useState } from "react";

import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";

import { useAxios } from "../../../utils/api";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useAxios({
    method: "get",
    url: `/${endpoint}/popular`,
  });

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;