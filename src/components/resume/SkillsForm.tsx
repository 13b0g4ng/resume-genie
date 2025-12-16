import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skill } from '@/types/resume';
import { Plus, X, Zap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SkillsFormProps {
  data: Skill[];
  onAdd: (skill: Skill) => void;
  onRemove: (id: string) => void;
}

const skillLevelColors = {
  beginner: 'bg-muted text-muted-foreground',
  intermediate: 'bg-secondary text-secondary-foreground',
  advanced: 'bg-primary/20 text-primary',
  expert: 'gradient-gold text-primary-foreground',
};

export function SkillsForm({ data, onAdd, onRemove }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermediate');

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAdd({
        id: uuidv4(),
        name: newSkill.trim(),
        level: skillLevel,
      });
      setNewSkill('');
      setSkillLevel('intermediate');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Select value={skillLevel} onValueChange={(value) => setSkillLevel(value as Skill['level'])}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAdd} disabled={!newSkill.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className={`${skillLevelColors[skill.level]} px-3 py-1.5 text-sm flex items-center gap-2 animate-fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {skill.name}
              <span className="text-xs opacity-70 capitalize">({skill.level})</span>
              <button
                onClick={() => onRemove(skill.id)}
                className="ml-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No skills added yet</p>
          <p className="text-sm">Add skills relevant to your target role</p>
        </div>
      )}

      <div className="p-4 rounded-lg bg-secondary/30 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Skill Level Guide</h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p><span className="font-medium">Beginner:</span> Basic knowledge, learning</p>
          <p><span className="font-medium">Intermediate:</span> Can work independently</p>
          <p><span className="font-medium">Advanced:</span> Strong proficiency, can mentor others</p>
          <p><span className="font-medium">Expert:</span> Industry-recognized expertise</p>
        </div>
      </div>
    </div>
  );
}
