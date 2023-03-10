import { createContext, ReactNode, useContext } from "react";

interface AppContextProps {
  hostname: string;
}

const AppContext = createContext<AppContextProps>({ hostname: "" });

interface AppProviderProps {
  hostname: string;
  children: ReactNode;
}

const AppProvider = ({ hostname, children }: AppProviderProps) => {
  return (
    <AppContext.Provider value={{ hostname }}>{children}</AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("<AppProvider></AppProvider>");

  return context;
};

export { AppProvider, useApp };
