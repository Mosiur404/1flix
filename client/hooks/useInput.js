import { useState } from "react";

export default function useInput(validator) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setisTouched] = useState(false);

  const isValid = validator(enteredValue);
  const hasError = isTouched && !isValid;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setisTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setisTouched(false);
  };

  return {
    value: enteredValue.trim(),
    setValue: setEnteredValue,
    isValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
}
