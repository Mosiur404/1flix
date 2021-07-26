export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function getFilenName(filepath = "") {
  if (filepath === "") return null;
  const fileName = filepath.replace(/^.*[\\\/]/, "").split(".");
  const extension = fileName.pop();
  return { fileName: fileName.join(""), extension };
}
