import React from 'react'

const EmptyPage = ({ msg }) => {
    return (
        <div className='empty-layout center-items'>
            {msg ? <p className='rg-p'>{msg}</p> : <p className='rg-p'>Nothing to see here, such Empty 🤖</p>}
        </div>
    )
}

export { EmptyPage }