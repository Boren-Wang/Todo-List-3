import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import {editHandler} from "../../store/database/asynchHandler"
import { firestoreConnect } from 'react-redux-firebase';

class TodoListLinks extends React.Component {
    constructor() {
        super()
        this.state = {
            // todoLists: this.props.todoLists,
            // isLoading: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(todoList) {
        const newTodoList = {
            ...todoList,
            editedAt: new Date()
        }
        this.props.editTodoList(newTodoList)
    }

    render() {
        let todoLists = this.props.todoLists;
        if(todoLists){
            console.log(todoLists)
            // todoLists = todoLists.filter((list, index) => todoLists.indexOf(list)===index)
            // todoLists = [...new Set(todoLists)]
            for(let i=0; i<todoLists.length; i++){
                let id = todoLists[i].id
                for(let j=i+1; j<todoLists.length; j++){
                    if(todoLists[j].id === id){
                        todoLists.splice(j, 1)
                        j--;
                    }
                }
            }
            console.log("Filtered todoLists", todoLists)
        }
        

        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={()=>this.handleClick(todoList)}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    editTodoList: (todoList) => dispatch(editHandler(todoList))
})

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect([
//         { collection: 'todoLists', orderBy: ["editedAt", 'desc'] }
//     ])
// )(TodoListLinks);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists', orderBy: ["editedAt", 'desc']}
    ])
)(TodoListLinks);