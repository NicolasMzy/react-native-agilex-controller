export default (state = 0, action) => {
    switch(action.type){
        case 'x':
            return action.payload
        default:
            return state
    }
}