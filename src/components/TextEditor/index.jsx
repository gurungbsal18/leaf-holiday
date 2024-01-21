"use client";
// RichTextEditor.js
import React, { useRef, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ initialValue, control, name }) => {
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);

  return (
    <div className="">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TEXTEDITOR_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            onDirty={() => setDirty(true)}
            initialValue=""
            value={value}
            onEditorChange={onChange}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor |" +
                "link image media |" +
                "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

              /*uploading image*/
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",

              file_picker_callback: (cb, value, meta) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.addEventListener("change", async (e) => {
                  const file = e.target.files[0];

                  // Upload the image to Cloudinary
                  try {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "uploadPreset");

                    const response = await fetch(
                      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                      {
                        method: "POST",
                        body: formData,
                      }
                    );

                    if (response.ok) {
                      const data = await response.json();
                      const imageUrl = data.secure_url; // Get the uploaded image URL

                      cb(imageUrl, { title: file.name });
                    } else {
                      console.error(
                        "Error uploading image to Cloudinary:",
                        response.statusText
                      );
                    }
                  } catch (error) {
                    console.error("Error uploading image:", error);
                  }
                });

                input.click();
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default TextEditor;
