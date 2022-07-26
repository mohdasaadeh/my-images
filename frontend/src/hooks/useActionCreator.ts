import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../redux";

export const useActionCreator = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
