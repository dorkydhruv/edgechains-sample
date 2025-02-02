"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });
      if (!response.ok) throw new Error("Review request failed");

      const data = await response.json();
      console.log(data);
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <h1 className='text-2xl font-bold mb-6'>Code Review</h1>

      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='mb-4'>
          <label className='block mb-2 font-medium'>
            Programming Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className='ml-2 p-2 border rounded'
            >
              <option value='python'>Python</option>
              <option value='javascript'>JavaScript</option>
              <option value='typescript'>TypeScript</option>
              <option value='java'>Java</option>
            </select>
          </label>
        </div>

        <div className='mb-4'>
          <label className='block mb-2 font-medium'>
            Code:
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='w-full h-64 p-3 font-mono border rounded mt-2'
              placeholder='Paste your code here...'
            />
          </label>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
        >
          {isLoading ? "Analyzing..." : "Submit for Review"}
        </button>

        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </form>

      {analysis && (
        <div className='analysis-results'>
          <h2 className='text-xl font-bold mb-4'>Analysis Results</h2>
          <ReactMarkdown
            components={{
              code: CodeComponent,
            }}
          >
            {analysis}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeComponent: React.FC<CodeProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    //@ts-ignore
    <SyntaxHighlighter style={dark} language={match[1]} PreTag='div' {...props}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
