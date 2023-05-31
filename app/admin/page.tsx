import { sections } from "../../src/lib/list-config.json";

const AdminView = () => {
  const quizSections = sections;
  return (
    <div className="p-6 m-8 rounded-lg bg-offWhite">
      {quizSections.map((section) => (
        <>
          <h1>{section.title}</h1>
          <details>
            <summary>Section Items:</summary>
            <ol className="p-4">
              {section.items.map((item) => (
                <ol>
                  <li className="p-2 list-disc">
                    <div className="flex p-2 rounded-lg w-96">
                      <button className="p-1 mx-2 text-xs border border-gray-400 rounded-lg hover:bg-gray-200 ">
                        Edit
                      </button>
                      <h3 className="mr-2 font-bold">Item Label:</h3>
                      <p>"{item.label}"</p>
                    </div>
                    <div className="flex p-2 rounded-lg w-fit">
                      <button className="p-1 mx-2 text-xs border border-gray-400 rounded-lg hover:bg-gray-200 ">
                        Edit
                      </button>
                      <h3 className="mr-2 font-bold">Item Content:</h3>{" "}
                      <p>"{item.content}"</p>
                    </div>
                    <hr />
                  </li>
                </ol>
              ))}
            </ol>
          </details>
        </>
      ))}
    </div>
  );
};

export default AdminView;
