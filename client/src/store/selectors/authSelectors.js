
export function isAuthenticated(state) {
    
    if(state.auth.auth.accessToken) {
        return true;
    }
    return false;
}

export function isAdmin(state) {
    if(state.auth.auth.isOwner) {
        return true;
    }
    return false;
}