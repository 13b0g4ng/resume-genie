export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  targetRole?: string;
  targetIndustry?: string;
}

export type TemplateType = 'professional' | 'modern' | 'creative' | 'minimal' | 'executive';

export interface ATSScore {
  overall: number;
  keywords: number;
  formatting: number;
  readability: number;
  suggestions: string[];
}

export interface JobMatch {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}
