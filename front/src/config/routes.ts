export const ROUTES_CONFIG = {
  MOVIES: '/',
  LOGIN: '/login',
} as const;

type NavConfig = {
  [key: string]: { title: string; url: string };
};

export const NAV_CONFIG: NavConfig = {
  MOVIES: {
    title: '영화',
    url: ROUTES_CONFIG.MOVIES,
  },
  LOGIN: {
    title: '로그인',
    url: ROUTES_CONFIG.LOGIN,
  },
};
