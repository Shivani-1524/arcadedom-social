import React from "react";

const FormInput = ({ props, onChange, formErrors }) => {
    const { labelFor, labelTitle, placeholderText, inputType, value } = props;
    return (
        <div className="mg-t-15">
            <label className="input-label sm-title" htmlFor={labelFor}>
                {labelTitle}
            </label>
            <input
                className="user-input"
                required
                type={inputType}
                placeholder={placeholderText}
                onChange={onChange}
                id={labelFor}
                name={labelFor}
                value={value}
            />
            {formErrors && <p className="mg-t-10 orange-txt">{formErrors[labelFor]}</p>}
        </div>
    );
};

export { FormInput };
