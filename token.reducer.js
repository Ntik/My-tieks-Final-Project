export default function (token = '', action) {
    if (action.type === 'saveToken') {
        console.log('token from store', action.tokenUser)
        return action.token;
    } else {
        return token
    }
}