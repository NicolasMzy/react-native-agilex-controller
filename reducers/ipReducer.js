export default (state = 'ws://192.168.8.172:9090', action) => {
    switch(action.type){
        case 'ip_master':
            return action.payload
        default:
            return state
    }
}