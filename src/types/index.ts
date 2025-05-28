export interface User {
  id: string;
  username: string;
  email: string;
  accessCode: string;
  role?: 'admin' | 'user';
}

export interface Material {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  pdfUrl?: string;
  videoUrl?: string;
  subject: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  showingReview: boolean;
  selectedAnswer: number | null;
  selectedSubject: string;
}

export interface AccessCode {
  code: string;
  used: boolean;
  email?: string;
}