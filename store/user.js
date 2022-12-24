export const state = () => ({
    pseudo: "",
    country: "",
})

export const mutations = {
    setUser(state, data) {
        state.pseudo = data.pseudo != null ? data.pseudo : "";
        state.country = data.country != null ? data.country : "";
    },
}

export const getters = {
    pseudo: state => state.pseudo,
    country: state => state.country,
    getUser(state) {
        return {pseudo:state.pseudo, country:state.country}
    },
}