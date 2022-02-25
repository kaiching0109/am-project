import React, { useState, useMemo } from 'react';
import { findUser } from '../helpers/utility';
import constants from '../constants/constants';

interface UserProviderProps {
  children: React.ReactElement;
}

export type ContextType = {
  user: string;
  // eslint-disable-next-line no-unused-vars
  updateUser: (id: string) => void;
};

// TODO: update userId to User for context value
export const UserContext = React.createContext({} as ContextType);

export default function UserProvider(props: UserProviderProps) {
  const { children } = props;
  const [user, setUser] = useState(constants.USERS[0]?.value);

  /**
   * TODO:
   */
  const updateUser = React.useCallback(
    (id: string) => {
      const matchUser = findUser(id);
      if (matchUser && user !== matchUser?.value) {
        setUser(matchUser?.value);
      }
    },
    [user],
  );

  const providerProps = useMemo(
    () => ({
      user,
      updateUser,
    }),
    [user, updateUser],
  );

  return (
    <UserContext.Provider value={providerProps}>
      {children}
    </UserContext.Provider>
  );
}
