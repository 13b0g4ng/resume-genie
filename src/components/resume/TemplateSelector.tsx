import { TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string; description: string; preview: string }[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional design',
    preview: 'bg-gradient-to-br from-slate-100 to-slate-200',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary with accent colors',
    preview: 'bg-gradient-to-br from-cyan-100 to-blue-200',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and expressive layout',
    preview: 'bg-gradient-to-br from-purple-100 to-pink-200',
  },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={cn(
            'relative rounded-lg overflow-hidden transition-all duration-300 group',
            selected === template.id
              ? 'ring-2 ring-primary shadow-gold'
              : 'ring-1 ring-border hover:ring-primary/50'
          )}
        >
          <div className={cn('aspect-[3/4] w-full', template.preview)}>
            <div className="p-2 space-y-1">
              <div className="w-8 h-1.5 bg-slate-400 rounded-full" />
              <div className="w-12 h-1 bg-slate-300 rounded-full" />
              <div className="w-10 h-1 bg-slate-300 rounded-full" />
              <div className="mt-2 space-y-0.5">
                <div className="w-full h-0.5 bg-slate-300 rounded-full" />
                <div className="w-3/4 h-0.5 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
          {selected === template.id && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
          <div className="p-2 bg-card">
            <p className="text-xs font-medium text-foreground">{template.name}</p>
            <p className="text-[10px] text-muted-foreground">{template.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
