export default (state = [], action) => {
  switch(action.type) {
    case 'SET_COLLECTIONS':
      return [...action.collections];
    default:
      return [...state];
  }
}
