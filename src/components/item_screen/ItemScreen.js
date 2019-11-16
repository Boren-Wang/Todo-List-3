import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {createItemHandler, editItemHandler} from "../../store/database/asynchHandler"
import {Icon, DatePicker} from 'react-materialize'

class ItemScreen extends Component {
    constructor(props) {
        super(props)
        this.state={
            id: this.props.todoItem.id,
            key: this.props.todoItem.key,
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
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div id="todo_item">
                <div id="item_heading"><h3>Item</h3></div>
                <div id="item_form_container">
                    {/* <input id="item_description_textfield" name="description" className="item_input" type="text" value={this.state.description} onChange={this.handleChangeInput}></input>
                    <label for="item_description_textfield" id="item_description_prompt" className="item_prompt">Description:</label> */}

                    
                    {/* <input id="item_assigned_to_textfield" name="assigned_to" className="item_input" type="text" value={this.state.assigned_to} onChange={this.handleChangeInput}></input>
                    <label id="item_assigned_to_prompt" className="item_prompt">Assigned To:</label> */}

                    
                    {/* <input id="item_due_date_picker" name="due_date" className="item_input" type="date" value={this.state.due_date} onChange={this.handleChangeInput}></input>
                    <label id="item_due_date_prompt" className="item_prompt">Due Date:</label> */}

                    <div className="input-field">
                        <i class="material-icons prefix">description</i>
                        <input id="item_description_textfield" name="description" className="item_input" type="text" value={this.state.description} onChange={this.handleChangeInput}></input>
                        <label for="item_description_textfield" id="item_description_prompt" className="item_prompt active">Description</label>
                    </div>

                    <div className="input-field">
                        <i class="material-icons prefix">account_circle</i>
                        <input id="item_assigned_to_textfield" name="assigned_to" className="item_input" type="text" value={this.state.assigned_to} onChange={this.handleChangeInput}></input>
                        <label id="item_assigned_to_prompt" className="item_prompt active">Assigned To</label>
                    </div>

                    <div className="input-field">
                        <i class="material-icons prefix">date_range</i>
                        <input type="date" class="datepicker" name="due_date" id="due_date" value={this.state.due_date} onChange={this.handleChangeInput}></input>
                        {/* <DatePicker icon={<Icon>date_range</Icon>} name="due_date" id="due_date" value={this.state.due_date} onChange={(newDate) => this.handleChangeInput({target: {name: "due_date", value: newDate, type: "date"}})}/> */}
                        <label for="due_date" className="active">Due Date</label>
                    </div>

                    <div className="input-field">
                        <p>
                        <label>
                            <input type="checkbox" className="filled-in" checked={this.state.completed} onChange={this.handleChangeInput}/>
                            <span>Completed</span>
                        </label>
                        </p>
                    </div>
                    
                    <div className="input-field center">
                    <button className="btn red lighten-1" onClick={()=>this.handleSubmit()}>Submit</button>
                    {/* <i className="material-icons right">send</i> */}
                    </div>
                    
                    <div className="input-field center">
                    <button className="btn" onClick={() => this.props.history.goBack()}>Cancel</button>
                    {/* <i className="material-icons right">cancel</i> */}
                    </div>
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
    let newItem
    let isNewItem;
    if(todoList) {
        newItem = {
            id: todoList.items.length>0 ? todoList.items[todoList.items.length-1].id+1 : 0,
            key: todoList.items.length>0 ? todoList.items[todoList.items.length-1].id+1 : 0,
            description: "",
            assigned_to: "",
            due_date: "",
            completed: ""
        }

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