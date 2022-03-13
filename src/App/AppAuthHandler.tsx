import { addSeconds } from "date-fns";
import { isNil } from "ramda";
import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import LoadingComponent from "../Components/LoadingComponent";
import { config } from "../config";

interface IAppAuthHandlerProps {
  redirect: string;
  handleError: Function;
  setTokenDetails: Function;
  checkState: (stateValue: string) => IAuthStateResponse;
}

function AppAuthHandler({
  setTokenDetails,
  redirect,
  handleError,
  checkState,
}: IAppAuthHandlerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestDatetime, setRequestDatetime] = useState<Date | null>(null);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "";

  useEffect(() => {
    if (code && !isNil(requestDatetime)) {
      const formData = new URLSearchParams({
        code: code || "",
        redirect_uri: redirect,
        grant_type: "authorization_code",
      });

      fetch(`${config.token}/token`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `Basic ${config.clientHash}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })
        .then((response: Response) =>
          response
            .json()
            .then(({ access_token, expires_in, refresh_token }) => {
              setTokenDetails({
                access: access_token,
                expires: addSeconds(requestDatetime, expires_in),
                refresh: refresh_token,
              });
            })
        )
        .catch((error: any) => {
          console.error({ error });
          handleError("Failed fetching token");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [requestDatetime]);

  useEffect(() => {
    const { valid, requestTime } = checkState(state);
    if (valid) {
      setRequestDatetime(requestTime);
      return;
    }
    setIsLoading(false);
    handleError(new Error("State check failed"));
  }, [state]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return <Navigate to="/" />;
}

export default AppAuthHandler;
