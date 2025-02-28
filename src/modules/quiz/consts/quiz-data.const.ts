import { Locale } from "@src/config/intl/enums/locale.enum.ts";
import { QuizComponentType } from "@src/modules/quiz/enums/quiz-component-type.enum.ts";
import { TQuizQuestion } from "@src/modules/quiz/types/quiz-question.type.ts";

export const QUIZ_DATA: TQuizQuestion[] = [
  {
    title: "quiz.questions.0.title",
    caption: "quiz.questions.0.caption",
    isMultiple: false,
    componentType: QuizComponentType.LIST,
    options: [
      {
        id: 1,
        text: "quiz.questions.0.options.0",
      },
      {
        id: 2,
        text: "quiz.questions.0.options.1",
      },
      {
        id: 3,
        text: "quiz.questions.0.options.2",
      },
      {
        id: 4,
        text: "quiz.questions.0.options.3",
      },
    ],
    languages: [Locale.EN, Locale.FR, Locale.DE, Locale.ES],
  },
  {
    title: "quiz.questions.1.title",
    caption: "quiz.questions.1.caption",
    isMultiple: false,
    componentType: QuizComponentType.GRID,
    options: [
      {
        id: 1,
        emoji: "👩",
        text: "quiz.questions.1.options.0",
      },
      {
        id: 2,
        emoji: "👨",
        text: "quiz.questions.1.options.1",
      },
      {
        id: 3,
        emoji: "😉",
        text: "quiz.questions.1.options.2",
      },
    ],
  },
  {
    title: "quiz.questions.2.title",
    isMultiple: false,
    componentType: QuizComponentType.LIST,
    options: [
      {
        id: 1,
        text: "quiz.questions.2.options.0",
      },
      {
        id: 2,
        text: "quiz.questions.2.options.1",
      },
      {
        id: 3,
        text: "quiz.questions.2.options.2",
      },
      {
        id: 4,
        text: "quiz.questions.2.options.3",
      },
    ],
  },
  {
    title: "quiz.questions.3.title",
    isMultiple: true,
    componentType: QuizComponentType.LIST,
    options: [
      {
        id: 1,
        text: "quiz.questions.3.options.0",
      },
      {
        id: 2,
        text: "quiz.questions.3.options.1",
      },
      {
        id: 3,
        text: "quiz.questions.3.options.2",
      },
      {
        id: 4,
        text: "quiz.questions.3.options.3",
      },
    ],
  },
  {
    title: "quiz.questions.4.title",
    caption: "quiz.questions.4.caption",
    isMultiple: true,
    componentType: QuizComponentType.BUBBLE,
    limit: 3,
    options: [
      {
        id: 1,
        emoji: "🐺",
        text: "quiz.questions.4.options.0",
      },
      {
        id: 2,
        emoji: "🥰",
        text: "quiz.questions.4.options.1",
      },
      {
        id: 3,
        emoji: "💃",
        text: "quiz.questions.4.options.2",
      },
      {
        id: 4,
        emoji: "💁‍♀️",
        text: "quiz.questions.4.options.3",
      },
      {
        id: 5,
        emoji: "👑",
        text: "quiz.questions.4.options.4",
      },
      {
        id: 6,
        emoji: "🤠",
        text: "quiz.questions.4.options.5",
      },
      {
        id: 7,
        emoji: "🤑",
        text: "quiz.questions.4.options.6",
      },
    ],
  },
] as const;
