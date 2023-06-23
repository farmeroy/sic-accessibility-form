import MainView from "@/components/MainView";

const getQuizData = async () => {
  const res = await fetch("http://localhost:3000/api/questions", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};

async function App() {
  const quizSections = await getQuizData().then((result) => result.data);

  return <MainView quizSections={quizSections} />;
}

export default App;
