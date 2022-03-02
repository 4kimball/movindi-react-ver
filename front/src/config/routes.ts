export const ROUTES_CONFIG = {
  LOGIN: '/login',
} as const;

type NavConfig = {
  [key: string]: { title: string; url: string };
};

export const NAV_CONFIG: NavConfig = {
  LOGIN: {
    title: '로그인',
    url: ROUTES_CONFIG.LOGIN,
  },
};
