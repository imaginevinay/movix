import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./styles.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Genres from "../../../components/Genres/Genres";
import CircleRating from "../../../components/CircleRating/CircleRating";
import LazyLoadImg from "../../../components/lazyLoadImg/LazyLoadImg";
import PosterFallback from "../../../assets/no-poster.png";
import { useAxios } from "../../../utils/api";
import { PlayTrailerIcon } from "../PlayTrailer/PlayTrailer";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading, error } = useAxios({
    method: "get",
    url: `/${mediaType}/${id}`,
  });


  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = data?.genres?.map((genre) => genre?.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <div>
          <div className="backdrop-img">
            <LazyLoadImg src={url?.backdrop + data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <LazyLoadImg
                    className="posterImg"
                    src={url?.backdrop + data?.poster_path}
                  />
                ) : (
                  <LazyLoadImg className="posterImg" src={PosterFallback} />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data?.name || data?.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">{data?.tagline}</div>
                <Genres data={_genres} />
                <div className="row">
                  <CircleRating rating={data?.vote_average.toFixed(1)} />
                  <div className="playbtn" onClick={() => {
                    setShow(true)
                    setVideoId(video?.key)
                    }}>
                    <PlayTrailerIcon />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data?.overview}</div>
                </div>
                <div className="info">
                  {data?.status && (
                    <div className="infoItem">
                      <span className="text bold">Status : </span>
                      <span className="text">{data?.status}</span>
                    </div>
                  )}
                  {data?.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date : </span>
                      <span className="text">
                        {dayjs(data?.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data?.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime : </span>
                      <span className="text">
                        {toHoursAndMinutes(data?.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {director.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {writer?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writers: </span>
                    <span className="text">
                      {writer?.map((w, i) => (
                        <span key={i}>
                          {w.name}
                          {writer?.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creators: </span>
                    <span className="text">
                      {data?.created_by?.map((w, i) => (
                        <span key={i}>
                          {w.name}
                          {data?.created_by?.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
          </ContentWrapper>
        </div>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
