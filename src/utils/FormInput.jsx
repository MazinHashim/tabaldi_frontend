import React, { useState } from 'react'

const FormInput = (props) => {
  const [blured, setBlured] = useState(false);
  const {label, errorMessage, onChange, textArea, id, name, ...inputProps} = props;

  const handleBlur = () => {
    setBlured(true)
  };
  return (
    <div className={props.containerstyle}>
        <label htmlFor={name} className="text-sm">{label}</label>
        {!textArea
        ? <input {...inputProps} name={name} id={name} onChange={onChange} onBlur={handleBlur} blured={blured.toString()} className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5" />
        : <textarea {...inputProps} name={name} id={name} onChange={onChange} onBlur={handleBlur} blured={blured.toString()}  className="sm:text-sm bg-slate-100 rounded-lg w-full p-2.5"></textarea>}
        <p className='text-xs text-red-500 form-error-msg'>{errorMessage}</p>
    </div>
  )
}

export default FormInput