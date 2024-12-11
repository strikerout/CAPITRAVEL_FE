import React from "react";
import SearchBar from "./SearchBar/SearchBar";

const Banner = ({search, setSearch}) => {
  return (
    <section className="section_banner">
      <div className="banner">
        <img src="/tree.svg" alt="" className="banner-map-img" />
        <div className="banner-grid">
          <div className="banner-text-container">
            <p className="banner-text">
            Ho ho ho! Live magical holiday experiences
              <br />
              , without complications.
            </p>
            <p className="banner-button">
              <b>+10.000 </b> Happy Travelers!
            </p>
            <p className="banner-subtitle-desktop">
            I'm Capi, ready to guide your next holiday adventure!
            </p>
          </div>
          <img src="/capi_christmas.svg" alt="" className="banner-capi-img" />
        </div>
      </div>
      <SearchBar search={search} setSearch={setSearch} />
    </section>
  );
};

export default Banner;
