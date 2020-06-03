export const state = () => ({
    me: null,
    followerList: [],
    followingList: [],
    hasMoreFollower: true,
    hasMoreFollowing: true,
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

export const mutations = {
    // mutations는 비동기 작업이 있으면 안됨 setTimeout, Promise, ajax, axios 등 금지
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    },
    // removeFollow(state, payload) {
    //     if (payload.followDis === 1) {
    //         const index = state.followingList.findIndex(v => v.email === payload.email);
    //         state.followingList.splice(index, 1);
    //     } else if (payload.followDis === 2) {
    //         const index = state.followerList.findIndex(v => v.email === payload.email);
    //         state.followerList.splice(index, 1);
    //     }
    // },
    addFollower(state, payload) {
        state.followerList.push(payload);
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },
    removeFollowing(state, payload){
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },
    loadFollowings(state) {
        const diff = totalFollowings - state.followingList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000),
        }));
        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit;
    },
    loadFollowers(state) {
        const diff = totalFollowers - state.followerList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000),
        }));
        state.followerList = state.followerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit;
    },
};

export const actions = {
  // 비동기 작업
    signUp({ commit, state }, payload) {
        this.$axios.post('http://localhost:3085/user', {
            email: payload.email,
            nickname: payload.nickname,
            password: payload.password,
        });
        commit('setMe', payload);
    },
    logIn({ commit }, payload) {
        commit('setMe', payload);
    },
    logOut({ commit }, payload) {
        commit('setMe', null);
    },
    changeNickname({ commit }, payload) {
        commit('changeNickname', payload);
    },
    // removeFollow({ commit }, payload) {
    //     commit('removeFollow', payload);
    // }
    addFollower({ commit }, payload) {
        commit('addFollower', payload);
    },
    addFollowing({ commit }, payload) {
        commit('addFollowing', payload);
    },
    removeFollower({ commit }, payload) {
        commit('removeFollower', payload);
    },
    removeFollowing({ commit }, payload) {
        commit('removeFollowing', payload);
    },
    loadFollowers({ commit, state }, payload) {
        if(state.hasMoreFollower) {
            commit('loadFollowers', payload)
        }
    },
    loadFollowings({ commit, state }, payload) {
        if(state.hasMoreFollowing) {
            commit('loadFollowings', payload)
        }
    },
};
