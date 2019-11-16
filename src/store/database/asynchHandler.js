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
      // const profile = getState().firebase.profile
      // const authorId = getState().firebase.auth.uid
      const newTodoList = {
        ...todoList,
        // authorFirstName: profile.firstName,
        // authorLastName: profile.lastName,
        // authorId: authorId
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
    todoList.items.push(newItem)
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "CREATE_ITEM", newItem}) )
      .catch(error => dispatch({type: "CREATE_ITEM_ERROR", error}))
  }
}

export const editItemHandler = (todoList, newItem) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // todoList.items[newItem.id] = newItem
    let index = todoList.items.indexOf(todoList.items.filter(item => newItem.id == item.id)[0])
    todoList.items[index] = newItem
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "EDIT_ITEM", newItem}) )
      .catch(error => dispatch({type: "EDIT_ITEM_ERROR", error}))
  }
}

export const deleteItemHandler = (todoList, item) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // todoList.items[item.id] = null
    todoList.items = todoList.items.filter((i)=>i.id!==item.id) 
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "DELETE_ITEM", item}) )
      .catch(error => dispatch({type: "DELETE_ITEM_ERROR", error}))
  }
}

export const move = (todoList, newItem, criterion) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    let index = todoList.items.indexOf(todoList.items.filter(item => newItem.id == item.id)[0])
    if(criterion==="up"){
      swap(todoList.items, index, index-1)
    } else {
      swap(todoList.items, index, index+1)
    }
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "MOVE"}) )
      .catch(error => dispatch({type: "MOVE_ERROR", error}))
  }
}

const swap = (array, i, j) => {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

export const sort = (todoList, criterion, sorted) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    let compare;
    if(criterion==='task') compare = byTask
    else if(criterion==='due_date') compare = byDueDate
    else compare = byStatus
    todoList.items.sort((item1, item2)=>compare(item1, item2, sorted))
    const firestore = getFirestore()
    firestore.collection('todoLists').doc(todoList.id).update(todoList)
      .then(()=> dispatch({type: "SORT"}) )
      .catch(error => dispatch({type: "SORT_ERROR", error}))
  }
}

const byTask = (item1, item2, sorted)=>{
  let result;
  if(item1.description<item2.description) result = -1
  else if(item1.description===item2.description) result = 0
  else result = 1

  if(sorted) return -result
  else return result
}

const byDueDate = (item1, item2, sorted)=>{
  let result;
  if(item1.due_date<item2.due_date) result = -1
  else if(item1.due_date===item2.due_date) result = 0
  else result = 1

  if(sorted) return -result
  else return result
}

const byStatus = (item1, item2, sorted)=>{
  let result;
  if(item1.completed<item2.completed) result = -1
  else if(item1.completed===item2.completed) result = 0
  else result = 1

  if(sorted) return -result
  else return result
}

