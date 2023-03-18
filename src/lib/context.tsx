import { createContext } from "react";
import { MultiFactorUser, User } from "firebase/auth";
import { create } from "domain";

export interface UserContextData {
    user: User | null | undefined
    username: string | null
}

const initialUserContext: UserContextData = {
      user: undefined
    , username: null
}

// export const UserContext = createContext(initialUserContext)
export const UserContext = createContext({
    user: undefined
  , username: null
} as UserContextData)
