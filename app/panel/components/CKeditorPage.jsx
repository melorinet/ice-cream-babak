"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically load CKEditor + ClassicEditor together, SSR disabled
const CKEditor = dynamic(
  async () => {
    const { CKEditor } = await import("@ckeditor/ckeditor5-react");
    const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;

    return function CKEditorWrapper(props) {
      return <CKEditor editor={ClassicEditor} {...props} />;
    };
  },
  { ssr: false }
);

const CKeditorPage = () => {
  const [data, setData] = useState("");

  return (
    <div className="w-full h-[100vh] text-zinc-700 ">
      <CKEditor
      config={{
    language: {
      ui: "fa",       // UI language (buttons, menus, etc.)
      content: "fa"   // Editing area language
    },
    contentsLangDirection: "rtl", // Force editor content to RTL
  }}
        data={data}
        onChange={(_, editor) => {
          const newData = editor.getData();
          setData(newData);
          console.log("Editor data:", newData);
        }}
      />
    </div>
  );
};

export default CKeditorPage;
