"use client";

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
        "contract",
        "function",
        "uint",
        "mapping",
        "address",
        "returns",
        "public",
        "private",
        "external",
        "internal",
        "view",
        "payable",
        "pure",
        "constant",
        "if",
        "else",
        "while",
        "for",
        "return",
        "new",
        "delete",
      ],
      operators: [
        "+",
        "-",
        "*",
        "/",
        "%",
        "!",
        "=",
        "==",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "&&",
        "||",
        "&",
        "|",
        "^",
        "<<",
        ">>",
        "++",
        "--",
        "?",
        ":",
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
      theme: "vs-dark", // You can change the theme as needed
    });

    // // Set up change event listener
    // editor.onDidChangeModelContent(() => {
    //   onChange(editor.getValue());
    // });

    return () => {
      // Dispose of the editor instance when component unmounts
      editor.dispose();
    };
  }, []);

  return (
    <div ref={editorRef} className="w-full h-full border border-gray-700" />
  );
};

export default SolidityCodeEditor;
