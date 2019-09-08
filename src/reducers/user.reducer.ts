import { AnyAction } from "redux";

const user = JSON.parse(localStorage.getItem('user') as string) || {};
const defaultUserState = {
  loggedIn: user.loggedIn || false,
  username: user.username || '',
  darkMode: user.darkMode || false
};

export default (state = defaultUserState, action: AnyAction) => {
  switch(action.type) {
    case 'LOGGED_IN':
      return { ...state, loggedIn: true };
    case 'SET_USER':
      const darkMode = action.user.settings.darkMode;
      const { username } = action.user;
      const user = { ...state, username, darkMode };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    case 'LOGGED_OUT':
      return { ...state, loggedIn: false };
    default: 
      return state;
  }
};
