export const state = () => ({
    me: null,
    followerList: [
        {
            email: 'abcd@email.com',
            nickname: '짱구'
        },
        {
            email: 'efgh@email.com',
            nickname: '철수'
        },
        {
            email: 'ijkl@email.com',
            nickname: '맹구'
        }
    ],
    followingList: [
        {
            email: 'abcd@naver.com',
            nickname: '진돌이'
        },
        {
            email: 'efgh@naver.com',
            nickname: '갑순이'
        },
        {
            email: 'ijkl@naver.com',
            nickname: '갑돌이'
        }
    ],
});

export const mutations = {
    // mutations는 비동기 작업이 있으면 안됨 setTimeout, Promise, ajax, axios 등 금지
    setMe(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    },
    removeFollow(state, payload) {
        if (payload.followDis === 1) {
            const index = state.followingList.findIndex(v => v.email === payload.email);
            state.followingList.splice(index, 1);
        } else if (payload.followDis === 2) {
            const index = state.followerList.findIndex(v => v.email === payload.email);
            state.followerList.splice(index, 1);
        }
    },
};

export const actions = {
  // 비동기 작업
    signUp({ commit, dispatch, state, rootState, getters, rootGetters }, payload) {
        // rootState, rootGetters 는 모듈 vuex 시스템의 index state 와 getters를 가리킴
        // Server에 회원가입 요청을 보내는 부분
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
    removeFollow({ commit }, payload) {
        commit('removeFollow', payload);
    }
};
