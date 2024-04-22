import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Textarea } from '../ui/textarea';

const Markdown = () => {
  const [markdown, setMarkdown] = useState('# Hello, Markdown!');

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const CodeBlock = ({ language, value }) => (
    <SyntaxHighlighter
      style={dracula}
      language={language}
    >
        {value}
    </SyntaxHighlighter>
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Markdown Editor </h1>
      <Textarea
        value={markdown}
        onChange={handleChange}
        className="w-full h-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="mt-4">
        <ReactMarkdown
          components={{
            code: CodeBlock,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Markdown;
