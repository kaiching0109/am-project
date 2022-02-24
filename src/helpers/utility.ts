// import { Message } from '../components/chatPane/chatPane.component';
import constants from '../constants/constants';

const { USERS, CHANNELS } = constants;

const findUser = (uid: string) => USERS.find(({ value }) => uid === value);

const findChannel = (cid: string) => CHANNELS.find(({ id }) => cid === id);

export { findUser, findChannel };
