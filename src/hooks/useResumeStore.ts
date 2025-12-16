import { useState, useCallback } from 'react';
import { ResumeData, TemplateType, Experience, Education, Skill } from '@/types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  targetRole: '',
  targetIndustry: '',
};

export function useResumeStore() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('professional');
  const [activeSection, setActiveSection] = useState<string>('personal');

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  }, []);

  const addExperience = useCallback((experience: Experience) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));
  }, []);

  const updateExperience = useCallback((id: string, experience: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  }, []);

  const addEducation = useCallback((education: Education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education],
    }));
  }, []);

  const updateEducation = useCallback((id: string, education: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  }, []);

  const addSkill = useCallback((skill: Skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  }, []);

  const updateTargetInfo = useCallback((field: 'targetRole' | 'targetIndustry', value: string) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetResume = useCallback(() => {
    setResumeData(initialResumeData);
  }, []);

  return {
    resumeData,
    selectedTemplate,
    activeSection,
    setSelectedTemplate,
    setActiveSection,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    updateTargetInfo,
    resetResume,
    setResumeData,
  };
}
