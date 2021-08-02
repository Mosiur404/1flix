import { useContext } from "react";
import useInput from "../../../hooks/useInput";
import {
  validEmailOrUsername,
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
import { loginQuery } from "../../../lib/gql/users";
import style from "./Login.module.scss";

export default function Login() {
  const authCtx = useContext(AuthContext);
  const [sendLogin, { loading, error }] = useMutation(loginQuery);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validEmailOrUsername);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  let formIsvalid = false;
  if (emailIsValid && passwordIsValid) formIsvalid = true;

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsvalid) return;
    //everything passed, lets log in :D
    const info = {
      variables: { email: enteredEmail, password: enteredPassword },
    };
    try {
      const { data } = await sendLogin(info);
      delete data.login?.__typename;
      authCtx.login(data.login);
      // router.push("/");
    } catch (e) {}
  };

  const emailClass = emailHasError ? "is-invalid" : "";
  const passwordClass = passwordHasError ? "is-invalid" : "";
  return (
    <>
      <div className={`bg-primary ${style.loginFormContainer}`}>
        <Image
          src="/assets/background/colorful_background.jpg"
          alt="Login"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="container">
          <div className="row flex-lg-row-reverse">
            <div className={`col-lg-7 ${style.loginContentContainer}`}>
              <div className={` ${style.loginContent} p-3 p-lg-5`}>
                <h1>1FLIX</h1>
                <p className="lead">
                  1flix is a subscription-based streaming service that allows
                  our members to watch TV shows and movies on an
                  internet-connected device.
                </p>
              </div>
            </div>
            <div className={`col-lg-5 `}>
              <Form onSubmit={formSubmitHandler}>
                {loading && <Spinner />}
                <h1 className="my-4">Login</h1>
                {error && <AlertDanger>{error.message}</AlertDanger>}
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
                <ButtonPrimary type="submit" isDisabled={!formIsvalid}>
                  Submit
                </ButtonPrimary>
                <p className="lead mt-3">
                  No account?{" "}
                  <Link href="/register">
                    <a className="primary-text">Create an account</a>
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
