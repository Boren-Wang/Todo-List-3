const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case "CREATE_LIST":
            console.log("create list", action.newTodoList) 
            return state
        case "CREATE_LIST_ERROR":
            console.log("create list error", action.error)
            return state
        case "EDIT_LIST":
            console.log("edit list", action.todoList) 
            return state
        case "EDIT_LIST_ERROR":
            console.log("edit list error", action.error)
            return state
        case "DELETE_LIST":
            console.log("delete list", action.todoList) 
            return state
        case "DELETE_LIST_ERROR":
            console.log("delete item error", action.error)
            return state
        case "CREATE_ITEM":
            console.log("create item", action.newItem) 
            return state
        case "CREATE_ITEM_ERROR":
            console.log("create item error", action.error)
            return state
        case "EDIT_ITEM":
            console.log("edit item", action.newItem) 
            return state
        case "EDIT_ITEM_ERROR":
            console.log("edit item error", action.error)
            return state
        case "DELETE_ITEM":
            console.log("delete item", action.item) 
            return state
        case "DELETE_ITEM_ERROR":
            console.log("delete item error", action.error)
            return state
        case "MOVE":
            return state
        case "MOVE_ITEM_ERROR":
            console.log(action.error)
            return state
        case "SORT_ITEM":
            return state
        case "SORT_ITEM_ERROR":
            console.log(action.error)
            return state
        default:
            return state
    }
}

export default todoListReducer;