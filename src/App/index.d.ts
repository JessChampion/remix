interface IAuthStateResponse {
  valid: boolean;
  requestTime: Date;
}

interface ITokenDetails {
  access: string;
  expires: Date;
  refresh: string;
}

interface IUserInfo {
  id: string;
  href: string;
  country: string;
  product: string;
  externalUrls: {
    spotify: string;
  };
  images: [
    {
      url: string;
    }
  ];
}

type AppSectionType = "input" | "output";

interface IAppSection {
  type: AppSectionType;
  toggle: React.ReactChild;
  content: React.ReactChild;
}

type InputSubSectionType = "seeds";
type SeedType = "artists" | "tracks" | "genres";

interface ISeedState {
  tracks: ITrackObject[];
  artists: IArtistObject[];
  genres: string[];
}

interface IAppState {
  input: {
    seeds: ISeedState;
  };
  uiState: {
    currentSection: AppSectionType | null;
    currentInputSubSection: InputSubSectionType | null;
  };
  userInfo: IUserInfo | null;
}
