import React from "react";
import PropTypes from 'prop-types';
import setAxiosHeaders from "../Headers";
import axios from "axios";
import _ from 'lodash';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            complete: this.props.todoItem.complete,
        };

        this.destroyHandler = this.destroyHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.completeUpdateHandler = this.completeUpdateHandler.bind(this);

        this.titleRef = React.createRef();
        this.bodyRef = React.createRef();
        this.completeRef = React.createRef();


        this.itemPath = `/api/v1/todo_items/${this.props.todoItem.id}`;
    }

    destroyHandler(e) {
        e.preventDefault();

        setAxiosHeaders();

        if (confirm(`Are you sure you want to delete \"${this.props.todoItem.title}\" ?`)) {
            axios
                .delete(this.itemPath)
                .then(_ => this.props.getTodoItems())
                .catch(err => console.error(`Deletion error: ${err}`));
        }
    }

    changeHandler() {
        this.setState({complete: this.completeRef.current.checked});
        this.completeUpdateHandler();
    }

    // https://lodash.com/docs/#debounce
    completeUpdateHandler = _.debounce(() => {
        setAxiosHeaders();

        axios
            .put(this.itemPath, {
                todo_item: {
                    title: this.titleRef.current.value,
                    body: this.bodyRef.current.value,
                    complete: this.completeRef.current.checked,
                }
            })
            .then(_ => this.props.errorClearer())
            .catch(err => {
                console.error(`Update error: ${err.message}`)
                this.props.errorHandler(err)
            });
    });


    render() {

        const { todoItem } = this.props;

        return (
            <React.Fragment>
                <tr className={`${ this.state.complete && this.props.hideCompletedItem ? `d-none` : "" } ${this.state.complete ? "table-light" : ""}`}>
                    <td> {/* stolen */}
                        <svg
                            className={`bi bi-check-circle ${this.state.complete ? `text-success` : `text-muted`}`}
                            width="2em"
                            height="2em"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </td>
                    <td>
                        <input type="text" defaultValue={todoItem.title} disabled={this.state.complete}
                               className="form-control" id={`item--${todoItem.id}`} onChange={this.changeHandler}
                               ref={this.titleRef}/>
                    </td>
                    <td>
                        <textarea height={`${todoItem.body.length}px`} defaultValue={todoItem.body}
                                  disabled={this.state.complete} className="form-control"
                                  id={`item-body--${todoItem.id}`} onChange={this.changeHandler}
                                  ref={this.bodyRef}/>
                    </td>
                    <td className="text-right">
                        <div className="form-check form-check-inline">
                            <input type="boolean" defaultChecked={this.state.complete} type="checkbox"
                                   className="form-check-input" id={`complete--${todoItem.id}`}
                                   onChange={this.changeHandler} ref={this.completeRef}/>
                            <label htmlFor={`complete--${todoItem.id}`}>Is item complete?</label>
                        </div>

                        <button onClick={this.destroyHandler} className="btn btn-outline-danger">Delete item
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

TodoItem.propTypes = {
    todoItem: PropTypes.object.isRequired,
    getTodoItems: PropTypes.func.isRequired,
    hideCompletedItem: PropTypes.bool.isRequired,
    errorHandler: PropTypes.func.isRequired,
    errorClearer: PropTypes.func.isRequired
}


export default TodoItem;