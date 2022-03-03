function setAuthToken(config) {
  const token = localStorage.getItem(process.env.VUE_APP_LS_TOKEN_KEY);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}

export default function (axsios) {
  axsios.interceptors.request.use(setAuthToken);
}
