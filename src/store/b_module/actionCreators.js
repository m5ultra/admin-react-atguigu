import * as constants from './constants';
import axios from 'axios';

const dispatchAction = (data) => ({
  type: constants.HOME_DATA_CHANGE,
  topicList: data.topicList,
  homeList: data.homeList,
  recommendList: data.recommendList
});

const getMoreAction = (data, newPage) => ({
  type: constants.GET_MORE_DATA,
  data,
  newPage
});

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json')
    .then(res => {
      if (res.data.success) {
        dispatch(dispatchAction(res.data.data));
      }
    });
  };
};

export const getMore = (page) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?page=' + page)
    .then(res => {
      if (res.data.success) {
        dispatch(getMoreAction(res.data.data, page + 1));
      }
    });
  };
};

export const isBackTop = flag => ({
  type: constants.IS_BACK_TOP,
  flag
});
