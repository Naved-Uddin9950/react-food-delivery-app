import { createContext, useContext } from "react";


export const TotalContext = createContext({
    total: '',
    setTotal: () => {}
});

export const TotalProvider = TotalContext.Provider;

export default function useTotal() {
    return useContext(TotalContext);
}