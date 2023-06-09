import { useRouteParams as useRouteParamsInternal } from "react-declarative";

import routes from "../config/routes";

import ioc from "../lib/ioc";

export const useRouteParams = () => useRouteParamsInternal(routes, ioc.routerService);

export default useRouteParams;
