import React, { useEffect, useRef, useState } from "react";
import "./SeedSelectionContainer.scss";
import { useQuery } from "@apollo/client";
import { isEmpty, pathOr, propOr, values } from "ramda";

import {
  GET_TOP_ARTISTS,
  GET_TOP_TRACKS,
} from "../../Queries/userFavouritesQuery";
import TrackComponent from "../../Components/TrackComponent";
import ButtonComponent from "../../Components/ButtonComponent";
import { TEMPLATE_APP, TEMPLATE_SEEDS } from "../../templateStrings";
import ArtistComponent from "../../Components/ArtistComponent";
import SearchComponent from "../../Components/SearchComponent";
import { GET_GENRES } from "../../Queries/allGenresQuery";
import TextFilterComponent from "../../Components/TextFilterComponent";
import IconComponent from "../../Components/IconComponent";
import {
  GET_SEARCH_ARTISTS,
  GET_SEARCH_TRACKS,
} from "../../Queries/searchQuery";

type SeedType = "artists" | "tracks" | "genres";
const SEED_TYPES = {
  tracks: "tracks" as SeedType,
  artists: "artists" as SeedType,
  genres: "genres" as SeedType,
};
const DEFAULT_SEED_TYPE = "tracks" as SeedType;

const renderTabButton = (
  type: SeedType,
  isActive: boolean,
  clickHandler: Function
) => {
  return (
    <ButtonComponent
      className={`seed-selection-tab ${type} ${isActive ? "active" : ""}`}
      key={type}
      onClick={() => clickHandler(type)}
      variant="tab"
    >
      <span>{propOr("", type, TEMPLATE_SEEDS)}</span>
    </ButtonComponent>
  );
};

const renderListTitle = (title: string) => (
  <strong className="seed-selection-list-title">{title}</strong>
);

