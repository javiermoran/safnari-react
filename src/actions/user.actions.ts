import { AnyAction } from "redux";

export const setUser = (user: any) : AnyAction => ({
  type: 'SET_USER',
  user
});

export default {
  setUser
}
