interface SessionConfig {
    url: string;
  }
  
  interface App {
    session?: {
      config: SessionConfig;
    };
  }
  
  function checkForPrefix(url: URL): string {
    const endUrl = String(url).split(url.host)[1];
    const urlArray = endUrl.split("/");
    return urlArray[1] === "app" ? "" : `/${urlArray[1]}`;
  }
  
  function getSenseServerUrl(app: App): string | undefined {
    let wsUrl: URL;
    let protocol: string;
    let isSecure: boolean;
  
    if (app?.session?.config) {
      const { config } = app.session;
      wsUrl = new URL(config.url);
      const prefix = checkForPrefix(wsUrl);
      isSecure = wsUrl.protocol === "wss:";
      protocol = isSecure ? "https://" : "http://";
      return protocol + wsUrl.host + prefix;
    }
    return undefined;
  }
  
  export const getImageUrl = (imgUrl: string, app: App): string => {
    imgUrl = imgUrl.replace(/^\.\.\//i, "/");
    imgUrl = imgUrl.replace(/"/g, '\\"');
    imgUrl = imgUrl.replace(/'/g, "\\'");
    const baseUrl = getSenseServerUrl(app);
    const rootPath = `${baseUrl}/`;
    imgUrl = rootPath + (imgUrl[0] === "/" ? imgUrl.substr(1) : imgUrl);
    return imgUrl;
  };
  
  export const inIframe = (): boolean => {
    try {
      return window.self !== window.top;
    } catch (error) {
      return true;
    }
  };

  const HTTP_PROTOCOL = "http://";
const HTTPS_PROTOCOL = "https://";
const EMAIL_PROTOCOL = "mailto:";

export const getCurrentProtocol = (s: string): string => {
  if (s.startsWith(HTTP_PROTOCOL)) {
    return HTTP_PROTOCOL;
  }
  if (s.startsWith(HTTPS_PROTOCOL)) {
    return HTTPS_PROTOCOL;
  }
  if (s.startsWith(EMAIL_PROTOCOL)) {
    return EMAIL_PROTOCOL;
  }
  return HTTP_PROTOCOL;
};

export const removeProtocolHttp = (s: string): string => {
  let res = s;
  if (s.startsWith(HTTP_PROTOCOL)) {
    res = s.slice(HTTP_PROTOCOL.length);
  }
  if (s.startsWith(HTTPS_PROTOCOL)) {
    res = s.slice(HTTPS_PROTOCOL.length);
  }
  return res;
};

export const urlHasEmailProtocol = (str: string): boolean => {
  let url: URL;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === EMAIL_PROTOCOL;
};

const ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;

const UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;

const UNMATCHED_SURROGATE_PAIR_REPLACE = "$1\uFFFD$2";

export const encodeUrl = (url: string): string => {
  return String(url)
    .replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
    .replace(ENCODE_CHARS_REGEXP, encodeURI);
};

  