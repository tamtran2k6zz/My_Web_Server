export type QuestionType = 'single' | 'multi' | 'truefalse' | 'drag' | 'match' | 'fillblank';

export interface QuestionBase {
  type: QuestionType;
  q: string;
  html?: boolean; // If true, render q as HTML
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: 'single';
  options: string[];
  correct: number;
}

export interface MultiChoiceQuestion extends QuestionBase {
  type: 'multi';
  options: string[];
  correct: number[];
}

export interface TrueFalseOption {
  text: string;
  correct: boolean;
}

export interface TrueFalseQuestion extends QuestionBase {
  type: 'truefalse';
  options: TrueFalseOption[];
}

export interface DragDropQuestion extends QuestionBase {
  type: 'drag';
  columns: string[];
  items: string[];
  correct: { [columnIndex: string]: string[] }; // Using string keys as per original data format "0", "1"
}

// Keeping Match for completeness based on types logic, though original data mainly uses drag
export interface MatchQuestion extends QuestionBase {
  type: 'match';
  left: string[];
  right: string[];
  correct: string[];
}

export interface FillBlankQuestion extends QuestionBase {
  type: 'fillblank';
  targets: string[];
  correct: string[];
}

export type Question = 
  | SingleChoiceQuestion 
  | MultiChoiceQuestion 
  | TrueFalseQuestion 
  | DragDropQuestion 
  | MatchQuestion
  | FillBlankQuestion;

export interface Topic {
  name: string;
  questions: Question[];
}

export interface QuizData {
  [key: string]: Topic;
}