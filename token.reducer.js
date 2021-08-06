export default function(token='', action) {
    if(action.type == 'saveToken') {
        console.log("hello from store token", action.token)
        return action.token;
    } else {
        return token;
    }
}