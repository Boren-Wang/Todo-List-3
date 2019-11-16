import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item, todoList } = this.props;  
        return (
            // <div className="card z-depth-0 todo-list-link pink-lighten-3">
            //     <div className="card-content grey-text text-darken-3">
            //         <span className="card-title">{item.description}</span>
            //     </div>
            // </div>
            <div>
            <div className="card">
                <div class="card-content black-text">
                    <span className="card-title"><strong>{this.props.item.description}</strong></span>
                    <div className="container" id="card_container">
                        <div className='list_item_card_assigned_to'>
                            Assigned To: <strong>{this.props.item.assigned_to}</strong>
                        </div>
                        <div className='list_item_card_due_date'>
                            {this.props.item.due_date}
                        </div>
                        <div className={this.props.item.completed ? "list_item_card_completed" : "list_item_card_not_completed"}>
                            {this.props.item.completed ? "Completed" : "Pending"}
                        </div>
                    </div>
                </div>
                {/* <div class="card-action">
                    <a href={"/todoList/"+todoList.id+"/item/"+item.id}>Edit</a>
                </div> */}
            </div>
            {/* <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.item.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.item.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.item.due_date}
                </div>
                <div className={this.props.item.completed ? "list_item_card_completed" : "list_item_card_not_completed"}>
                    {this.props.item.completed ? "Completed" : "Pending"}
                </div>
            </div> */}
            </div>
        );
    }
}
export default ItemCard;