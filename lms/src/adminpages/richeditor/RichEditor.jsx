// RichEditor.jsx — Reusable Quill rich text editor component
// Drop this file in your components/ folder
// Quill is loaded from CDN in your index.html — add these two lines:
//   <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.7/quill.snow.css" />
//   <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>

import React, { useEffect, useRef, useCallback } from "react";
import "./RichEditor.css";

// ── toolbar config matching the screenshot ────────────────────────────────────
const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link", "image"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["clean"],
];

export default function RichEditor({
  value,
  onChange,
  placeholder,
  minHeight = 180,
}) {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const onChangeRef = useRef(onChange);

  // Keep callback ref fresh so we don't recreate Quill on every render
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (quillRef.current) return; // already mounted

    // Wait for Quill to be available (loaded from CDN)
    const init = () => {
      if (typeof window.Quill === "undefined") {
        setTimeout(init, 50);
        return;
      }

      const q = new window.Quill(containerRef.current, {
        theme: "snow",
        placeholder: placeholder || "Write something...",
        modules: { toolbar: TOOLBAR },
      });

      // Set initial HTML content
      if (value) {
        q.clipboard.dangerouslyPasteHTML(value);
      }

      // Emit changes as HTML string
      q.on("text-change", () => {
        const html = q.root.innerHTML;
        onChangeRef.current(html === "<p><br></p>" ? "" : html);
      });

      quillRef.current = q;
    };

    init();

    return () => {
      // Cleanup: remove toolbar clone left by Quill
      const toolbar = containerRef.current?.previousSibling;
      if (toolbar?.classList?.contains("ql-toolbar")) toolbar.remove();
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // Sync external value changes (e.g. loading a different chapter)
  useEffect(() => {
    if (!quillRef.current) return;
    const current = quillRef.current.root.innerHTML;
    const incoming = value || "";
    if (current !== incoming) {
      quillRef.current.clipboard.dangerouslyPasteHTML(incoming);
    }
  }, [value]);

  return (
    <div className="re-wrap" style={{ "--re-min-height": `${minHeight}px` }}>
      <div ref={containerRef} className="re-editor" />
    </div>
  );
}
