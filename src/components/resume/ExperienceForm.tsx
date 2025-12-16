import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/resume';
import { Plus, Trash2, Building2, Briefcase, Calendar, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ExperienceFormProps {
  data: Experience[];
  onAdd: (experience: Experience) => void;
  onUpdate: (id: string, experience: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceForm({ data, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
  });

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      onAdd({
        id: uuidv4(),
        company: newExperience.company || '',
        position: newExperience.position || '',
        startDate: newExperience.startDate || '',
        endDate: newExperience.endDate || '',
        current: newExperience.current || false,
        description: newExperience.description || '',
        achievements: newExperience.achievements || [],
      });
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {data.map((exp, index) => (
        <div
          key={exp.id}
          className="p-4 rounded-lg border border-border bg-secondary/30 space-y-4"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{exp.position}</h4>
              <p className="text-sm text-muted-foreground">{exp.company}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(exp.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                className="h-9"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-${exp.id}`}
              checked={exp.current}
              onCheckedChange={(checked) => onUpdate(exp.id, { current: checked as boolean })}
            />
            <Label htmlFor={`current-${exp.id}`} className="text-sm text-muted-foreground">
              Currently working here
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Description & Achievements</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
              placeholder="Describe your responsibilities and key achievements..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="p-4 rounded-lg border border-primary/30 bg-secondary/30 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                Company
              </Label>
              <Input
                placeholder="Company name"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                Position
              </Label>
              <Input
                placeholder="Job title"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Start Date
              </Label>
              <Input
                type="month"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                End Date
              </Label>
              <Input
                type="month"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                disabled={newExperience.current}
                className="h-9"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current-new"
              checked={newExperience.current}
              onCheckedChange={(checked) => setNewExperience({ ...newExperience, current: checked as boolean })}
            />
            <Label htmlFor="current-new" className="text-sm text-muted-foreground">
              Currently working here
            </Label>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">Description</Label>
            <Textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              placeholder="Describe your responsibilities and key achievements..."
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAdd} className="flex-1">
              Add Experience
            </Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No experience added yet</p>
          <p className="text-sm">Add your work history to strengthen your resume</p>
        </div>
      )}
    </div>
  );
}
