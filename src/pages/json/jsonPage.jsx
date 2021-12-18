import React from "react";
import FunctionalComp from './component/functionalComponent'
import { withReducer } from '@store/reducerLoader';
import reducer from './reducer';
import sagas from './sagas';

const JsonPage = () => {
    return (
        <div>
            <FunctionalComp />
        </div>
    )
}
const ReducedScreen = withReducer('appointmentList', reducer, sagas)(JsonPage);
export default ReducedScreen;