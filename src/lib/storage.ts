import { Material, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { materials, questions as mockQuestions } from '../data/mockData';

// Local storage keys
const MATERIALS_KEY = 'learnhub_materials';
const QUESTIONS_KEY = 'learnhub_questions';

// Materials
export const getMaterials = (): Material[] => {
  const storedMaterials = localStorage.getItem(MATERIALS_KEY);
  return storedMaterials ? JSON.parse(storedMaterials) : materials;
};

export const addMaterial = (material: Omit<Material, 'id'>, userId: string): Material => {
  const materials = getMaterials();
  const newMaterial = {
    ...material,
    id: uuidv4(),
    created_by: userId,
    created_at: new Date().toISOString()
  };
  
  materials.push(newMaterial);
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
  return newMaterial;
};

// Questions
export const getQuestions = (): Question[] => {
  const storedQuestions = localStorage.getItem(QUESTIONS_KEY);
  return storedQuestions ? JSON.parse(storedQuestions) : mockQuestions;
};

export const addQuestion = (question: Omit<Question, 'id'>, userId: string): Question => {
  const questions = getQuestions();
  const newQuestion = {
    ...question,
    id: uuidv4(),
    created_by: userId,
    created_at: new Date().toISOString()
  };
  
  questions.push(newQuestion);
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  return newQuestion;
};