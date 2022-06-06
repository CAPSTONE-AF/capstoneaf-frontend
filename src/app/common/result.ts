import { User } from './user';
import { Quiz } from './quiz';
import { Answer } from './answer';
export class Result {
  idResultado: bigint;
  quiz: Quiz;
  user: User;
  numCorrectAns: number;
  numIncorrectAns: number;
  resultScore: number;
  submitDate: Date;
  answers: Answer[];

}
