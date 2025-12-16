import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (field: string, value: string) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2 text-muted-foreground">
          <User className="w-4 h-4" />
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          Location
        </Label>
        <Input
          id="location"
          placeholder="San Francisco, CA"
          value={data.location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2 text-muted-foreground">
            <Linkedin className="w-4 h-4" />
            LinkedIn (optional)
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-4 h-4" />
            Website (optional)
          </Label>
          <Input
            id="website"
            placeholder="johndoe.com"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-muted-foreground">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          placeholder="A brief summary highlighting your key qualifications and career objectives..."
          value={data.summary}
          onChange={(e) => onChange('summary', e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          Tip: Keep it concise (2-3 sentences) and focus on your value proposition
        </p>
      </div>
    </div>
  );
}
