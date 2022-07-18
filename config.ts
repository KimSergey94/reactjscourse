export const CLIENT_ID =
  process.env.NODE_ENV === 'production'
    ? 'EUHTrfLPfr0Qb4hU3F-NcA'
    : process.env.CLIENT_ID
export const CLIENT_PWD =
  process.env.NODE_ENV === 'production'
    ? 'V9mTS59TMyDO42K-PqCGKA5oSHlAJQ'
    : process.env.CLIENT_PWD
export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://skillbox-react-app1.herokuapp.com'
    : process.env.SERVER_URL
