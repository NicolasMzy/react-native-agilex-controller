import {combineReducers} from 'redux'
import ipReducer from './ipReducer'
import portReducer from './portReducer'
import vReducer from './vReducer'
import wReducer from './wReducers'
import top_velReducer from './topic_velReducer'
import top_odomReducer from './topic_odomReducer'
import rosReducer from './rosReducer'
import connectionReducer from './connectionReducer'
import xReducer from './xReducer'
import yReducer from './yReducer'

const rootReducer = combineReducers({
    ipID: ipReducer,
    portID: portReducer,
    vrefID: vReducer,
    wrefID: wReducer,
    top_velID: top_velReducer,
    top_odomID: top_odomReducer,
    rosID: rosReducer,
    rosconID: connectionReducer,
    x: xReducer,
    y: yReducer,
})

export default rootReducer