import React from 'react';
// import constants from '../constants/constants';

// interface IUser {
//   user: string;
// }

// interface UserProviderProps {
//   children: React.ReactElement;
// }

export type ContextType = {
  user: string;
  // eslint-disable-next-line no-unused-vars
  updateUser: (id: string) => void;
};

export const UserContext = React.createContext({} as ContextType);

// function UserProvider(props: UserProviderProps) {
//   const [user, setUser] = useState<string | null>(null);
//   const { children } = props;

//   // eslint-disable-next-line no-unused-vars
//   const updateUser = (id: string) => {
//     console.log('!!!');
//     const matchUser = constants.USERS.find(
//       ({ value }: { value: string }) => id === value,
//     );
//     if (matchUser && user !== matchUser?.value) {
//       setUser(matchUser?.value);
//     }
//   };
//   return children;
// }

// export default UserProvider;
