import React from 'react';
import moment from 'moment'
class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        // console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-1 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title"><strong>{todoList.name}</strong></span>
                    <div><span>{ moment(todoList.editedAt.toDate()).calendar() }</span></div>
                </div>
            </div>
        );
    }
}
export default TodoListCard;