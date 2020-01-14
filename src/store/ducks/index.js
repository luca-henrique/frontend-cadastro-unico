import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as toastr } from "react-redux-toastr";

import users from "./user";
import login from "./login";
import address from "./address";
import contact from "./contact";

import { reducer as auth } from "./auth";

export default history =>
  combineReducers({
    toastr,
    contact,
    login,
    address,
    users,
    auth,
    router: connectRouter(history)
  });