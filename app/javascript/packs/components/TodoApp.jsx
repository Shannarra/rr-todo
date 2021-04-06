import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import TodoItem from './Todos/Item';
import TodoItems from "./Todos/Items";
import TodoForm from "./Todos/Form";

class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hideCompletedItems: false,
        };

        this.getItems = this.getItems.bind(this);
        this.createItem = this.createItem.bind(this);
        this.toggleCompletedTodos = this.toggleCompletedTodos.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        axios
            .get("/api/v1/todo_items/")
            .then(response => {
                const items = response.data;
                this.setState({items});
            })
            .catch(err => {
                console.error("API ERROR: " + err.message);
            });
    }

    createItem(item) {
        const items = [item, ...this.state.items];
        this.setState({items})
    }

    toggleCompletedTodos() {
        this.setState({hideCompletedItems: !this.state.hideCompletedItems})
    }

    render() {
        return (
            <React.Fragment>
                <TodoForm createItem={this.createItem} />
                <TodoItems isGoingToToggleCompletedItems={this.state.hideCompletedItems} toggleCompletedItems={this.toggleCompletedTodos}>
                    {this.state.items.map(item => (<TodoItem key={item.id} todoItem={item} getTodoItems={this.getItems} hideCompletedItem={this.state.hideCompletedItems} />))}
                </TodoItems>
            </React.Fragment>
        );
    }
}


export default TodoApp;

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('todo-app');
    app && ReactDOM.render(<TodoApp />, app);
})