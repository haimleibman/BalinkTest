import React, { useState } from 'react';
import styles from './InputField.module.css';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import {Store} from '../Store/Store'

const InputField = (props) => {
    const [value, setValue] = useRecoilState(Store[props.name]);
    const [isValid, setIsValid] = useState(true);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleBlur = () => {
        let inputIsValid = true;

        if (props.required)
            inputIsValid = !!value;

        if (props.pattern && !!value) {
            const regex = RegExp(props.pattern);

            inputIsValid = regex.test(value);
        }

        setIsValid(inputIsValid);
    }

    return (
        <div className={styles.inputField}>
            <label 
                className={classNames(styles.label, {[styles.uplabel]: !!value})}
                htmlFor={props.name} >
                {props.name}
            </label>
            <input
                className={classNames(styles.input, {[styles.invalid]: !isValid})}
                type={props.type}
                id={props.name}
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}/>
            {!isValid && <p className={styles.error}>{props.error}</p>}
        </div>
    )
}

export default InputField;