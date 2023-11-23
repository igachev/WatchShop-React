
export function isLoading(state) {
    if(state.spinner.isLoading) {
        return true;
    }
    return false;
}