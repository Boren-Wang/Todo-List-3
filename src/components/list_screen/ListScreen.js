import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js';
import { firestoreConnect } from 'react-redux-firebase';
import {editHandler, deleteHandler} from '../../store/database/asynchHandler'
import { Modal, Button } from 'react-materialize';
import add from "../../images/AddItem.png"


// dispatch -> asyncHandler -> action -> reducer
class ListScreen extends Component {
    state = {
        todoList: this.props.todoList
    }

    handleChange = (e) => {
        const { target } = e;
        console.log("state.todoList", this.state.todoList)
        this.setState(state => {
            let todoList = state.todoList
            todoList[target.id] = target.value
            todoList["editAt"] = new Date()
            return {
                todoList
            }
        }, ()=>this.props.editTodoList(this.state.todoList));
    }

    handleCreateItem = () => {
        this.props.history.push("/todoList/"+this.props.todoList.id+"/item/")
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
            return <React.Fragment />
        // const trigger = <Button id="list_trash">Delete</Button>;
        const trigger = <div id="list_trash">&#128465;</div>
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={this.props.todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={this.props.todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
                <Modal 
                    header="Delete the list?" 
                    trigger={trigger} 
                    actions={
                        <div>
                            <Button className="red" onClick={ () => { this.props.deleteTodoList(todoList); this.props.history.push('/')} }>Yes</Button>
                            <Button modal="close" >No</Button>
                            {/* this.props.deleteTodoList(todoList) */}
                        </div>
                    }
                >
                    <p><strong>Are you sure to delete this list?</strong></p>
                    <p>The list will not be retrivable.</p>
                </Modal>
                <div className="list_item_add_card">
                    <img id="list_item_add_card" src={add} onClick={todoList=>{this.handleCreateItem(todoList)}}></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data; // todoLists is a map/object from id to todoList, not a array
    const todoList = todoLists ? todoLists[id] : null;
//   console.log(todoLists)
//   console.log(todoLists[id])
    if(todoList) {
        todoList.id = id;
    }

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
    editTodoList: (todoList) => dispatch(editHandler(todoList)),
    deleteTodoList: (todoList) => dispatch(deleteHandler(todoList))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);