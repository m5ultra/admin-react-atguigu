import { takeEvery, select } from 'redux-saga/effects'
import { constants } from '../pages/home/store'
export function* rootSagas() {
  console.log('Hello Sagas!')
  // @ts-ignore
  const state = yield select( x => {
    console.log(x)
    return x
  })
  console.log(state, '~~~~state')
  yield takeEvery(constants.INCREMENT_NUM, () => {
    console.log('hello, takeEvery')
  })
}
