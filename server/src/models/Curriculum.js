import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    questionId: { type: String, trim: true, default: null },
    q: { type: String, required: true },
    options: { type: [String], required: true, validate: (v) => v.length >= 2 },
    answer: { type: String, required: true },
    explanation: { type: String, default: '' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    topic: { type: String, default: null },
  },
  { _id: true },
);

const lessonSchema = new Schema(
  {
    title: String,
    durationMinutes: { type: Number, default: 5 },
    sizeKb: { type: Number, default: 20 },
    content: { type: String, default: '' },
    blocks: { type: Schema.Types.Mixed, default: [] },
  },
  { _id: false },
);

const noteSchema = new Schema(
  {
    title: String,
    content: { type: String, default: '' },
    sections: { type: Schema.Types.Mixed, default: [] },
    formulas: { type: Schema.Types.Mixed, default: [] },
  },
  { _id: false },
);

const chapterSchema = new Schema(
  {
    chapterId: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    topics: { type: [String], default: [] },
    prerequisites: { type: [String], default: [] },
    lesson: { type: lessonSchema, default: () => ({}) },
    notes: { type: noteSchema, default: () => ({}) },
    quiz: { type: [questionSchema], default: [] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const courseSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    grade: { type: String, required: true, trim: true, index: true },
    subject: { type: String, required: true, trim: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    language: { type: String, default: 'hi' },
    icon: { type: String, default: '📘' },
    color: { type: String, default: '#2563eb' },
    chapters: { type: [chapterSchema], default: [] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

courseSchema.index({ grade: 1, subject: 1 });
courseSchema.index(
  { title: 'text', description: 'text', 'chapters.title': 'text', 'chapters.topics': 'text' },
  { default_language: 'english', language_override: 'textLanguage', name: 'curriculum_search_text' },
);

export const QuestionModel = mongoose.model('Question', questionSchema);
export const Course = mongoose.model('Course', courseSchema);
export default Course;
