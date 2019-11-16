import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom'
import { Button, Icon } from 'react-materialize';
import {deleteItemHandler, move} from '../../store/database/asynchHandler'

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const {props} = this
        // console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item, index) {
                    let upClassName = ""
                    let downClassName = ""
                    if(index===0 && index === items.length-1) {
                        upClassName = " disabled"
                        downClassName = " disabled"
                    } else if(index===0) {
                        upClassName = " disabled"
                    } else if(index === items.length-1) {
                        downClassName = " disabled"
                    }

                    if(item===null) return
                    item.id = item.key;
                    return (
                        <div>
                            <Link to={"/todoList/"+todoList.id+"/item/"+item.id}>
                                <ItemCard todoList={todoList} item={item} />
                            </Link>
                            <Button
                                floating
                                fab={{direction: 'left'}}
                                className="pink halfway pulse"
                                small
                                style={{position: 'relative', textAlign: "right"}}
                            >
                                <Button onClick={()=>props.move(todoList, item, 'up')} small floating icon={<Icon>arrow_upward</Icon>} className={"green"+upClassName} style={{margin: "0px"}}/>
                                <Button onClick={()=>props.move(todoList, item, 'down')} small floating icon={<Icon>arrow_downward</Icon>} className={"yellow darken-1"+downClassName} style={{margin: "0px"}}/>
                                <Button small floating icon={<Icon>cancel</Icon>} className="red" style={{margin: "0px"}} onClick={()=>props.deleteTodoList(todoList, item)}/>
                            </Button>
                        </div>
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteTodoList: (todoList, item) => dispatch(deleteItemHandler(todoList, item)),
    move: (todoList, item, criterion) => dispatch(move(todoList, item, criterion))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);