import React, { useEffect, useRef, useState } from "react";
import "./CredentialsEditor.scss";

function CredentialsEditor({ label, type, validator, value, setValue }) {
  const [editing, setEditing] = useState();
  const [error, setError] = useState();
  const inputRef = useRef();

  function submit() {
    const newValue = inputRef.current?.value;
    const validationError = validator?.(newValue) ?? undefined;

    if (!validationError) {
      setError(undefined);
      setEditing(false);
      setValue(newValue);
    } else {
      setError(validationError);
    }
  }

  useEffect(() => {
    inputRef.current.value = value;
  }, []);

  return (
    <div className="credentials-editor">
      <div className="editor-field">
        <label htmlFor={label} hidden>
          {label}
        </label>
        <input
          type={type}
          name={label}
          id={label}
          disabled={!editing}
          ref={inputRef}
          placeholder={label}
          className={error ? "error" : ""}
        ></input>
      </div>
      <button
        className="edit-button accent"
        onClick={() => {
          if (editing) submit();
          else setEditing(true);
        }}
      >
        {editing ? <i class="las la-check"></i> : <i class="lar la-edit"></i>}
      </button>
      <span className="error">{error}</span>
    </div>
  );
}

export default CredentialsEditor;
