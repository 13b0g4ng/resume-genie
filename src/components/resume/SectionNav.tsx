import { cn } from '@/lib/utils';
import { User, Briefcase, GraduationCap, Zap, Target } from 'lucide-react';

interface SectionNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'target', label: 'Target', icon: Target },
];

export function SectionNav({ activeSection, onSectionChange }: SectionNavProps) {
  return (
    <nav className="flex gap-1 p-1 bg-secondary/50 rounded-lg">
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-primary text-primary-foreground shadow-gold'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
