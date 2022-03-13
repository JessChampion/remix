import React from "react";

import "./ArtistComponent.scss";
import { TEMPLATE_APP } from "../templateStrings";
import { getImageFromSet } from "../helpers";

interface IArtistComponentProps {
  artist: IArtistObject;
  selectHandler: Function;
}

function ArtistComponent({ artist, selectHandler }: IArtistComponentProps) {
  const imgSrc = getImageFromSet(artist.images)?.url;
  return (
    <li className="artist" key={artist.id}>
      <button
        type="button"
        className="artist-button"
        onClick={() => selectHandler(artist)}
      >
        <div className="artist-image">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={`${artist.name} ${TEMPLATE_APP.artistProfileImg}`}
            />
          ) : (
            <div className="artist-image-placeholder" />
          )}
        </div>
        <strong className="artist-name">{artist.name}</strong>
        <p className="artist-genres">{artist.genres.join("/")}</p>
      </button>
    </li>
  );
}

export default ArtistComponent;
