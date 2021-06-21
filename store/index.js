export const state = () => ({
    uiMode: "light",
    userToken: null,
    userData: null,
    userRoles: null
});

export const mutations = {
    SET_MODE(state, uiMode) {
        state.uiMode = uiMode;
    },
    SET_USER(state, userResponse) {
        state.userToken = userResponse.token;
        state.userData = userResponse.userData;
        state.userRoles = userResponse.roles;
    }
}

export const actions = {
    refreshUser(context, userResponse) {
        context.commit('SET_USER', userResponse);
    },
    setMode(context, uiMode) {
        context.commit('SET_MODE', uiMode);
    }
}