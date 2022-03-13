interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface IImageObject {
  height: number;
  url: string;
  width: number;
}

interface IArtistObject {
  id: string;
  images: Array<IImageObject>;
  name: string;
  uri: string;
  genres: Array<string>;
}

interface ITrackObject {
  id: string;
  name: string;
  preview_url: string;
  uri: string;
  artists: [
    {
      name: string;
    }
  ];
  album: {
    name: string;
    images: Array<IImageObject>;
  };
}
