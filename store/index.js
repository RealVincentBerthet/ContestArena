export const state = () => ({
    year_in_use: "2023",
    years: ["2023"],
    event_in_use: "MissFrance",
    events: ["MissFrance", "Eurovision"],
    player: "",
    player_mail: "",
    player_uid: "",
    players: [],
    watch_as: "",
    is_admin: false,
    admins: ["Sissou"],
    round_in_use: 0,
    round_in_use_max: 15,
    rounds: [
        {
            "name": "Top 15",
            "points": 1,
            "max": 15,
            "pool": [

            ],
            "qualified": []
        },
        {
            "name": "Top 5",
            "points": 3,
            "max": 5,
            "pool": [],
            "qualified": []
        },
        {
            "name": "Top 1",
            "points": 5,
            "max": 1,
            "pool": [],
            "qualified": []
        }
    ],
    candidates: {},
    pool_for_this_round: [],
    likes_for_this_round: [],
    qualified_for_this_round: [],
    tab_in_use: "choices",
    tabs: ["choices", "ranking", "rules", "admin"]
})

export const mutations = {
    setYear(state, year) {
        if (state.years.includes(year)) {
            state.year_in_use = year
        } else {
            console.error(year + " cannot be set, valid values are [" + state.years + "]")
        }
    },
    setYears(state, years) {
        state.years = years;
    },
    setEvent(state, event) {
        if (state.events.includes(event)) {
            state.event_in_use = event
        } else {
            console.error(event + " cannot be set, valid values are [" + state.events + "]")
        }
    },
    setEvents(state, events) {
        state.events = events;
    },
    setPlayer(state, player) {
        state.player = player
    },
    setPlayerMail(state, player_mail) {
        state.player_mail = player_mail
    },
    setPlayerUid(state, player_uid) {
        state.player_uid = player_uid
    },
    setPlayers(state, players) {
        state.players = players
    },
    setWatchAs(state, player) {
        state.watch_as = player
    },
    setAdmin(state, admin) {
        const type_allowed = "boolean"
        if (typeof (admin) === type_allowed) {
            state.is_admin = admin
        } else {
            console.error(admin + " is not a " + type_allowed)
        }

    },
    setAdmins(state, admins) {
        state.admins = admins
    },
    setRound(state, round) {
        if (round >= 0 && round <= state.rounds.length) {
            state.round_in_use = round
        } else {
            console.error(round + " cannot be set, valid values are [" + state.rounds + "]")
        }
    },
    setRoundMax(state, round_max) {
        state.round_in_use_max = round_max;
    },
    setRounds(state, rounds) {
        state.rounds = rounds;
    },
    setCandidates(state, candidates) {
        state.candidates = candidates
    },
    setPool(state, pool) {
        state.pool_for_this_round = pool
    },
    setLikes(state, likes) {
        state.likes_for_this_round = likes
    },
    setQualified(state, qualified) {
        state.qualified_for_this_round = qualified
    },
    setTab(state, tab) {
        if (state.tabs.includes(tab)) {
            state.tab_in_use = tab
        } else {
            console.error(tab + " cannot be set, valid values are [" + state.tabs + "]")
        }

    },
}

export const getters = {
    getYear(state) {
        return state.year_in_use
    },
    getYears(state) {
        return state.years
    },
    getEvent(state) {
        return state.event_in_use
    },
    getEvents(state) {
        return state.events
    },
    getPlayer(state) {
        return state.player
    },
    getPlayerMail(state) {
        return state.player_mail
    },
    getPlayerUid(state) {
        return state.player_uid
    },
    getPlayers(state) {
        return state.players
    },
    getWatchAs(state) {
        return state.watch_as
    },
    isAdmin(state) {
        return state.is_admin
    },
    getAdmins(state) {
        return state.admins
    },
    getRound(state) {
        return state.round_in_use
    },
    getRoundMax(state) {
        return state.round_in_use_max
    },
    getRounds(state) {
        return state.rounds
    },
    getCandidates(state) {
        return state.candidates
    },
    getPool(state) {
        return state.pool_for_this_round
    },
    getLikes(state) {
        return state.likes_for_this_round
    },
    getQualified(state) {
        return state.qualified_for_this_round
    },
    getTab(state) {
        return state.tab_in_use
    },
    getTabs(state) {
        return state.tabs
    }

}

export const actions = {
    async setYear({ commit, state }, value) {
        value = value == undefined ? state.years.at(-1) : value;
        commit("setYear", value);
    },
    async setPlayers({ commit, state }, value) {
        commit("setPlayers", value);
    },

    async toggleAdmin({ commit, state }, value) {
        if (state.admins.includes(value)) {
            commit("setAdmin", !state.is_admin)
            commit("setWatchAs", "")
        } else {
            console.error(value + " cannot be set, valid values are [" + state.admins + "]")
        }
    },
    async setRound({ commit, state }, value) {
        commit("setRound", value);
    },
    async setRounds({ commit, state }, value) {
        commit("setRounds", value);
    },
    async setRoundMax({ commit, state }, value) {
        commit("setRoundMax", value);
    },
    async setCandidates({ commit, state }, value) {
        value = value == undefined ? {} : value;
        commit("setCandidates", value);
    },
    async setPool({ commit, state }, value) {
        value = value == undefined ? [] : value;
        commit("setPool", value);
    },
    async setLikes({ commit, state }, value) {
        value = value == undefined ? [] : value;
        commit("setLikes", value);
    },
    async setQualified({ commit, state }, value) {
        value = value == undefined ? [] : value;
        commit("setQualified", value);
    },
    async setTab({ commit, state }, value) {
        commit("setTab", value);
    },
    async setWatchAs({ commit, state }, value) {
        commit("setWatchAs", value)
    },
    async autoSignIn({ commit }, payload) {
        console.log("signin")
        //commit('setUser', payload)
    },
    async setPlayer({ commit, state }, value) {
        commit(value)
    }
} 