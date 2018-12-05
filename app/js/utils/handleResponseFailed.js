import store from '../redux/store';
import {switchToErrorView} from "../redux/actions";

const handleResponseFailed = error => {
    import(/* webpackChunkName: "errorPopupInstance" */ '../errorPopupInstance').then(module => {
        const createErrorPopup = module.default;
        const errorPopup = createErrorPopup();
        store.dispatch(switchToErrorView(error));
    });
};

export default handleResponseFailed;


