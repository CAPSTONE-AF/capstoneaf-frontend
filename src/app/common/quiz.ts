import { Question } from './question';
import { Result } from './result';
import { Tema } from './tema';

export class Quiz {
  idQuiz: bigint;
  title: string;
  description: string;
  active: boolean;
  maxScore: number;
  numberOfQuestions: number;
  tema: Tema;
  results: Result[];
  questions: Question[];

}
