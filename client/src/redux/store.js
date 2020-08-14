import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import root_reducer from "./reducers";

export default createStore(
  root_reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
