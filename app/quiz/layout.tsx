const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 border rounded-2xl border-1 bg-offWhite">
      {children}
    </div>
  );
};

export default QuizLayout;
