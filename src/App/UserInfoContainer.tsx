import { isNil, pathOr } from "ramda";
import React, { useContext } from "react";

import "./UserInfoContainer.scss";
import { TEMPLATE_APP } from "../templateStrings";
import { AppStateContext } from "./AppStateContextProvider";
import ButtonComponent from "../Components/ButtonComponent";

interface IUserInfoContainerProps {
  logout: Function;
}

function UserInfoContainer({ logout }: IUserInfoContainerProps) {
  const { loading, getUserInfo } = useContext(AppStateContext);

  const userInfo = getUserInfo();
  const profileImage = pathOr(undefined, ["images", 0, "url"], userInfo);
  const displayName = pathOr(undefined, ["displayName"], userInfo);
  const spotifyUrl = pathOr(undefined, ["externalUrls", "spotify"], userInfo);
  const label = `${displayName} ${TEMPLATE_APP.spotifyProfile}`;

  return (
    <div className="user-info">
      <ButtonComponent
        className="logout"
        variant="link"
        onClick={() => logout()}
      >
        {TEMPLATE_APP.logout}
      </ButtonComponent>
      {loading || isNil(spotifyUrl) ? null : (
        <a
          target="_blank"
          className="user-info-profile-link"
          href={spotifyUrl}
          rel="noreferrer"
        >
          <img
            className="user-info-profile-image"
            src={profileImage}
            alt={label}
            title={label}
          />
        </a>
      )}
    </div>
  );
}

export default UserInfoContainer;
