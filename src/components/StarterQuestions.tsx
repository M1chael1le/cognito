interface StarterQuestionsProps {
  onSelect: (question: string) => void;
}

const questions = [
  "When should I elect S-Corp status for my business?",
  "What is the Trifecta business structure?",
  "How do I determine my S-Corp salary?",
  "What are the best year-end tax strategies?",
];

export default function StarterQuestions({ onSelect }: StarterQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center px-4">
      {questions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          className="px-4 py-2.5 bg-card border border-gray-200 rounded-full text-sm text-dark hover:border-primary hover:bg-blue-50 transition-all"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
