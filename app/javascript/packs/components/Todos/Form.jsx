import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from "../Headers";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.titleRef = React.createRef();
        this.bodyRef = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault()

        setAxiosHeaders()

        axios
            .post('/api/v1/todo_items', {
                todo_item: {
                    title: this.titleRef.current.value,
                    body: this.bodyRef.current.value,
                    complete: false,
                },
            })
            .then(response => {
                const todoItem = response.data
                this.props.createItem(todoItem)
            })
            .catch(error => {
                console.log(error)
            })
        e.target.reset()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="my-3">
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            name="title"
                            ref={this.titleRef}
                            required
                            className="form-control"
                            id="title"
                            placeholder="Write your todo item title here..."
                        />
                    </div>
                    <div className="form-group col-md-8">
                        <textarea
                            name="body"
                            ref={this.bodyRef}
                            required
                            className="form-control"
                            id="body"
                            placeholder="Write your todo item description here..."
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <button className="btn btn-outline-success btn-block">
                            Add To Do Item
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default TodoForm

TodoForm.propTypes = {
    createItem: PropTypes.func.isRequired,
}