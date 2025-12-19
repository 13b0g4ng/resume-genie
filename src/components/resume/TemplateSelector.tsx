import { TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Check, Briefcase, Sparkles, Palette, Layout, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates: {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  icon: typeof Briefcase;
  bestFor: string[];
  features: string[];
  industries: string[];
  placeholderContent: {
    name: string;
    title: string;
    summary: string;
  };
}[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, traditional design perfect for corporate environments',
    preview: 'bg-gradient-to-br from-slate-100 to-slate-200',
    icon: Briefcase,
    bestFor: ['Senior roles', 'Management positions', 'Traditional industries'],
    features: ['Classic typography', 'Structured layout', 'ATS-optimized', 'Conservative styling'],
    industries: ['Finance', 'Law', 'Healthcare', 'Government', 'Consulting'],
    placeholderContent: {
      name: 'John Anderson',
      title: 'Senior Financial Analyst',
      summary: 'Results-driven financial professional with 8+ years of experience in corporate finance, budgeting, and strategic planning. Proven track record of improving operational efficiency and delivering actionable insights.',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary look with subtle accent colors',
    preview: 'bg-gradient-to-br from-sky-100 to-blue-200',
    icon: Sparkles,
    bestFor: ['Tech roles', 'Startups', 'Mid-career professionals'],
    features: ['Clean lines', 'Color accents', 'Balanced whitespace', 'Modern typography'],
    industries: ['Technology', 'Marketing', 'E-commerce', 'SaaS', 'Product'],
    placeholderContent: {
      name: 'Sarah Mitchell',
      title: 'Product Manager',
      summary: 'Innovative product leader with expertise in agile methodologies and user-centered design. Successfully launched 5+ products generating $10M+ in revenue.',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Elegant layout with refined visual elements',
    preview: 'bg-gradient-to-br from-blue-100 to-indigo-200',
    icon: Palette,
    bestFor: ['Creative roles', 'Design positions', 'Portfolio careers'],
    features: ['Unique layout', 'Visual hierarchy', 'Personality-driven', 'Eye-catching'],
    industries: ['Design', 'Advertising', 'Media', 'Entertainment', 'Arts'],
    placeholderContent: {
      name: 'Emily Chen',
      title: 'UX Design Lead',
      summary: 'Award-winning designer passionate about creating intuitive digital experiences. Led design systems for Fortune 500 clients with measurable impact on user engagement.',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with maximum whitespace and clarity',
    preview: 'bg-gradient-to-br from-gray-50 to-slate-100',
    icon: Layout,
    bestFor: ['Executive roles', 'Consulting', 'Research positions'],
    features: ['Maximum clarity', 'Distraction-free', 'Timeless design', 'Print-ready'],
    industries: ['Academia', 'Research', 'Executive', 'Non-profit', 'Publishing'],
    placeholderContent: {
      name: 'Michael Roberts',
      title: 'Management Consultant',
      summary: 'Strategic consultant specializing in organizational transformation and operational excellence. Advised C-suite executives across 20+ industries.',
    },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior leadership positions',
    preview: 'bg-gradient-to-br from-slate-200 to-blue-200',
    icon: Award,
    bestFor: ['C-level positions', 'Board members', 'Senior directors'],
    features: ['Premium feel', 'Authority-driven', 'Refined typography', 'Distinguished look'],
    industries: ['Banking', 'Corporate', 'Investment', 'Insurance', 'Legal'],
    placeholderContent: {
      name: 'David Thompson',
      title: 'Chief Operating Officer',
      summary: 'Visionary executive with 15+ years leading global operations. Delivered $50M+ in cost savings while scaling organizations from startup to enterprise.',
    },
  },
];

function TemplatePreviewMini({ template }: { template: typeof templates[0] }) {
  const colorMap = {
    professional: { header: 'bg-slate-700', accent: 'bg-slate-500', text: 'bg-slate-300' },
    modern: { header: 'bg-sky-600', accent: 'bg-sky-400', text: 'bg-slate-300' },
    creative: { header: 'bg-blue-600', accent: 'bg-indigo-400', text: 'bg-slate-300' },
    minimal: { header: 'bg-slate-600', accent: 'bg-slate-400', text: 'bg-slate-200' },
    executive: { header: 'bg-slate-800', accent: 'bg-blue-600', text: 'bg-slate-300' },
  };
  const colors = colorMap[template.id];

  return (
    <div className={cn('aspect-[3/4] w-full rounded-t-lg', template.preview)}>
      <div className="p-3 space-y-2">
        {/* Header */}
        <div className={cn('w-10 h-2 rounded-full', colors.header)} />
        <div className="flex gap-1">
          <div className={cn('w-6 h-1 rounded-full', colors.text)} />
          <div className={cn('w-8 h-1 rounded-full', colors.text)} />
        </div>
        {/* Section */}
        <div className="pt-2 space-y-1">
          <div className={cn('w-8 h-1.5 rounded-full', colors.accent)} />
          <div className={cn('w-full h-0.5 rounded-full', colors.text)} />
          <div className={cn('w-3/4 h-0.5 rounded-full', colors.text)} />
          <div className={cn('w-5/6 h-0.5 rounded-full', colors.text)} />
        </div>
        {/* Section 2 */}
        <div className="pt-1 space-y-1">
          <div className={cn('w-6 h-1.5 rounded-full', colors.accent)} />
          <div className={cn('w-full h-0.5 rounded-full', colors.text)} />
          <div className={cn('w-2/3 h-0.5 rounded-full', colors.text)} />
        </div>
      </div>
    </div>
  );
}

function TemplateDetailModal({ template, isSelected, onSelect }: { 
  template: typeof templates[0]; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = template.icon;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-[10px] text-primary hover:underline mt-1">View details</button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            {template.name} Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Preview with placeholder content */}
          <div className={cn('rounded-lg overflow-hidden border border-border p-4', template.preview)}>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{template.placeholderContent.name}</h3>
                <p className="text-sm text-slate-600">{template.placeholderContent.title}</p>
              </div>
              <div className="border-t border-slate-300 pt-3">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{template.placeholderContent.summary}</p>
              </div>
              <div className="border-t border-slate-300 pt-3">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Experience</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-slate-700">Senior Position</span>
                    <span className="text-xs text-slate-500">2020 - Present</span>
                  </div>
                  <p className="text-xs text-slate-500">Company Name • Location</p>
                </div>
              </div>
              <div className="border-t border-slate-300 pt-3">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {['Leadership', 'Strategy', 'Analytics'].map((skill) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 bg-slate-200 rounded text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Info */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{template.description}</p>
            
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1">Best For</h4>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {template.bestFor.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1">Features</h4>
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1">Recommended Industries</h4>
              <p className="text-xs text-muted-foreground">{template.industries.join(', ')}</p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-3 mt-4">
              <h4 className="text-xs font-semibold text-foreground mb-1">Sample Content</h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                This template includes structured placeholder content that you can easily copy and customize for your own resume.
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          variant={isSelected ? "secondary" : "default"} 
          className="w-full mt-4"
          onClick={onSelect}
          disabled={isSelected}
        >
          {isSelected ? 'Currently Selected' : 'Use This Template'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {templates.slice(0, 3).map((template) => {
          const Icon = template.icon;
          return (
            <div key={template.id} className="flex flex-col">
              <button
                onClick={() => onSelect(template.id)}
                className={cn(
                  'relative rounded-lg overflow-hidden transition-all duration-300 group',
                  selected === template.id
                    ? 'ring-2 ring-primary shadow-gold'
                    : 'ring-1 ring-border hover:ring-primary/50'
                )}
              >
                <TemplatePreviewMini template={template} />
                {selected === template.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div className="p-2 bg-card">
                  <div className="flex items-center gap-1">
                    <Icon className="w-3 h-3 text-primary" />
                    <p className="text-xs font-medium text-foreground">{template.name}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{template.description}</p>
                </div>
              </button>
              <div className="text-center">
                <TemplateDetailModal 
                  template={template} 
                  isSelected={selected === template.id}
                  onSelect={() => onSelect(template.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {templates.slice(3).map((template) => {
          const Icon = template.icon;
          return (
            <div key={template.id} className="flex flex-col">
              <button
                onClick={() => onSelect(template.id)}
                className={cn(
                  'relative rounded-lg overflow-hidden transition-all duration-300 group',
                  selected === template.id
                    ? 'ring-2 ring-primary shadow-gold'
                    : 'ring-1 ring-border hover:ring-primary/50'
                )}
              >
                <TemplatePreviewMini template={template} />
                {selected === template.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div className="p-2 bg-card">
                  <div className="flex items-center gap-1">
                    <Icon className="w-3 h-3 text-primary" />
                    <p className="text-xs font-medium text-foreground">{template.name}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{template.description}</p>
                </div>
              </button>
              <div className="text-center">
                <TemplateDetailModal 
                  template={template} 
                  isSelected={selected === template.id}
                  onSelect={() => onSelect(template.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
