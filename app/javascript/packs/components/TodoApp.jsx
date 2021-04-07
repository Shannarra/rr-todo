import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

import TodoItem from './Todos/Item';
import TodoItems from "./Todos/Items";
import TodoForm from "./Todos/Form";

import Spinner from "./Spinner";
import Error from "./Error";

class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hideCompletedItems: false,
            loading: true,
            error: null
        };

        this.getItems = this.getItems.bind(this);
        this.createItem = this.createItem.bind(this);
        this.toggleCompletedTodos = this.toggleCompletedTodos.bind(this);

        this.errorHandler = this.errorHandler.bind(this);
        this.errorClearer = this.errorClearer.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        axios
            .get("/api/v1/todo_items/")
            .then(response => {
                this.setState({loading: true})
                const items = response.data;
                this.setState({items});
                this.setState({loading: false})
                this.errorClearer();
            })
            .catch(err => {
                this.setState({loading: true})
                this.errorHandler(err)
                this.setState({error:  {
                        message: "There was an error fetching your items."
                    }})
            });
    }


    createItem(item) {
        const items = [item, ...this.state.items];
        this.setState({items})
    }

    toggleCompletedTodos() {
        this.setState({hideCompletedItems: !this.state.hideCompletedItems})
    }

    errorHandler(error) {
        this.setState({error});
    }

    errorClearer() {
        this.setState({error: null})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.error && <Error error={this.state.error} /> }

                {this.state.loading
                    ? <Spinner />
                    :<React.Fragment>
                        <TodoForm createItem={this.createItem} errorHandler={this.errorHandler} errorClearer={this.errorClearer} />
                        <TodoItems isGoingToToggleCompletedItems={this.state.hideCompletedItems} toggleCompletedItems={this.toggleCompletedTodos}>
                            {this.state.items.map(item => (
                                <TodoItem
                                    key={item.id}
                                    todoItem={item}
                                    getTodoItems={this.getItems}
                                    hideCompletedItem={this.state.hideCompletedItems}
                                    errorHandler={this.errorHandler}
                                    errorClearer={this.errorClearer} />
                            ))}
                        </TodoItems>
                    </React.Fragment>}
            </React.Fragment>


        );
    }
}


export default TodoApp;

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('todo-app');
    app && ReactDOM.render(<TodoApp />, app);
})