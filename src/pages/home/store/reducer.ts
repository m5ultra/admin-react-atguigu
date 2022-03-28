import * as constants from './constants'
const initialState = {
  num: 0,
  age: 88,
  name: 'Dendi',
}
interface Action<T extends string, P> {
  type: T
  payload: P
}
export default (state = initialState, action: Action<string, object>) => {
  switch (action.type) {
    case constants.INCREMENT_NUM:
      console.log('~~~~home-reducer~~~~')
      // @ts-ignore
      const { age } = action
      state.num += age
      return { ...state }
    default:
      return state
  }
}
