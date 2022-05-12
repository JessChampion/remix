import { equals, pathOr, propEq, propOr, reject } from "ramda";
import React, { useContext } from "react";
import "./CurrentSeedsContainer.scss";
import { AppStateContext, MAX_SEEDS } from "../AppStateContextProvider";
import { TEMPLATE_SEEDS } from "../../templateStrings";
import { isSelected } from "../../helpers";

const getSeedLabel = (
  type: SeedType,
  seed: ITrackObject | IArtistObject | string
) => {
  if (type === "genres") {
    return seed as string;
  }
  return (seed as ITrackObject | IArtistObject).name || "";
};

const renderSeedImage = (
  type: SeedType,
  seed: ITrackObject | IArtistObject | string
) => {
  if (type === "tracks") {
    return pathOr<string | undefined>(
      undefined,
      ["album", "images", 0, "url"],
      seed
    );
  }
  if (type === "artists") {
    return pathOr<string | undefined>(undefined, ["images", 0, "url"], seed);
  }
  return null;
};

const renderSeed = (
  type: SeedType,
  seed: ITrackObject | IArtistObject | string,
  clickHandler: Function
) => {
  const label = getSeedLabel(type, seed);
  const image = renderSeedImage(type, seed);
  return (
    <button
      type="button"
      onClick={() => clickHandler(seed)}
      className={`current-seed current-seed--${type}`}
      key={propOr(seed, "id", seed)}
    >
      {image ? (
        <img
          src={image}
          alt={label}
          title={label}
          className="current-seed__image"
        />
      ) : (
        <span className="current-seed__img-placeholder">
          <span>{label.replaceAll("-", " ")}</span>
        </span>
      )}
      <span className="current-seed__label">{label}</span>
    </button>
  );
};

const getPlaceholders = (placeholderCount: number) =>
  Array(placeholderCount).fill(null);

const renderSeedSections = (
  getInputSeeds: Function,
  setInputSeeds: Function,
  placeholderCount: number
) => {
  const removeTrackHandler = (selectedTrack: ITrackObject) => {
    const seeds = getInputSeeds();
    if (isSelected(selectedTrack.id, seeds?.tracks)) {
      setInputSeeds({
        ...seeds,
        tracks: reject(propEq("id", selectedTrack.id), seeds?.tracks),
      });
    }
  };

  const removeArtistHandler = (selectedArtist: IArtistObject) => {
    const seeds = getInputSeeds();
    if (isSelected(selectedArtist.id, seeds?.artists)) {
      setInputSeeds({
        ...seeds,
        artists: reject(propEq("id", selectedArtist.id), seeds?.artists),
      });
    }
  };

  const removeGenreHandler = (selectedGenre: string) => {
    const seeds = getInputSeeds();
    if (seeds?.genres.includes(selectedGenre)) {
      setInputSeeds({
        ...seeds,
        genres: reject(equals(selectedGenre), seeds?.genres),
      });
    }
  };

  const seeds = getInputSeeds();

  return (
    <div className="seeds-selected__wrap">
      <div className="seeds-selected__tracks">
        {seeds.tracks.map((seedTrack: ITrackObject) =>
          renderSeed("tracks", seedTrack, removeTrackHandler)
        )}
      </div>
      <div className="seeds-selected__artists">
        {seeds.artists.map((seedArtist: IArtistObject) =>
          renderSeed("artists", seedArtist, removeArtistHandler)
        )}
      </div>
      <div className="seeds-selected__genres">
        {seeds.genres.map((seedGenre: string) =>
          renderSeed("genres", seedGenre, removeGenreHandler)
        )}
      </div>
      {placeholderCount > 0 && (
        <div className="seeds-selected__placeholders">
          {getPlaceholders(placeholderCount).map((element, index) => (
            <span
              className="current-seed current-seed--placeholder"
              // eslint-disable-next-line react/no-array-index-key
              key={`placeholder-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function CurrentSeedsContainer() {
  const { getInputSeeds, getInputSeedsCount, setInputSeeds } =
    useContext(AppStateContext);
  const totalSeedCount = getInputSeedsCount();

  return (
    <div className="seeds-selected">
      <strong className="seeds-selected__label">
        {totalSeedCount > 0
          ? TEMPLATE_SEEDS.currentSeeds
          : TEMPLATE_SEEDS.selectSeeds}
      </strong>
      <div className="seeds-selected__wrap">
        {renderSeedSections(
          getInputSeeds,
          setInputSeeds,
          MAX_SEEDS - totalSeedCount
        )}
      </div>
    </div>
  );
}

export default CurrentSeedsContainer;
