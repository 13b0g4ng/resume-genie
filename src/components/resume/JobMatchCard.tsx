import { useState } from 'react';
import { JobMatch } from '@/types/resume';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Search, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobMatchCardProps {
  jobMatch: JobMatch | null;
  onAnalyze: (jobDescription: string) => void;
  isAnalyzing: boolean;
}

export function JobMatchCard({ jobMatch, onAnalyze, isAnalyzing }: JobMatchCardProps) {
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      onAnalyze(jobDescription);
    }
  };

  return (
    <div className="p-4 rounded-xl glass space-y-4">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg text-foreground">Job Match</h3>
      </div>

      <Textarea
        placeholder="Paste a job description to analyze how well your resume matches..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="min-h-[100px] text-sm"
      />

      <Button
        onClick={handleAnalyze}
        disabled={!jobDescription.trim() || isAnalyzing}
        className="w-full"
        variant="gold"
      >
        {isAnalyzing ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            Analyze Match
          </>
        )}
      </Button>

      {jobMatch && (
        <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Match Score</span>
            <span
              className={cn(
                'text-2xl font-bold',
                jobMatch.score >= 80
                  ? 'text-ats-excellent'
                  : jobMatch.score >= 60
                  ? 'text-ats-good'
                  : jobMatch.score >= 40
                  ? 'text-ats-fair'
                  : 'text-ats-poor'
              )}
            >
              {jobMatch.score}%
            </span>
          </div>

          {jobMatch.matchedKeywords.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-ats-excellent" />
                Matched Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {jobMatch.matchedKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-ats-excellent/10 text-ats-excellent text-xs"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {jobMatch.missingKeywords.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <XCircle className="w-3 h-3 text-ats-poor" />
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {jobMatch.missingKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-ats-poor/10 text-ats-poor text-xs"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {jobMatch.suggestions.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">
                Recommendations
              </h4>
              <ul className="space-y-1">
                {jobMatch.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-xs text-muted-foreground pl-3 relative">
                    <span className="absolute left-0">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
