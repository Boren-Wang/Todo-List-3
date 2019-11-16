import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
// import {createHandler} from '../../store/database/asynchHandler'

class HomeScreen extends Component {
    // handleCreate() {
    //     const newList = {
    //         "name": "Unknown",
    //         "owner": "Unknown",
    //         "items": [],
    //         // "authorFirstName": "",
    //         // "authorLastName": "",
    //         // "authorId": "",
    //         "editedAt": new Date()
    //     }
    //     this.props.createTodoList(newList)
    //     this.props.history.push()
    // }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks todoLists={this.props.todoLists}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                {/* <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button> */}
                                <button className="home_new_list_button">
                                    <NavLink to="/create" className="link">Create a New To Do List</NavLink>
                                    {/* Create a New To Do List */}
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth
    };
};

// const mapDispatchToProps = dispatch => ({
//     createTodoList: (todoList) => dispatch(createHandler(todoList))
// })

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//       { collection: 'todoLists'},
//     ]),
// )(HomeScreen);

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists', orderBy: ["editedAt", 'desc']}
    ])
)(HomeScreen);