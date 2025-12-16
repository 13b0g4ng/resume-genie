import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Building2 } from 'lucide-react';

interface TargetFormProps {
  targetRole: string;
  targetIndustry: string;
  onChange: (field: 'targetRole' | 'targetIndustry', value: string) => void;
}

export function TargetForm({ targetRole, targetIndustry, onChange }: TargetFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          Specifying your target role and industry helps us optimize your resume with relevant keywords and suggestions.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetRole" className="flex items-center gap-2 text-muted-foreground">
          <Target className="w-4 h-4" />
          Target Job Role
        </Label>
        <Input
          id="targetRole"
          placeholder="e.g., Senior Software Engineer, Product Manager"
          value={targetRole}
          onChange={(e) => onChange('targetRole', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetIndustry" className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="w-4 h-4" />
          Target Industry
        </Label>
        <Input
          id="targetIndustry"
          placeholder="e.g., Technology, Healthcare, Finance"
          value={targetIndustry}
          onChange={(e) => onChange('targetIndustry', e.target.value)}
        />
      </div>

      <div className="p-4 rounded-lg bg-secondary/30 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Why this matters</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Industry-specific keyword optimization</li>
          <li>• Better ATS compatibility scoring</li>
          <li>• Tailored content suggestions</li>
          <li>• More accurate job match analysis</li>
        </ul>
      </div>
    </div>
  );
}
