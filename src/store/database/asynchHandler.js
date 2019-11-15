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
      const newTodoList = {
        ...todoList,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId
      }
      firestore.collection('todoLists').add(newTodoList)
        .then(() => dispatch({type: "CREATE_LIST", newTodoList}))
        .catch(error => dispatch({type: "CREATE_LIST_ERROR", error}))
  }
}

export const editHandler = (todoList) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore()
      firestore.collection('todoLists').doc(todoList.id).update(todoList)
        .then(()=> dispatch({type: "EDIT_LIST", todoList}) )
        .catch(error => dispatch({type: "EDIT_LIST_ERROR", error}))
  }
}

export const deleteHandler = (todoList) => {
  console.log("Deleting!")
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).delete()
      .then(()=> dispatch({type: "DELETE_LIST", todoList}) )
      .catch(error => dispatch({type: "DELETE_LIST_ERROR", error}))
    
  }
}

export const createItemHandler = (todoList, newItem) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    console.log(todoList, newItem)
    todoList.items.push(newItem)
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "CREATE_ITEM", newItem}) )
      .catch(error => dispatch({type: "CREATE_ITEM_ERROR", error}))
  }
}

export const editItemHandler = (todoList, newItem) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // todoList.items[newItem.itemId] = newItem

    // let index = todoList.items.indexOf(todoList.items.filter(item => newItem.itemId == item.id)[0])
    // todoList.items[index] = newItem

    todoList.items[newItem.id] = newItem
    console.log(todoList)
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "EDIT_ITEM", newItem}) )
      .catch(error => dispatch({type: "EDIT_ITEM_ERROR", error}))
  }
}

