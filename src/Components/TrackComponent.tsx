import React from "react";
import "./TrackComponent.scss";
import { head, propOr } from "ramda";
import { TEMPLATE_APP } from "../templateStrings";
import { getImageFromSet } from "../helpers";

interface ITrackComponentProps {
  size?: "small" | "standard";
  track: ITrackObject;
  selectHandler: Function;
}

const TARGET_SIZES = {
  small: 64,
  standard: 300,
};

function TrackComponent({ track, size, selectHandler }: ITrackComponentProps) {
  const targetSize = propOr(size, "standard", TARGET_SIZES) as number;
  const imgSrc = getImageFromSet(track.album.images, targetSize)?.url;
  const mainArtist = head(track.artists)?.name;
  return (
    <li className={`track track-${size}`} key={track.id}>
      <button
        type="button"
        className="track-button"
        onClick={() => selectHandler(track)}
      >
        <div className="track-image">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={`${track.album.name} ${TEMPLATE_APP.coverArt}`}
            />
          ) : (
            <div className="track-image-placeholder" />
          )}
        </div>
        <strong className="track-name">{track.name}</strong>
        {mainArtist && <p className="track-artist">{mainArtist}</p>}
        <p className="track-album">{track.album.name}</p>
      </button>
    </li>
  );
}

TrackComponent.defaultProps = {
  size: "standard",
};
export default TrackComponent;
