
export function isAuthenticated(state) {
    
    if(state.auth.auth.accessToken) {
        return true;
    }
    return false;
}