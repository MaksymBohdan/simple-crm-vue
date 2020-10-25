/* eslint-disable operator-linebreak */
import firebase from 'firebase/app';

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid');
        await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');

        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once('value')
          ).val() || {};

        const modifiedRecords = Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));

        return modifiedRecords;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
