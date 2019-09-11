
export const turnLoadingOn = (loader: string) => ({
  type: 'TURN_LOADING_ON',
  loader
});

export const turnLoadingOff = (loader: string) => ({
  type: 'TURN_LOADING_OFF',
  loader
});

export default {
  turnLoadingOn,
  turnLoadingOff
}
