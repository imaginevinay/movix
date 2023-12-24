import React from "react";
import "./styles.scss";
import { useAxios } from "../../utils/api";
import { useParams } from "react-router-dom";
import DetailsBanner from "./DetailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./Related/Similar";
import Recommendation from "./Related/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data: videoData, loading: videoDataLoading } = useAxios({
    method: "get",
    url: `/${mediaType}/${id}/videos`,
  });
  const { data: credits, loading: creditsLoading } = useAxios({
    method: "get",
    url: `/${mediaType}/${id}/credits`,
  });
  return (
    <>
      <DetailsBanner video={videoData?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={videoData} loading={videoDataLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </>
  );
};

export default Details;
