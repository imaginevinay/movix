import React, { useState } from "react";

import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";

import { useAxios } from "../../../utils/api";

import './styles.scss'

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useAxios({
        method: 'get',
        url: `/trending/all/${endpoint}`
    });

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;