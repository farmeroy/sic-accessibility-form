const getVisits = async () => {
  const res = await fetch("http://localhost:3000/api/analytics/visits");
  if (!res.ok) throw new Error("Failed to fetch visits");
  return res.json();
};

const getQuizResults = async () => {
  const res = await fetch("http://localhost:3000/api/analytics/results");
  if (!res.ok) throw new Error("Failed to fetch quiz results");
  return res.json();
};

const getContacts = async () => {
  const res = await fetch("http://localhost:3000/api/analytics/contacts");
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
};

const DashboardView = async () => {
  const visits = await getVisits().then((result) => result.data);
  const quizResults = await getQuizResults().then((result) => result.data);
  const contacts = await getContacts().then((result) => result.data);

  return (
    <>
      <div>{JSON.stringify(visits)}</div>
      <div>{JSON.stringify(quizResults)}</div>
      <div>{JSON.stringify(contacts)}</div>
    </>
  );
};

export default DashboardView;
