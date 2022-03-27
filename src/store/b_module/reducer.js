import { fromJS } from 'immutable';
import  * as constants  from './constants';

const defaultState = fromJS({
  topicList: [],
  homeList: [],
  recommendList: [],
  homeListPage: 1,
  isShowScrollTop: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.HOME_DATA_CHANGE:
      return state.merge({
        'topicList': fromJS(action.topicList),
        'homeList': fromJS(action.homeList),
        'recommendList': fromJS(action.recommendList)
      });
    case constants.GET_MORE_DATA:
      return state.merge({
        'homeList': state.get('homeList').concat(fromJS(action.data)),
        'homeListPage': action.newPage
      });
    case constants.IS_BACK_TOP:
      return state.set('isShowScrollTop', action.flag);
    default:
      return state;
  }
}
