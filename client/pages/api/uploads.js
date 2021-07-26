import { mergeOptions } from "@apollo/client";
import Formidable from "formidable";
import getConfig from "next/config";
const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
const { join } = require("path");
import ApolloClient from "../../lib/apolloClient";
import { attachmentMutation } from "../../lib/gql/attachments";
import {
  slugify,
  checkAcceptedExtensions,
  checkCreateUploadsFolder,
} from "../../lib/util/helper";

const doBackendUpload = async (file, token) => {
  const url = ApolloClient()?.link?.options?.uri;
  const filename = file.name.split(".").slice(0, -1).join(".");
  const { name: fileslug, extension } = slugify(file.name);

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: attachmentMutation,
      variables: {
        attachment_title: filename,
        attachment_slug: fileslug,
        size: file.size,
        file_extension: extension,
      },
    }),
  });
  return await result.json();
};

async function apiRoute(req, res) {
  const uploadDir = join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    "public",
    "uploads"
  );

  const folderCreationResult = await checkCreateUploadsFolder(uploadDir);
  if (!folderCreationResult) {
    return res.json({
      errors: { message: "The uploads folder couldn't be created" },
    });
  }

  const form = Formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
  });
  form.on("file", function (field, file) {
    const isValidType = checkAcceptedExtensions(file);
    if (!isValidType)
      return res.json({ errors: { message: "Not a valid file type" } });
  });
  form.parse(req, async (err, fields, files) => {
    try {
      const { errors, data } = await doBackendUpload(files.file, fields?.token);
      if (errors) throw new Error(errors[0].message);

      const parsedName = join(
        uploadDir,
        data?.createAttachment?.attachment_slug
      );

      fs.rename(files.file.path, parsedName, (err) => {
        console.log(`uploaded ${parsedName}`);
        if (err) throw new Error(err);
      });

      return res.send(JSON.stringify({ data: data }));
    } catch (exception) {
      return res.json({ errors: { message: exception.message } });
    }
  });
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
