import { Locale } from "@src/config/intl/enums/locale.enum.ts";
import { QuizComponentType } from "@src/modules/quiz/enums/quiz-component-type.enum.ts";
import { TBubbleOption } from "@src/modules/quiz/types/bubble-option.type.ts";
import { TGridOption } from "@src/modules/quiz/types/grid-option.type.ts";
import { TListOption } from "@src/modules/quiz/types/list-option.type.ts";

type TGridQuestion = {
  componentType: QuizComponentType.GRID;
  options: TGridOption[];
};

type TListQuestion = {
  componentType: QuizComponentType.LIST;
  options: TListOption[];
};

type TBubbleQuestion = {
  componentType: QuizComponentType.BUBBLE;
  options: TBubbleOption[];
};

type QuestionVariants = TGridQuestion | TListQuestion | TBubbleQuestion;

type CommonQuestionProperties = {
  title: string;
  caption?: string;
  isMultiple: boolean;
  limit?: number;
  languages?: Array<Locale>;
};

export type TQuizQuestion = CommonQuestionProperties & QuestionVariants;
