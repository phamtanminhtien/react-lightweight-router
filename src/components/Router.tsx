// src/components/Router.tsx
import { createContext, useContext, useEffect, useState } from "react";

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: { [key: string]: string };
  setParams: (params: { [key: string]: string }) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: "/",
  navigate: () => {},
  params: {},
  setParams: () => {},
});

export const Router = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState(
    window.location.pathname + window.location.search
  );
  const [params, setParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <RouterContext.Provider value={{ path, navigate, params, setParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export const useParams = () => {
  const { params } = useRouter();
  return params;
};
