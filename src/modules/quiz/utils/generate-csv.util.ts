import { TQuizAnswers } from "@src/modules/quiz/types/quiz-answers.type.ts";
import { TQuizQuestion } from "@src/modules/quiz/types/quiz-question.type.ts";
import { HTML_TAG_REGEX, NEWLINE_REGEX } from "@src/shared/consts/regex.ts";

const CSV_DELIMITER = ",";
const NEWLINE = "\n";

const escapeCsvValue = (value: string): string => {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
};

const prettifyTextForCsv = (text: string): string =>
  text.replace(HTML_TAG_REGEX, "").replace(NEWLINE_REGEX, " ");

export const generateCsv = (
  data: TQuizQuestion[],
  answers: TQuizAnswers,
  messages: Record<string, string>,
  email: string,
): string => {
  const rows = Object.entries(answers)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([question, answerMap]) => {
      const questionIndex = Number(question) - 1;
      const quizQuestion = data[questionIndex];

      if (!quizQuestion) return "";

      const title = escapeCsvValue(
        prettifyTextForCsv(messages[quizQuestion.title]),
      );
      const type = quizQuestion.componentType;

      const selectedOptions = Object.keys(answerMap)
        .flatMap((answerId) => {
          const option = quizQuestion.options.find(
            ({ id }) => id === Number(answerId),
          );
          return option
            ? escapeCsvValue(prettifyTextForCsv(messages[option.text]))
            : [];
        })
        .join(", ");

      return [question, title, type, escapeCsvValue(selectedOptions)].join(
        CSV_DELIMITER,
      );
    })
    .filter(Boolean);

  rows.push(
    [data.length + 1, "Email", "email", escapeCsvValue(email)].join(
      CSV_DELIMITER,
    ),
  );

  return ["order, title, type, answers", ...rows].join(NEWLINE) + NEWLINE;
};
