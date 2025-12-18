import { useState, useCallback } from 'react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { TargetForm } from '@/components/resume/TargetForm';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ATSScoreCard } from '@/components/resume/ATSScoreCard';
import { JobMatchCard } from '@/components/resume/JobMatchCard';
import { ExportOptions } from '@/components/resume/ExportOptions';
import { SectionNav } from '@/components/resume/SectionNav';
import { Button } from '@/components/ui/button';
import { ATSScore, JobMatch } from '@/types/resume';
import { Sparkles, FileText, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const { toast } = useToast();
  const {
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
  } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null);

  // Calculate ATS Score based on resume content
  const calculateATSScore = useCallback((): ATSScore => {
    const { personalInfo, experience, education, skills } = resumeData;
    const suggestions: string[] = [];
    
    let keywordsScore = 50;
    let formattingScore = 70;
    let readabilityScore = 60;

    // Check personal info completeness
    if (personalInfo.fullName) keywordsScore += 5;
    if (personalInfo.email) formattingScore += 5;
    if (personalInfo.phone) formattingScore += 5;
    if (personalInfo.summary) {
      keywordsScore += 10;
      if (personalInfo.summary.length < 50) {
        suggestions.push('Expand your professional summary to 2-3 sentences');
      }
    } else {
      suggestions.push('Add a professional summary');
    }

    // Check experience
    if (experience.length > 0) {
      keywordsScore += 15;
      readabilityScore += 10;
      experience.forEach(exp => {
        if (exp.description && exp.description.length > 100) {
          keywordsScore += 5;
        }
      });
    } else {
      suggestions.push('Add work experience to strengthen your resume');
    }

    // Check education
    if (education.length > 0) {
      formattingScore += 10;
    } else {
      suggestions.push('Include your educational background');
    }

    // Check skills
    if (skills.length > 0) {
      keywordsScore += Math.min(skills.length * 3, 15);
      if (skills.length < 5) {
        suggestions.push('Add more relevant skills (aim for 8-12)');
      }
    } else {
      suggestions.push('Add technical and soft skills');
    }

    // Cap scores at 100
    keywordsScore = Math.min(keywordsScore, 100);
    formattingScore = Math.min(formattingScore, 100);
    readabilityScore = Math.min(readabilityScore, 100);

    const overall = Math.round((keywordsScore + formattingScore + readabilityScore) / 3);

    return {
      overall,
      keywords: keywordsScore,
      formatting: formattingScore,
      readability: readabilityScore,
      suggestions: suggestions.slice(0, 5),
    };
  }, [resumeData]);

  const atsScore = calculateATSScore();

  const handleJobAnalyze = async (jobDescription: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in production, this would call an AI service)
    setTimeout(() => {
      const keywords = jobDescription.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const skillNames = resumeData.skills.map(s => s.name.toLowerCase());
      
      const matched = keywords.filter(k => 
        skillNames.some(s => s.includes(k) || k.includes(s))
      ).slice(0, 8);
      
      const missing = keywords.filter(k => 
        !skillNames.some(s => s.includes(k) || k.includes(s)) && 
        ['experience', 'team', 'project', 'develop', 'manage', 'design', 'analysis', 'communication'].includes(k)
      ).slice(0, 6);

      setJobMatch({
        score: Math.min(90, 40 + matched.length * 8),
        matchedKeywords: matched,
        missingKeywords: missing,
        suggestions: [
          'Consider adding more industry-specific keywords',
          'Quantify your achievements with metrics',
          'Tailor your summary to match the job requirements',
        ],
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleExport = async (format: 'pdf' | 'docx' | 'html') => {
    setIsExporting(true);
    const filename = `${resumeData.personalInfo.fullName || 'resume'}-resume`.replace(/\s+/g, '-').toLowerCase();
    
    try {
      const { exportToPDF, exportToHTML, exportToDOCX } = await import('@/lib/resumeExport');
      
      switch (format) {
        case 'pdf':
          await exportToPDF('resume-preview', filename);
          break;
        case 'html':
          exportToHTML(resumeData, selectedTemplate, filename);
          break;
        case 'docx':
          await exportToDOCX(resumeData, filename);
          break;
      }
      
      toast({
        title: 'Export Successful',
        description: `Your resume has been downloaded as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting your resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    resetResume();
    setJobMatch(null);
    toast({
      title: 'Resume Reset',
      description: 'Your resume has been cleared',
    });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onAdd={addSkill}
            onRemove={removeSkill}
          />
        );
      case 'target':
        return (
          <TargetForm
            targetRole={resumeData.targetRole || ''}
            targetIndustry={resumeData.targetIndustry || ''}
            onChange={updateTargetInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl text-foreground">ResumeAI</h1>
                <p className="text-xs text-muted-foreground">Intelligent Resume Builder</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="gold" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Enhance
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-xl p-4">
              <SectionNav
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            <div className="glass rounded-xl p-6">
              {renderActiveSection()}
            </div>

            <div className="glass rounded-xl p-4">
              <h3 className="font-display text-sm text-foreground mb-3">Template</h3>
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
            </div>
          </div>

          {/* Center - Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="glass rounded-xl p-4 mb-4">
                <h3 className="font-display text-sm text-foreground mb-3">Preview</h3>
                <div className="aspect-[8.5/11] overflow-hidden rounded-lg border border-border">
                  <div className="w-full h-full overflow-auto scale-[0.6] origin-top-left" style={{ width: '166.67%', height: '166.67%' }}>
                    <div id="resume-preview">
                      <ResumePreview data={resumeData} template={selectedTemplate} />
                    </div>
                  </div>
                </div>
              </div>
              
              <ExportOptions onExport={handleExport} isExporting={isExporting} />
            </div>
          </div>

          {/* Right Panel - Analytics */}
          <div className="lg:col-span-3 space-y-4">
            <ATSScoreCard score={atsScore} />
            <JobMatchCard
              jobMatch={jobMatch}
              onAnalyze={handleJobAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
