import { TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Check, Briefcase, Sparkles, Palette } from 'lucide-react';
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
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary look with subtle accent colors',
    preview: 'bg-gradient-to-br from-cyan-100 to-blue-200',
    icon: Sparkles,
    bestFor: ['Tech roles', 'Startups', 'Mid-career professionals'],
    features: ['Clean lines', 'Color accents', 'Balanced whitespace', 'Modern typography'],
    industries: ['Technology', 'Marketing', 'E-commerce', 'SaaS', 'Product'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and expressive layout that stands out',
    preview: 'bg-gradient-to-br from-purple-100 to-pink-200',
    icon: Palette,
    bestFor: ['Creative roles', 'Design positions', 'Portfolio careers'],
    features: ['Unique layout', 'Visual hierarchy', 'Personality-driven', 'Eye-catching'],
    industries: ['Design', 'Advertising', 'Media', 'Entertainment', 'Arts'],
  },
];

function TemplatePreviewMini({ template }: { template: typeof templates[0] }) {
  const colorMap = {
    professional: { header: 'bg-slate-700', accent: 'bg-slate-500', text: 'bg-slate-300' },
    modern: { header: 'bg-cyan-600', accent: 'bg-cyan-400', text: 'bg-slate-300' },
    creative: { header: 'bg-purple-600', accent: 'bg-pink-400', text: 'bg-slate-300' },
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary" />
            {template.name} Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Preview */}
          <div className={cn('rounded-lg overflow-hidden border border-border', template.preview)}>
            <div className="p-4 space-y-3">
              <div className="w-16 h-3 bg-slate-600 rounded-full" />
              <div className="flex gap-2">
                <div className="w-10 h-1.5 bg-slate-400 rounded-full" />
                <div className="w-12 h-1.5 bg-slate-400 rounded-full" />
              </div>
              <div className="pt-3 space-y-1.5">
                <div className="w-12 h-2 bg-slate-500 rounded-full" />
                <div className="w-full h-1 bg-slate-300 rounded-full" />
                <div className="w-4/5 h-1 bg-slate-300 rounded-full" />
                <div className="w-full h-1 bg-slate-300 rounded-full" />
              </div>
              <div className="pt-2 space-y-1.5">
                <div className="w-10 h-2 bg-slate-500 rounded-full" />
                <div className="w-full h-1 bg-slate-300 rounded-full" />
                <div className="w-3/4 h-1 bg-slate-300 rounded-full" />
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
          </div>
        </div>
        
        <Button 
          variant={isSelected ? "secondary" : "gold"} 
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
    <div className="grid grid-cols-3 gap-3">
      {templates.map((template) => {
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
  );
}
