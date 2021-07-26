const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));

export const slugify = (title) => {
  const temp = title.split(".");
  const ext = temp.pop();
  return {
    name: temp
      .join(".")
      .replace(/[^a-z0-9_]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase(),
    extension: ext.toLowerCase(),
  };
};

// Returns true or false depending on whether the file is an accepted type
export function checkAcceptedExtensions(file) {
  const type = file.type.split("/").pop();
  const accepted = ["jpeg", "jpg", "png"];
  if (accepted.indexOf(type) == -1) {
    return false;
  }
  return true;
}

export async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (e) {
    if (e && e.code == "ENOENT") {
      console.log("The uploads folder doesn't exist, creating a new one...");
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (err) {
        console.log("Error creating the uploads folder 1");
        return false;
      }
    } else {
      console.log("Error creating the uploads folder 2");
      return false;
    }
  }
  return true;
}
