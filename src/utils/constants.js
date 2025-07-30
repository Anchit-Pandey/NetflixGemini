export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY,
  }
};

export const BG = 'https://assets.nflxext.com/ffe/siteui/vlv3/3c5e10eb-4b8f-4f6d-bc86-0087cf2c6e8c/web/IN-en-20250707-TRIFECTA-perspective_06686b82-c2e5-4118-ab7b-d575f79b304b_medium.jpg'

export const IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500';

export const SUPPORTED_LANGUAGES = [
  {identifier: "en", name: "English"},
  {identifier: "hindi", name: "Hindi"},
  {identifier: "spanish", name: "Spanish"},
];

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

export const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
