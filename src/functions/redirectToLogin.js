export const redirectToLogin = () => {
  const app_url = 'owl.rctech.club';
  let url = `https://ladybird.rctech.club/?redirectTo=${app_url}`;
  if (process.env.NODE_ENV === 'development') {
    // local ladybird is hosted at port 3001, owl is hosted at 3000
    url = `http://localhost:3001/?redirectTo=localhost:3000`;
  }
  window.location.replace(url);
};
