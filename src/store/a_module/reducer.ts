const initialState = {
  num: -100,
  num2: -110,
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