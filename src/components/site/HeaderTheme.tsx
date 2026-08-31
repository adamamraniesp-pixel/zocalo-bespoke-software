import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface HeaderThemeCtx {
  inFinalCta: boolean;
  setInFinalCta: Dispatch<SetStateAction<boolean>>;
}

const HeaderThemeContext = createContext<HeaderThemeCtx | null>(null);

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [inFinalCta, setInFinalCta] = useState(false);
  return (
    <HeaderThemeContext.Provider value={{ inFinalCta, setInFinalCta }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) throw new Error("useHeaderTheme must be used within HeaderThemeProvider");
  return ctx;
}
