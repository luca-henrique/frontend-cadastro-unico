import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as toastr } from "react-redux-toastr";

import users from "./user";
import login from "./login";
import address from "./address";
import contact from "./contact";
import funcionario from "./funcionario";

import { reducer as auth } from "./auth";

export default history =>
  combineReducers({
    toastr,
    contact,
    funcionario,
    login,
    address,
    users,
    auth,
    router: connectRouter(history)
  });