function SeedSelectionContainer() {
  const [currentSeedType, setCurrentSeedType] =
    useState<SeedType>(DEFAULT_SEED_TYPE);
  const searchInput = useRef<HTMLInputElement>(null);
  const genreFilterInput = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [genreFilterText, setGenreFilterText] = useState<string>("");
  const [topTracks, setTopTracks] = useState<Array<ITrackObject>>([]);
  const [searchResultsTracks, setSearchResultsTracks] = useState<
    Array<ITrackObject>
  >([]);
  const [topArtists, setTopArtists] = useState<Array<IArtistObject>>([]);
  const [searchResultsArtists, setSearchResultsArtists] = useState<
    Array<IArtistObject>
  >([]);
  const [allGenres, setAllGenres] = useState<Array<string>>([]);
  const [displayedGenres, setDisplayedGenres] =
    useState<Array<string>>(allGenres);

  const topTracksQuery = useQuery(GET_TOP_TRACKS, {
    skip: currentSeedType !== SEED_TYPES.tracks,
    fetchPolicy: "cache-first",
  });

  const searchTracksQuery = useQuery(GET_SEARCH_TRACKS, {
    variables: {
      query: searchText,
    },
    skip: currentSeedType !== SEED_TYPES.tracks || isEmpty(searchText),
    fetchPolicy: "cache-first",
  });

  const topArtistsQuery = useQuery(GET_TOP_ARTISTS, {
    skip: currentSeedType !== SEED_TYPES.artists,
    fetchPolicy: "cache-first",
  });

  const searchArtistsQuery = useQuery(GET_SEARCH_ARTISTS, {
    variables: {
      query: searchText,
    },
    skip: currentSeedType !== SEED_TYPES.artists || isEmpty(searchText),
    fetchPolicy: "cache-first",
  });

  const genresQuery = useQuery(GET_GENRES, {
    skip: currentSeedType !== SEED_TYPES.genres,
    fetchPolicy: "cache-first",
  });

  const selectTrackHandler = (selectedTrack: ITrackObject) => {
    console.log({ selectedTrack });
  };

  const selectArtistHandler = (selectedArtist: IArtistObject) => {
    console.log({ selectedArtist });
  };

  const selectGenre = (selectedGenre: string) => {
    console.log({ selectedGenre });
  };

  useEffect(() => {
    if (!topTracksQuery.loading) {
      setTopTracks(pathOr([], ["topTracks", "items"], topTracksQuery.data));
    }
  }, [topTracksQuery.data]);

  useEffect(() => {
    if (!topArtistsQuery.loading) {
      setTopArtists(pathOr([], ["topArtists", "items"], topArtistsQuery.data));
    }
  }, [topArtistsQuery.data]);

  useEffect(() => {
    if (!searchTracksQuery.loading) {
      console.log({ trackData: searchTracksQuery.data });
      setSearchResultsTracks(
        pathOr([], ["searchTracks", "tracks", "items"], searchTracksQuery.data)
      );
    }
  }, [searchTracksQuery.data]);

  useEffect(() => {
    if (!searchArtistsQuery.loading) {
      console.log({
        artistData: searchArtistsQuery.data?.artists?.items,
        raw: searchArtistsQuery.data,
      });
      setSearchResultsArtists(
        pathOr(
          [],
          ["searchArtists", "artists", "items"],
          searchArtistsQuery.data
        )
      );
    }
  }, [searchArtistsQuery.data]);

  useEffect(() => {
    if (!genresQuery.loading) {
      setAllGenres(pathOr([], ["genres", "genres"], genresQuery.data));
    }
  }, [genresQuery.data]);

  useEffect(() => {
    if (topTracksQuery.error) {
      console.error(topTracksQuery.error);
    }
    if (topArtistsQuery.error) {
      console.error(topArtistsQuery.error);
    }
    if (genresQuery.error) {
      console.error(genresQuery.error);
    }
  }, [topTracksQuery.error, topArtistsQuery.error, genresQuery.error]);

  useEffect(() => {
    setDisplayedGenres(
      allGenres.filter((genreString: string) =>
        genreString.includes(genreFilterText)
      )
    );
  }, [allGenres, genreFilterText]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    if (searchInput.current) {
      searchInput.current.value = "";
    }
  };

  const handleGenreFilter = (value: string) => {
    console.log({ value });
    setGenreFilterText(value);
  };

  const handleClearGenreFilter = () => {
    setSearchText("");
    if (genreFilterInput.current) {
      genreFilterInput.current.value = "";
    }
  };

  const handleChangeSeedType = (newSeedType: SeedType) => {
    setCurrentSeedType(newSeedType);
    handleClearSearch();
    handleClearGenreFilter();
  };

  return (
    <div className="seed-selection">
      <div role="tablist" className="seed-selection-type-selector">
        {values(SEED_TYPES).map((type: SeedType) =>
          renderTabButton(type, type === currentSeedType, handleChangeSeedType)
        )}
      </div>
      <div className="seed-selection-type-content">
        {["tracks", "artists"].includes(currentSeedType) && (
          <>
            <SearchComponent
              id="seedSearch"
              label={`${TEMPLATE_APP.search} ${
                SEED_TYPES[currentSeedType] || ""
              }`}
              doSearch={handleSearch}
              doClear={handleClearSearch}
              currentValue={searchText}
              ref={searchInput}
              inputRef={searchInput.current}
            />
            <div className="seed-selection-separator">
              {isEmpty(searchText) && (
                <span>{TEMPLATE_SEEDS.orSelectFrom}</span>
              )}
            </div>
          </>
        )}
        {currentSeedType === "tracks" && (
          <div className="seed-selection-list">
            {isEmpty(searchText) ? (
              <>
                {renderListTitle(
                  `${TEMPLATE_SEEDS.top} ${TEMPLATE_SEEDS.tracks}`
                )}
                <ul className="seed-selection-list-contents tracks">
                  {topTracks.map((track: ITrackObject) => (
                    <TrackComponent
                      track={track}
                      selectHandler={selectTrackHandler}
                      key={track.id}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <>
                <ul className="seed-selection-list-contents tracks search-results">
                  {renderListTitle(
                    `${TEMPLATE_SEEDS.matching} ${TEMPLATE_SEEDS.tracks}`
                  )}
                  <ul className="seed-selection-list-contents tracks">
                    {searchResultsTracks.map((track: ITrackObject) => (
                      <TrackComponent
                        track={track}
                        selectHandler={selectTrackHandler}
                        key={track.id}
                      />
                    ))}
                  </ul>
                </ul>
              </>
            )}
          </div>
        )}
        {currentSeedType === "artists" && (
          <div className="seed-selection-list">
            {isEmpty(searchText) ? (
              <>
                {renderListTitle(
                  `${TEMPLATE_SEEDS.top} ${TEMPLATE_SEEDS.artists}`
                )}
                <ul className="seed-selection-list-contents artists">
                  {topArtists.map((artist: IArtistObject) => (
                    <ArtistComponent
                      artist={artist}
                      selectHandler={selectArtistHandler}
                      key={artist.id}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <>
                <ul className="seed-selection-list-contents tracks search-results">
                  {renderListTitle(
                    `${TEMPLATE_SEEDS.matching} ${TEMPLATE_SEEDS.artists}`
                  )}
                  <ul className="seed-selection-list-contents artists">
                    {searchResultsArtists.map((artist: IArtistObject) => (
                      <ArtistComponent
                        artist={artist}
                        selectHandler={selectArtistHandler}
                        key={artist.id}
                      />
                    ))}
                  </ul>
                </ul>
              </>
            )}
          </div>
        )}
        {currentSeedType === "genres" && (
          <div className="seed-selection-list">
            <div className="seed-selection-list-header">
              {renderListTitle(
                `${TEMPLATE_SEEDS.select} ${TEMPLATE_SEEDS.genres}`
              )}
              <TextFilterComponent
                doFilter={handleGenreFilter}
                currentValue={genreFilterText}
                id="genre-filter"
                doClear={handleClearGenreFilter}
                ref={genreFilterInput}
                className="genre-filter"
              >
                {{
                  label: (
                    <span className="label">
                      <IconComponent type="filter" alt="" />
                      {TEMPLATE_APP.filter}
                    </span>
                  ),
                }}
              </TextFilterComponent>
            </div>
            <ul className="seed-selection-list-contents genres">
              {displayedGenres.map((genre: string) => (
                <li className="genre" key={genre}>
                  <button
                    className="genre-button"
                    type="button"
                    onClick={() => selectGenre(genre)}
                  >
                    <span>{genre.replaceAll("-", " ")}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeedSelectionContainer;
