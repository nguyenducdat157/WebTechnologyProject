import React from 'react'

export const FormInput = ({title, type, placeholder, value, handleChange}) => {
    return (
        <div>
            <label>{title}</label>
            <input
                id={`form-${title}`}
                palaceholder={placeholder}
                onChange={handleChange}
                value={value}
                required
            />
        </div>
    )
}
