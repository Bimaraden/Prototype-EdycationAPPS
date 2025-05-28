import { Material, Question } from '../types';

export const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science'
];

export const materials: Material[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    content: `Machine learning is a branch of artificial intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.

Machine learning algorithms build a model based on sample data, known as "training data," in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, such as email filtering and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.`,
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pdfUrl: 'https://www.example.com/ml-intro.pdf',
    videoUrl: 'https://www.youtube.com/embed/mJeNghZXtMo',
    subject: 'Computer Science'
  },
  {
    id: '2',
    title: 'Understanding Data Structures',
    content: `Data structures are specialized formats for organizing, processing, retrieving and storing data. They provide a means to manage large amounts of data efficiently for uses such as large databases and internet indexing services.

There are several basic and advanced types of data structures, all designed to arrange data to suit a specific purpose. They make it easy for users to access and work with the data they need in appropriate ways.`,
    imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pdfUrl: 'https://www.example.com/data-structures.pdf',
    videoUrl: 'https://www.youtube.com/embed/bum_19loj9A',
    subject: 'Computer Science'
  }
];

export const questions: Question[] = [
  {
    id: '1',
    text: 'What is the value of x in the equation 2x + 5 = 13?',
    options: [
      '2',
      '4',
      '6',
      '8'
    ],
    correctAnswer: 1,
    explanation: 'To solve 2x + 5 = 13, subtract 5 from both sides: 2x = 8, then divide both sides by 2: x = 4',
    subject: 'Mathematics'
  },
  {
    id: '2',
    text: 'If a triangle has angles measuring 30° and 60°, what is the measure of the third angle?',
    options: [
      '60°',
      '90°',
      '120°',
      '180°'
    ],
    correctAnswer: 1,
    explanation: 'The angles in a triangle sum to 180°. If two angles are 30° and 60°, then 180° - (30° + 60°) = 90°',
    subject: 'Mathematics'
  }
];