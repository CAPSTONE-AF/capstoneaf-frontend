import { Answer } from './answer';
import { Quiz } from './quiz';

export class Question {
  idQuestion: bigint;
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  quiz: Quiz;
  answers: Answer[];

}
