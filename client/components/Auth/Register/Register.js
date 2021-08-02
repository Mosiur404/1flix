import { useContext } from "react";
import useInput from "../../../hooks/useInput";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../../lib/util/validators";

import Image from "next/image";
import Link from "next/link";
import { InputBox } from "../../Forms/InputBox";
import { Form } from "../../Forms/Form/Form";
import { ButtonPrimary } from "../../UI/Button/Button";
import { AlertDanger } from "../../UI/Alert/Alert";
import Spinner from "../../UI/Loader/Spinner";

import { AuthContext } from "../../../store/auth";
import { useMutation } from "@apollo/client";
import { registerQuery } from "../../../lib/gql/users";
import style from "./Register.module.scss";

export default function Register() {
  const authCtx = useContext(AuthContext);
  const [sendRegister, { loading, error }] = useMutation(registerQuery);

  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(validateUsername);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  let formIsvalid = false;
  if (emailIsValid && passwordIsValid && usernameIsValid) formIsvalid = true;

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsvalid) return;
    //everything passed, lets log in :D
    const info = {
      variables: {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      },
    };
    try {
      const { data } = await sendRegister(info);
      delete data.createUser?.__typename;
      authCtx.register(data.createUser);
    } catch (e) {}
  };

  const usernameClass = usernameHasError ? "is-invalid" : "";
  const emailClass = emailHasError ? "is-invalid" : "";
  const passwordClass = passwordHasError ? "is-invalid" : "";

  const errorData = error
    ? error?.extensions?.validationErrors || error.message
    : "";
  return (
    <div className={`bg-primary ${style.loginFormContainer}`}>
      <Image
        src="/assets/background/colorful_background.jpg"
        alt="Login"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
      <div className="container">
        <div className="row">
          <div className={`col-lg-7 ${style.loginContentContainer}`}>
            <div className={` ${style.loginContent} p-3 p-lg-5`}>
              <h1>1FLIX</h1>
              <p className="lead">
                1flix is a subscription-based streaming service that allows our
                members to watch TV shows and movies on an internet-connected
                device.
              </p>
            </div>
          </div>
          <div className={`col-lg-5 `}>
            <Form onSubmit={formSubmitHandler}>
              {loading && <Spinner />}
              <h1 className="my-4">Register</h1>
              {error && <AlertDanger>{errorData}</AlertDanger>}
              <InputBox
                type="text"
                id="enteredUsername"
                hasError={usernameHasError}
                placeholder="username"
                value={enteredUsername}
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
                label="Username"
                help="Username must be 6-20 characters long, no _ or . allowed."
              />
              <InputBox
                type="email"
                id="enteredEmail"
                hasError={emailHasError}
                placeholder="name@example.com"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                label="Email address"
              />
              <InputBox
                type="password"
                id="enteredPassword"
                hasError={passwordHasError}
                placeholder="Password (at least 6 character)"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                label="Password"
                help="Your password must be 8-20 characters long &amp; not contain
                spaces, special characters, or emoji."
              />
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck"
                  required
                />
                <label className="form-check-label" htmlFor="invalidCheck">
                  Agree to terms and conditions.
                </label>
              </div>
              <ButtonPrimary type="submit" isDisabled={!formIsvalid}>
                Submit
              </ButtonPrimary>
              <p className="lead mt-3">
                Already have an account?{" "}
                <Link href="/">
                  <a className="primary-text">Login now</a>
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
