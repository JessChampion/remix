import { isNil } from "ramda";
import React, { useContext } from "react";

import "./UserInfoContainer.scss";
import { TEMPLATE_APP } from "../templateStrings";
import { AppStateContext } from "../App/AppStateContextProvider";
import ButtonComponent from "../Components/ButtonComponent";

interface IUserInfoContainerProps {
  logout: Function;
}

function UserInfoContainer({ logout }: IUserInfoContainerProps) {
  const { loading, getPathValueFromState } = useContext(AppStateContext);

  const profileImage = getPathValueFromState(["userInfo", "images", 0, "url"]);
  const displayName = getPathValueFromState(["userInfo", "displayName"]);
  const spotifyUrl = getPathValueFromState([
    "userInfo",
    "externalUrls",
    "spotify",
  ]);
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
