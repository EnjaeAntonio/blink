import React, { useEffect, useState } from 'react';
import '../InputField/InputField.css';

function InputField(props) {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (props.isDisabled) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [props.isDisabled]);

    const handleOnFocusForDate = () => {
        if (props.inputType === 'date') {
            document.getElementById(props.inputId).setAttribute('type', 'date');
            document.getElementById(props.inputId).showPicker();
        }
        if (props.inputType === 'time') {
            document.getElementById(props.inputId).setAttribute('type', 'time');
            document.getElementById(props.inputId).showPicker();
        }
    };

    const handleOnBlurForDate = () => {
        if (props.inputType === 'date') {
            document.getElementById(props.inputId).setAttribute('type', 'text');
        }
        if (props.inputType === 'time') {
            document.getElementById(props.inputId).setAttribute('type', 'text');
        }
    };

    return (
        <div className={`form-group ${props.inputStyle}`}>
            <div className="row">
                <div className={`${props.colStyle}`}>
                    {props.inputLabel ? (
                        <label htmlFor={props.inputId} className="mt-2 mb-1 input-label">
                            {props.inputLabel}
                        </label>
                    ) : (
                        <></>
                    )}{' '}
                </div>
            </div>
            <div
                className={`input-wrapper before-wrapper after-wrapper ${props.inputWrapperStyle}`}
            >
                <input
                    type={
                        props.inputType === 'date' || props.inputType === 'time'
                            ? 'text'
                            : props.inputType
                    }
                    className={`form-control input-field ${props.inputTypeStyle}`}
                    placeholder={props.inputPlaceholder}
                    onChange={(e) => props.handleOnChange(e.target.value)}
                    id={props.inputId}
                    maxLength={props.maxLength}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    disabled={isDisabled}
                    onKeyDown={props.onKeyDown}
                    onFocus={handleOnFocusForDate}
                    onBlur={handleOnBlurForDate}
                />
            </div>
            {props.errors ? (
                <>
                    <div className={`text-danger mb-2 ${props.errorStyle}`}>
                        <i className="fa fa-times error-symbol" />
                        <span className="">{props.errorMessage}</span>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default InputField;
