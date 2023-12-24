import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import { useAxios } from "../../../utils/api";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useAxios({
    method: "get",
    url: `/${mediaType}/${id}/recommendations`,
  });

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
