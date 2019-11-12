const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case "CREATE_LIST":
            console.log("create list", action.todoList) 
            return state
        case "CREATE_LIST_ERROR":
            console.log("create list error", action.error)
            return state
        default:
            return state
    }
}

export default todoListReducer;