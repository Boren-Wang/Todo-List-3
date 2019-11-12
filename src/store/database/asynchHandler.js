import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((error) => {
      dispatch({ type: 'LOGIN_ERROR', error });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess());
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess());
    }).catch((error) => {
        // console.log(error)
        dispatch(actionCreators.registerError(error));
    });
};

export const createHandler = (todoList) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      // make async call to database
      const firestore = getFirestore()
      const profile = getState().firebase.profile
      const authorId = getState().firebase.auth.uid
      console.log(getState())
      firestore.collection('todoLists').add({
        ...todoList,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId
      })
          .then(() => dispatch({type: "CREATE_LIST", todoList}))
          .catch(err => dispatch({type: "CREATE_LIST_ERROR", err}))
  }
}