import { NAV_CONFIG } from '../config/routes';
const usePageTitle = (pathname: string) => {
  switch (pathname) {
    case NAV_CONFIG.LOGIN.url:
      document.title = NAV_CONFIG.LOGIN.title + ' ' + `| Movindi`;
      break;
    default:
      document.title = 'Movindi';
  }
};

export default usePageTitle;
