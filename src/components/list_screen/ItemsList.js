import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom'
import { Button, Icon } from 'react-materialize';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        // console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <div>
                            <Link to={"/todoList/"+todoList.id+"/item/"+item.id}>
                                <ItemCard todoList={todoList} listItem={item} />
                            </Link>
                            <Button
                                floating
                                fab={{direction: 'left'}}
                                className="red"
                                small
                                style={{position: 'relative', textAlign: "right"}}
                            >
                                <Button small floating icon={<Icon />} className="red" style={{margin: "0px"}}/>
                                <Button small floating icon={<Icon />} className="yellow darken-1" style={{margin: "0px"}}/>
                                <Button small floating icon={<Icon />} className="green" style={{margin: "0px"}}/>
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);