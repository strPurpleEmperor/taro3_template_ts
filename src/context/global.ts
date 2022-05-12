import {createContext} from "react";

export interface GlobalContextType {
  statusBarHeight: number,
  navHeight: number,
  paddingTop: string
}

export const globalContext = createContext<GlobalContextType>({
  statusBarHeight: 44,
  navHeight: 40,
  paddingTop: '84px'
})
