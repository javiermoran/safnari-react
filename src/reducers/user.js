const defaultUserState = {
  loggedIn: false
};

export default (state = defaultUserState, action) => {
  switch(action.type) {
    case 'LOGGED_IN':
      return { ...state, loggedIn: true };
    case 'LOGGED_OUT':
      return { ...state, loggedIn: false };
    default: 
      return state;
  }
};
