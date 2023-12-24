import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import { useAxios } from "../../../utils/api";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useAxios({
    method: "get",
    url: `/${mediaType}/${id}/similar`,
  });

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
