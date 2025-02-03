import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';
// import services from '../services/reducer';
// import auth from '../modules/auth/login/AuthState';
import home from '../modules/home/HomeState';
// import explore from '../modules/explore/ExploreState';
// import learn from '../modules/learn/LearnState';
// import interaction from '../modules/interaction/InteractionState';
// import notification from '../modules/notification/NotificationState';
// import question from '../modules/learn/quiz/QuestionState';
// import listPackage from '../modules/buy/package/ListPackageState';
// import bankAccount from '../modules/buy/checkout/CheckoutState';

const appReducer = combineReducers({
  // ## Generator Reducers
  app,
  // services,
  // auth,
  home,
  // explore,
  // learn,
  // interaction,
  // notification,
  // question,
  // listPackage,
  // bankAccount,
});

export default (state, action) => {
  return appReducer(state, action);
};