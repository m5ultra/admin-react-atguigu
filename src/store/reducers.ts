const initialState = {
  num: 0,
  num2: 0,
}
export default (state = initialState, action: { type: string; v: any }) => {
  const { type, v } = action
  switch (type) {
    case 'increment-counter':
      console.log(action)
      state.num += v.step
      return { ...state }
    default:
      return state
  }
}
