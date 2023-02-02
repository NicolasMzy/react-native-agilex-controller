export default (state = 0, action) => {
    switch(action.type){
        case 'y':
            return action.payload
        default:
            return state
    }
}