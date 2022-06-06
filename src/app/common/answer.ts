import { Question } from './question';
import { Result } from './result';

export class Answer {
  idAnswer: bigint;
  ans: string;
  result: Result;
  question: Question;

  constructor(idAnswer: bigint, ans: string, result:Result, question: Question) {
    this.idAnswer = idAnswer;
    this.ans = ans;
    this.result = result;
    this.question = question;
  }

}
