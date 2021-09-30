import React from 'react'

const Message = ({ error, type }) => {
    return (
        <div className="container">
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                <strong>Sorry</strong> {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )

}

export default Message
