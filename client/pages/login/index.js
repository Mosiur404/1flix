import { useContext } from "react";
import useInput from "../../hooks/useInput";
import { validateEmail, validatePassword } from "../../lib/util/validators";

import Header from "../../components/Header/Layout/Header";
import Footer from "../../components/Footer/Footer";
import { InputBox } from "../../components/Forms/InputBox";
import { Form } from "../../components/Forms/Form/Form";
import { ButtonPrimary } from "../../components/UI/Button/Button";
import { AlertDanger } from "../../components/UI/Alert/Alert";
import Spinner from "../../components/UI/Loader/Spinner";

import { useLazyQuery } from "@apollo/client";
import { loginQuery } from "../../lib/gql/users";
import { AuthContext } from "../../store/auth";
import style from "./login.module.scss";

export default function Home() {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx);

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
  if (emailIsValid && passwordIsValid) formIsvalid = true;

  const [sendLogin, { loading, data, error }] = useLazyQuery(loginQuery, {
    fetchPolicy: "network-only",
  });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsvalid) return;
    //everything passed, lets log in :D
    const info = {
      variables: { email: enteredEmail, password: enteredPassword },
    };
    sendLogin(info);
    // if (error) return;
    console.log(data);
    // const { login: result } = data;
    // authCtx.login(result);
  };

  const emailClass = emailHasError ? "is-invalid" : "";
  const passwordClass = passwordHasError ? "is-invalid" : "";
  return (
    <>
      <Header metaTitle="IFLIX" metaDescription="1FLIX STREAMING" />
      <div className="bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <Form onSubmit={formSubmitHandler} className={style.loginForm}>
                {loading && <Spinner />}
                <h1 className="my-4">Login</h1>
                {error && <AlertDanger>{error.message}</AlertDanger>}
                <InputBox
                  type="email"
                  className={emailClass}
                  id="enteredEmail"
                  placeholder="name@example.com"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  label="Email address"
                />
                <InputBox
                  type="password"
                  className={passwordClass}
                  id="enteredPassword"
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
              </Form>
            </div>
            <div className="col-7 h-100"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
