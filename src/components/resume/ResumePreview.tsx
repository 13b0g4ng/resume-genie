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

// Placeholder content for empty states
const placeholderData = {
  professional: {
    name: 'John Anderson',
    title: 'Senior Financial Analyst',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    summary: 'Results-driven financial professional with 8+ years of experience in corporate finance, budgeting, and strategic planning. Proven track record of improving operational efficiency and delivering actionable insights to executive leadership.',
    experience: [
      { position: 'Senior Financial Analyst', company: 'Goldman Sachs', dates: '2020 - Present', description: 'Led financial modeling for $2B+ portfolio. Developed automated reporting systems reducing analysis time by 40%.' },
      { position: 'Financial Analyst', company: 'JP Morgan Chase', dates: '2016 - 2020', description: 'Managed quarterly forecasting and variance analysis for investment banking division.' },
    ],
    education: { degree: 'MBA, Finance', school: 'Columbia Business School', year: '2016' },
    skills: ['Financial Modeling', 'Data Analysis', 'Strategic Planning', 'Risk Management', 'Excel/VBA'],
  },
  modern: {
    name: 'Sarah Mitchell',
    title: 'Product Manager',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    summary: 'Innovative product leader with expertise in agile methodologies and user-centered design. Successfully launched 5+ products generating $10M+ in revenue. Passionate about building solutions that solve real customer problems.',
    experience: [
      { position: 'Senior Product Manager', company: 'Stripe', dates: '2021 - Present', description: 'Leading payments infrastructure product serving 100K+ merchants. Increased conversion rates by 25%.' },
      { position: 'Product Manager', company: 'Airbnb', dates: '2018 - 2021', description: 'Owned the host onboarding experience, improving activation rates by 35%.' },
    ],
    education: { degree: 'BS, Computer Science', school: 'Stanford University', year: '2018' },
    skills: ['Product Strategy', 'Agile/Scrum', 'User Research', 'SQL', 'A/B Testing'],
  },
  creative: {
    name: 'Emily Chen',
    title: 'UX Design Lead',
    email: 'emily.chen@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    summary: 'Award-winning designer passionate about creating intuitive digital experiences. Led design systems for Fortune 500 clients with measurable impact on user engagement and business outcomes.',
    experience: [
      { position: 'UX Design Lead', company: 'Meta', dates: '2020 - Present', description: 'Directing design strategy for Messenger, impacting 1B+ users. Built and scaled design system adopted across teams.' },
      { position: 'Senior UX Designer', company: 'Spotify', dates: '2017 - 2020', description: 'Redesigned playlist discovery experience, increasing user engagement by 45%.' },
    ],
    education: { degree: 'MFA, Interaction Design', school: 'School of Visual Arts', year: '2017' },
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Design Thinking'],
  },
  minimal: {
    name: 'Michael Roberts',
    title: 'Management Consultant',
    email: 'michael.roberts@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Boston, MA',
    summary: 'Strategic consultant specializing in organizational transformation and operational excellence. Advised C-suite executives across 20+ industries on digital transformation and growth strategies.',
    experience: [
      { position: 'Principal Consultant', company: 'McKinsey & Company', dates: '2019 - Present', description: 'Lead partner on $50M+ transformation engagements. Specialize in operational efficiency and organizational design.' },
      { position: 'Senior Consultant', company: 'Bain & Company', dates: '2015 - 2019', description: 'Delivered cost reduction initiatives saving clients $200M+ annually.' },
    ],
    education: { degree: 'MBA', school: 'Harvard Business School', year: '2015' },
    skills: ['Strategy', 'Change Management', 'Operations', 'Leadership', 'Analytics'],
  },
  executive: {
    name: 'David Thompson',
    title: 'Chief Operating Officer',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Chicago, IL',
    summary: 'Visionary executive with 15+ years leading global operations across technology and financial services. Delivered $50M+ in cost savings while scaling organizations from startup to enterprise.',
    experience: [
      { position: 'Chief Operating Officer', company: 'Fortune 500 Tech Company', dates: '2018 - Present', description: 'Oversee 5,000+ employees across 12 countries. Led digital transformation initiative resulting in 30% efficiency gains.' },
      { position: 'VP of Operations', company: 'Leading Financial Services Firm', dates: '2012 - 2018', description: 'Scaled operations from $100M to $1B in managed assets.' },
    ],
    education: { degree: 'MBA, Executive Management', school: 'Wharton School of Business', year: '2012' },
    skills: ['Executive Leadership', 'P&L Management', 'Strategic Planning', 'M&A', 'Board Relations'],
  },
};

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills } = data;

  const templateStyles = {
    professional: {
      container: 'bg-white text-slate-800',
      header: 'border-b-2 border-slate-800',
      accent: 'text-slate-800',
      section: 'border-b border-slate-200',
      sectionTitle: 'text-slate-800 border-b-2 border-slate-800',
      skillBg: 'bg-slate-100 text-slate-700',
    },
    modern: {
      container: 'bg-slate-50 text-slate-800',
      header: 'bg-sky-600 text-white -m-6 mb-4 p-6',
      accent: 'text-sky-600',
      section: 'border-b border-slate-200',
      sectionTitle: 'text-sky-600',
      skillBg: 'bg-sky-100 text-sky-700',
    },
    creative: {
      container: 'bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-800',
      header: 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white -m-6 mb-4 p-6 rounded-b-3xl',
      accent: 'text-blue-600',
      section: '',
      sectionTitle: 'text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block',
      skillBg: 'bg-blue-100 text-blue-700',
    },
    minimal: {
      container: 'bg-white text-slate-700',
      header: 'border-b border-slate-300 pb-4',
      accent: 'text-slate-700',
      section: 'border-b border-slate-200',
      sectionTitle: 'text-slate-600 uppercase tracking-widest text-xs',
      skillBg: 'bg-slate-100 text-slate-600',
    },
    executive: {
      container: 'bg-slate-50 text-slate-800',
      header: 'border-b-4 border-slate-800 pb-4',
      accent: 'text-slate-800',
      section: 'border-b border-slate-300',
      sectionTitle: 'text-slate-800 font-bold',
      skillBg: 'bg-slate-200 text-slate-700',
    },
  };

  const styles = templateStyles[template];
  const placeholder = placeholderData[template];

  const isEmpty = !personalInfo.fullName && experience.length === 0 && education.length === 0;

  // Show placeholder content when empty
  if (isEmpty) {
    return (
      <div className={cn('w-full rounded-lg p-6 shadow-lg', styles.container)}>
        {/* Header */}
        <header className={cn('pb-4 mb-4', styles.header)}>
          <h1 className={cn('text-2xl font-bold', template !== 'professional' && template !== 'minimal' && template !== 'executive' && 'text-inherit')}>
            {placeholder.name}
          </h1>
          <p className={cn('text-sm mt-1', template === 'modern' || template === 'creative' ? 'opacity-90' : 'text-slate-600')}>
            {placeholder.title}
          </p>
          
          <div className={cn('flex flex-wrap gap-3 mt-2 text-sm', template === 'modern' || template === 'creative' ? 'opacity-90' : 'text-slate-600')}>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {placeholder.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {placeholder.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {placeholder.location}
            </span>
          </div>
        </header>

        {/* Summary */}
        <section className={cn('pb-4 mb-4', styles.section)}>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-2', styles.sectionTitle)}>
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">{placeholder.summary}</p>
        </section>

        {/* Experience */}
        <section className={cn('pb-4 mb-4', styles.section)}>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-3', styles.sectionTitle)}>
            Experience
          </h2>
          <div className="space-y-4">
            {placeholder.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={cn('font-semibold', styles.accent)}>{exp.position}</h3>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-500">{exp.dates}</span>
                </div>
                <p className="text-sm mt-2 text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className={cn('pb-4 mb-4', styles.section)}>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-3', styles.sectionTitle)}>
            Education
          </h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={cn('font-semibold', styles.accent)}>{placeholder.education.degree}</h3>
              <p className="text-sm text-slate-600">{placeholder.education.school}</p>
            </div>
            <span className="text-xs text-slate-500">{placeholder.education.year}</span>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className={cn('text-sm font-bold uppercase tracking-wider mb-3', styles.sectionTitle)}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {placeholder.skills.map((skill) => (
              <span key={skill} className={cn('px-2 py-1 text-xs rounded-full', styles.skillBg)}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Hint */}
        <div className="mt-6 p-3 bg-slate-100 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            This is sample content. Start filling in your information on the left to replace it with your own.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full rounded-lg p-6 shadow-lg', styles.container)}>
      {/* Header */}
      <header className={cn('pb-4 mb-4', styles.header)}>
        <h1 className={cn('text-2xl font-bold', template !== 'professional' && template !== 'minimal' && template !== 'executive' && 'text-inherit')}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={cn('flex flex-wrap gap-3 mt-2 text-sm', template === 'modern' || template === 'creative' ? 'opacity-90' : 'text-slate-600')}>
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
              <span key={skill.id} className={cn('px-2 py-1 text-xs rounded-full', styles.skillBg)}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
