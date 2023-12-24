"use client";

import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Link2,
  Link2Off,
  Quote,
} from "lucide-react";
import { FaP } from "react-icons/fa6";
import CloudinaryUpload from "../ui/CloudinaryUpload";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [imageUrl, setImageUrl] = useState(null);

  //Set link to the selected text in the editor
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  //adding image in editor
  useEffect(() => {
    if (imageUrl !== null) {
      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: "Editor Image" })
        .run();
    }
  }, [imageUrl]);

  //Don't show the toolbar if editor is not available
  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        {/*<MdOutlineLocalParking />*/}
        <FaP />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <Heading3 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <Heading4 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        <Heading5 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        <Heading6 />
      </button>
      <button
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <Link2 />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        <Link2Off />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote />
      </button>
      <button>
        <CloudinaryUpload setImageUrl={setImageUrl} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo2 />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo2 />
      </button>
    </div>
  );
};

// const extensions = [
//   TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//   }),
//   Link.configure({
//     openOnClick: true,
//     HTMLAttributes: {
//       class: "text-editor-link",
//     },
//   }),
//   Image.configure({
//     inline: true,
//     HTMLAttributes: {
//       class: "text-editor-image",
//     },
//   }),
// ];

export default function TextEditor() {
  return (
    <EditorProvider
      className="tiptap"
      slotBefore={<MenuBar />}
      // extensions={extensions}
      content=""
    ></EditorProvider>
  );
}
