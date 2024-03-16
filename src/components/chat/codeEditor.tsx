import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const SolidityCodeEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the Solidity language
    monaco.languages.register({ id: "solidity" });

    // Define the syntax highlighting rules for Solidity
    monaco.languages.setMonarchTokensProvider("solidity", {
      keywords: [
        "contract", "function", "uint", "mapping", "address", "returns", "public", 
        "private", "external", "internal", "view", "payable", "pure", "constant", 
        "if", "else", "while", "for", "return", "new", "delete"
      ],
      operators: [
        "+", "-", "*", "/", "%", "!", "=", "==", "!=", ">", ">=", "<", "<=", 
        "&&", "||", "&", "|", "^", "<<", ">>", "++", "--", "?", ":"
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      tokenizer: {
        root: [
          { include: "@whitespace" },
          { include: "@comment" },
          { include: "@string" },
          { include: "@number" },
          { include: "@keyword" },
          { include: "@operator" },
        ],
        whitespace: [[/\s+/, "white"]],
        comment: [
          [/\/\/.*$/, "comment"],
          [/#.*$/, "comment"],
          [/\/\*/, { token: "comment.quote", next: "@commentEnd" }],
        ],
        commentEnd: [
          [/[^\/*]+/, "comment.quote"],
          [/\*\//, { token: "comment.quote", next: "@pop" }],
          [/[\/*]/, "comment.quote"],
        ],
        string: [
          [/"/, { token: "string.quote", next: "@stringEndDoubleQuote" }],
        ],
        stringEndDoubleQuote: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, { token: "string.quote", next: "@pop" }],
        ],
        number: [
          [/\d*\.\d+/, "number.float"],
          [/\d+/, "number"],
        ],
        keyword: [
          [/@[a-zA-Z_$][\w$]*/, "annotation"],
          [
            /\b(contract|function|uint|mapping|address|returns|public|private|external|internal|view|payable|pure|constant|if|else|while|for|return|new|delete)\b/,
            "keyword",
          ],
        ],
        operator: [[/[+\-*\/%=&|<>!^]+/, "operator"]],
      },
    });

    // Initialize Monaco editor
    const editor = monaco.editor.create(editorRef.current!, {
      language: "solidity",
      theme: "vs-dark", // Use a built-in theme or replace with your custom theme
      automaticLayout: true, // Automatically resize the editor based on content
      minimap: {
        enabled: false // Disable minimap for simplicity
      },
      lineNumbers: "on", // Show line numbers
      folding: true, // Enable code folding
      fontSize: 14, // Set font size
      fontFamily: "Menlo, Monaco, 'Courier New', monospace", // Set font family
    });

    return () => {
      // Dispose of the editor instance when component unmounts
      editor.dispose();
    };
  }, []);

  return (
    <>
    <h2 className="text-center mt-2 mb-2 text-lg font-bold">Editor</h2>
    <div
      ref={editorRef}
      className="solidity-editor w-full h-full border border-gray-700"
      style={{ borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    />
    <button className="fixed bottom-4 right-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none">
  Compile
</button>

      </>
  );
};

export default SolidityCodeEditor;
