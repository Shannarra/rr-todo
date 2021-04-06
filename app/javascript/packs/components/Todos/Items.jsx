import React from 'react'
import PropTypes from 'prop-types';


class TodoItems extends React.Component {
    constructor(props) {
        super(props);
        this.filterHandler = this.filterHandler.bind(this);
    }

    filterHandler() {
        this.props.toggleCompletedItems();
    }

    render() {
        return (
            <React.Fragment>

                <hr/>
                <button className="btn btn-outline-primary btn-block mb-3" onClick={this.filterHandler}>
                    {this.props.isGoingToToggleCompletedItems ? 'Show completed items' : 'Hide completed items'}
                </button>
                <hr/>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Item</th>
                            <th scope="col">Body</th>
                            <th scope="col" className="text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>{this.props.children}</tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

TodoItems.propTypes = {
    toggleCompletedItems: PropTypes.func.isRequired,
    isGoingToToggleCompletedItems: PropTypes.bool.isRequired
}

export default TodoItems;