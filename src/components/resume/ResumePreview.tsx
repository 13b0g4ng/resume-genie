import { ResumeData, TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills } = data;

  const templateStyles = {
    professional: {
      container: 'bg-white text-slate-800',
      header: 'border-b-2 border-slate-800',
      accent: 'text-slate-800',
      section: 'border-b border-slate-200',
      sectionTitle: 'text-slate-800 border-b-2 border-slate-800',
    },
    modern: {
      container: 'bg-slate-50 text-slate-800',
      header: 'bg-cyan-600 text-white -m-6 mb-4 p-6',
      accent: 'text-cyan-600',
      section: 'border-b border-slate-200',
      sectionTitle: 'text-cyan-600',
    },
    creative: {
      container: 'bg-gradient-to-br from-purple-50 to-pink-50 text-slate-800',
      header: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white -m-6 mb-4 p-6 rounded-b-3xl',
      accent: 'text-purple-600',
      section: '',
      sectionTitle: 'text-purple-600 bg-purple-100 px-3 py-1 rounded-full inline-block',
    },
  };

  const styles = templateStyles[template];

  const isEmpty = !personalInfo.fullName && experience.length === 0 && education.length === 0;

  if (isEmpty) {
    return (
      <div className={cn('w-full h-full rounded-lg p-6 flex items-center justify-center', styles.container)}>
        <div className="text-center text-slate-400">
          <p className="text-lg font-medium">Your resume preview will appear here</p>
          <p className="text-sm mt-2">Start filling in your information on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full rounded-lg p-6 shadow-lg', styles.container)}>
      {/* Header */}
      <header className={cn('pb-4 mb-4', styles.header)}>
        <h1 className={cn('text-2xl font-bold', template !== 'professional' && 'text-inherit')}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={cn('flex flex-wrap gap-3 mt-2 text-sm', template !== 'professional' ? 'opacity-90' : 'text-slate-600')}>
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className={cn('pb-4 mb-4', styles.section)}>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-2', styles.sectionTitle)}>
            Summary
          </h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className={cn('pb-4 mb-4', styles.section)}>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-3', styles.sectionTitle)}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={cn('font-semibold', styles.accent)}>{exp.position}</h3>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm mt-2 text-slate-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className={cn('pb-4 mb-4', styles.section)}>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-3', styles.sectionTitle)}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={cn('font-semibold', styles.accent)}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-xs text-slate-500 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-3', styles.sectionTitle)}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className={cn(
                  'px-2 py-1 text-xs rounded-full',
                  template === 'professional' && 'bg-slate-100 text-slate-700',
                  template === 'modern' && 'bg-cyan-100 text-cyan-700',
                  template === 'creative' && 'bg-purple-100 text-purple-700'
                )}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
