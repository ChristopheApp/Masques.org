export default function (user = {}, action) {

    if (action.type === 'addUser') {

        return action.user;

    } else if (action.type === 'deleteUser') {
        let resetUser = {};
        return resetUser;
    } else {
        return user;
    }
}