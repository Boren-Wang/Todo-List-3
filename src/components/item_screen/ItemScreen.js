import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {createItemHandler, editItemHandler} from "../../store/database/asynchHandler"

class ItemScreen extends Component {
    constructor(props) {
        super(props)
        this.state={
            description: this.props.todoItem.description,
            assigned_to: this.props.todoItem.assigned_to,
            due_date: this.props.todoItem.due_date,
            completed: this.props.todoItem.completed
        }
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeInput(event) {
        const{name, value, type} = event.target
        if(type==="checkbox"){
            this.setState(prevState => ({
                ...prevState,
                completed: !prevState.completed
            }))
        } else {
            this.setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    handleSubmit() {
        const newItem = {
            ...this.props.todoItem,
            ...this.state
        }
        if(!this.props.isNewItem){
            this.props.editItem(this.props.todoList, newItem)
        } else {
            this.props.createItem(this.props.todoList, newItem)
        }
        this.props.history.goBack()
    }

    render() {
        return (
            <div id="todo_item">
                <div id="item_heading">Item</div>
                <div id="item_form_container">
                    <label id="item_description_prompt" className="item_prompt">Description:</label>
                    <input id="item_description_textfield" name="description" className="item_input" type="text" value={this.state.description} onChange={this.handleChangeInput}></input>

                    <label id="item_assigned_to_prompt" className="item_prompt">Assigned To:</label>
                    <input id="item_assigned_to_textfield" name="assigned_to" className="item_input" type="text" value={this.state.assigned_to} onChange={this.handleChangeInput}></input>

                    <label id="item_due_date_prompt" className="item_prompt">Due Date:</label>
                    <input id="item_due_date_picker" name="due_date" className="item_input" type="date" value={this.state.due_date} onChange={this.handleChangeInput}></input>

                    <label id="item_completed_prompt" className="item_prompt">Completed:</label>
                    <div id="item_completed_checkbox_wrapper" className="item_input">
                        <input id="item_completed_checkbox" name="completed" type="checkbox" checked={this.state.completed} onChange={this.handleChangeInput}></input>
                    </div>

                    <button id="item_form_submit_button btn" onClick={()=>this.handleSubmit()}>Submit</button>
                    <button id="item_form_cancel_button btn" onClick={() => this.props.history.goBack()}>Cancel</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id, itemId } = ownProps.match.params;
    const { todoLists } = state.firestore.data; // todoLists is a map/object from id to todoList, not a array
    const todoList = todoLists ? todoLists[id] : null;
    let todoItem
    let newItem = {
        id: todoList.items.length>0 ? todoList.items[todoList.items.length-1].id+1 : 0,
        key: todoList.items.length>0 ? todoList.items[todoList.items.length-1].id+1 : 0,
        description: "",
        assigned_to: "",
        due_date: "",
        completed: ""
    }
    let isNewItem;
    if(todoList) {
        todoList.id = id;
        // todoItem = itemId ? todoList.items[itemId] : newItem 
        if(itemId) {
            // console.log(todoList.items[0].id, itemId)
            todoItem = todoList.items.filter((item) => {return item.id==itemId})[0]
            isNewItem = false
        } else {
            todoItem = newItem
            isNewItem = true
        }
    }
    return {
        todoList,
        todoItem,
        isNewItem,
        auth: state.firebase.auth,
    };
}

const mapDispatchToProps = dispatch => ({
    createItem: (todoList, newItem) => dispatch(createItemHandler(todoList, newItem)),
    editItem: (todoList, newItem) => dispatch(editItemHandler(todoList, newItem))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);