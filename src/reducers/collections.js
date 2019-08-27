export default (state = [], action) => {
  switch(action.type) {
    case 'REFRESH_COLLECTIONS':
      return [...action.collections];
    default:
      return [...state];
  }
}