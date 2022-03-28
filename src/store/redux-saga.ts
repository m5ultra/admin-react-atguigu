import { takeEvery } from 'redux-saga/effects'
import { constants } from '../pages/home/store'
export function* rootSagas() {
  console.log('Hello Sagas!')
  yield takeEvery(constants.INCREMENT_NUM, () => {
    console.log('hello, takeEvery')
  })
}
