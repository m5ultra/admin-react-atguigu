import * as constants from './constants'

export const incrementAction = (action: object) => ({
  type: constants.INCREMENT_NUM,
  ...action,
})
