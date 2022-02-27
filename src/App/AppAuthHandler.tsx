import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import LoadingComponent from '../Components/LoadingComponent';
import { config } from '../config';

interface IAppAuthHandlerProps {
  redirect: string;
  handleError: Function
  setToken: Function
  checkState: Function
}

function AppAuthHandler({
  // eslint-disable-next-line
  setToken,
  redirect,
  handleError,
  checkState
}: IAppAuthHandlerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStateValid, setIsStateValid] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log({
    code,
    state
  });

  useEffect(() => {
    if (code && isStateValid) {
      const formData = new URLSearchParams({
        code: code || '',
        redirect_uri: redirect,
        grant_type: 'authorization_code'
      });

      fetch(
        `${config.token}/token`,
        {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            Authorization: `Basic ${config.clientHash}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData
        }
      )
        .then((response: Response) => response.json()
          .then(({ access_token, expires_in, refresh_token }) => {
            setToken(JSON.stringify({
              access_token,
              expires_in,
              refresh_token
            }));
          }))
        .catch((error: any) => {
          console.log({ error });
          handleError('Failed fetching token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isStateValid]);

  useEffect(() => {
    console.log({ state });
    if (checkState(state || '')) {
      setIsStateValid(true);
      return;
    }
    setIsLoading(false);
    handleError(new Error('State check failed'));
  }, [state]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Navigate to="/" />
  );
}

export default AppAuthHandler;
