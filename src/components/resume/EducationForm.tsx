import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Education } from '@/types/resume';
import { Plus, Trash2, GraduationCap, Building, BookOpen, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface EducationFormProps {
  data: Education[];
  onAdd: (education: Education) => void;
  onUpdate: (id: string, education: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ data, onAdd, onUpdate, onRemove }: EducationFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const handleAdd = () => {
    if (newEducation.institution && newEducation.degree) {
      onAdd({
        id: uuidv4(),
        institution: newEducation.institution || '',
        degree: newEducation.degree || '',
        field: newEducation.field || '',
        startDate: newEducation.startDate || '',
        endDate: newEducation.endDate || '',
        gpa: newEducation.gpa,
      });
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {data.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 rounded-lg border border-border bg-secondary/30 space-y-4"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{edu.degree}</h4>
              <p className="text-sm text-muted-foreground">{edu.institution}</p>
              {edu.field && <p className="text-xs text-muted-foreground">{edu.field}</p>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(edu.id)}
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
                value={edu.startDate}
                onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                className="h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">GPA (optional)</Label>
            <Input
              value={edu.gpa || ''}
              onChange={(e) => onUpdate(edu.id, { gpa: e.target.value })}
              placeholder="3.8/4.0"
              className="h-9"
            />
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="p-4 rounded-lg border border-primary/30 bg-secondary/30 space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Building className="w-4 h-4" />
              Institution
            </Label>
            <Input
              placeholder="University name"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="w-4 h-4" />
                Degree
              </Label>
              <Input
                placeholder="Bachelor's, Master's, etc."
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                Field of Study
              </Label>
              <Input
                placeholder="Computer Science"
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
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
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
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
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                className="h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">GPA (optional)</Label>
            <Input
              value={newEducation.gpa || ''}
              onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
              placeholder="3.8/4.0"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAdd} className="flex-1">
              Add Education
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
          Add Education
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 text-muted-foreground">
          <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No education added yet</p>
          <p className="text-sm">Add your educational background</p>
        </div>
      )}
    </div>
  );
}
