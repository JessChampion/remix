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
type InputSubSectionType = "seeds";

interface IAppState {
  uiState: {
    currentSection: AppSectionType | null;
    currentInputSubSection: InputSubSectionType | null;
  };
  userInfo: IUserInfo | null;
}
