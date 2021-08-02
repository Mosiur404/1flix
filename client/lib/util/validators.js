import { getFilenName } from "./decoders";

export function validateUsername(username) {
  const re = /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return re.test(String(username).toLowerCase());
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const re = new RegExp("^[a-zA-Z0-9]{6,20}$");
  return re.test(String(password));
}

export function validEmailOrUsername(emailOrUsername) {
  return validateUsername(emailOrUsername) || validateEmail(emailOrUsername);
}

export function validateName(name = "") {
  if (name === "") return false;
  const re = /^.{3,255}$/;
  return re.test(String(name));
}
export function validateFile(file = "") {
  if (file === "") return false;
  const fileTypes = ["jpg", "jpeg", "png"];
  const { fileName, extension } = getFilenName(file);
  return fileTypes.indexOf(extension.toLowerCase()) !== -1;
}
