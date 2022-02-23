import React, { useState, useMemo } from 'react';
import constants from '../constants/constants';

// interface IUser {
//   user: string;
// }

interface UserProviderProps {
  children: React.ReactElement;
}

export type ContextType = {
  user: string;
  // eslint-disable-next-line no-unused-vars
  updateUser: (id: string) => void;
};

export const UserContext = React.createContext({} as ContextType);

export default function UserProvider(props: UserProviderProps) {
  const { children } = props;
  const [user, setUser] = useState(constants.USERS[0]?.value);

  /**
   * TODO:
   */
  const updateUser = React.useCallback(
    (id: string) => {
      const matchUser = constants.USERS.find(
        ({ value }: { value: string }) => id === value,
      );
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
