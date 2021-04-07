import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Error = props => {
    const data = _.get(props.error, "response.data", null);
    const message = _.get(props.error, "message", null);

    if (data) {
        const keys = Object.keys(data);
        return (
            <div className="alert alert-danger" role="alert">
                <p className="mb-0">{message ? message : data}</p>
            </div>
        );
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                <p className="mb-0">There was an unexpected error while fetching your data.</p>
            </div>
    );
    }
}

Error.propTypes = {
    error: PropTypes.object.isRequired
}

export default Error;