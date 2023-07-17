import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const AdminDatabaseMarkdownEditRow = ({ content }) => {
  return (
    <div className="flex w-full ">
      <button>Edit</button>
      <ReactMarkdown
        className="w-full max-w-2xl p-2"
        components={{
          a: ({ ...props }) => (
            <a className="underline text-accentBlue" {...props} />
          ),
        }}
      >
        {content.replace(/\\n/g, "\n")}
      </ReactMarkdown>
    </div>
  );
};

export default AdminDatabaseMarkdownEditRow;
