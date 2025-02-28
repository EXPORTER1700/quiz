import { JSX } from "react";

import { QuizBubble } from "@src/modules/quiz/components/QuizBubble/QuizBubble.tsx";
import { QuizGrid } from "@src/modules/quiz/components/QuizGrid/QuizGrid.tsx";
import { QuizList } from "@src/modules/quiz/components/QuizList/QuizList.tsx";
import { QuizComponentType } from "@src/modules/quiz/enums/quiz-component-type.enum.ts";
import { TQuizQuestion } from "@src/modules/quiz/types/quiz-question.type.ts";

export const getQuizComponent = (
  question: TQuizQuestion,
  onSelect: (optionId: number) => void,
  isMultiple: boolean,
  answers: Record<number, boolean>,
): JSX.Element => {
  switch (question.componentType) {
    case QuizComponentType.LIST: {
      return (
        <QuizList
          options={question.options}
          onSelect={onSelect}
          isMultiple={isMultiple}
          answers={answers}
        />
      );
    }
    case QuizComponentType.GRID: {
      return (
        <QuizGrid
          options={question.options}
          onSelect={onSelect}
          answers={answers}
        />
      );
    }
    case QuizComponentType.BUBBLE: {
      return (
        <QuizBubble
          options={question.options}
          onSelect={onSelect}
          answers={answers}
        />
      );
    }
  }
};
