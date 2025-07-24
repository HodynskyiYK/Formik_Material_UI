import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { actions } from "../store/store";

export const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}