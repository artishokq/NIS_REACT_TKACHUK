import { memo, forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, error, className = "", id, ...props },
    ref,
  ) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label className="input-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input-field ${error ? "input-field--error" : ""}`}
          {...props}
        />
        {error && <span className="input-error">{error}</span>}
      </div>
    );
  }),
);
