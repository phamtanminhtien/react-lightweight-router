// src/components/Route.tsx
import { matchPath } from "../utils/matchPath";
import { useRouter } from "./Router";
import { JSX, useEffect } from "react";

export const Route = ({
  path,
  element,
}: {
  path: string;
  element: JSX.Element;
}) => {
  const { path: currentPath, setParams } = useRouter();
  const { isMatch, params } = matchPath(path, currentPath);

  // Update params in router context when they change
  useEffect(() => {
    if (isMatch && setParams) {
      setParams(params);
    }
  }, [isMatch, params, setParams]);

  return isMatch ? element : null;
};
