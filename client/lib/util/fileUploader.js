export function upload(file, token, onProgress) {
  const url = "/api/uploads";
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = (err) => reject(err);
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        onProgress(percentage);
      }
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", token);
    xhr.send(formData);
  });
}
