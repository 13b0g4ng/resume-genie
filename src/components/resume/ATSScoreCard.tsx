import { ATSScore } from '@/types/resume';
import { cn } from '@/lib/utils';
import { TrendingUp, FileText, Type, BookOpen, AlertCircle } from 'lucide-react';

interface ATSScoreCardProps {
  score: ATSScore;
}

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-ats-excellent';
    if (score >= 60) return 'text-ats-good';
    if (score >= 40) return 'text-ats-fair';
    return 'text-ats-poor';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return 'stroke-ats-excellent';
    if (score >= 60) return 'stroke-ats-good';
    if (score >= 40) return 'stroke-ats-fair';
    return 'stroke-ats-poor';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn('transition-all duration-1000 ease-out', getStrokeColor(score))}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn('text-xl font-bold', getScoreColor(score))}>{score}</span>
      </div>
    </div>
  );
}

function MetricBar({ label, score, icon: Icon }: { label: string; score: number; icon: React.ElementType }) {
  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-ats-excellent';
    if (score >= 60) return 'bg-ats-good';
    if (score >= 40) return 'bg-ats-fair';
    return 'bg-ats-poor';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon className="w-3.5 h-3.5" />
          {label}
        </span>
        <span className="font-medium text-foreground">{score}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', getBarColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ATSScoreCard({ score }: ATSScoreCardProps) {
  return (
    <div className="p-4 rounded-xl glass space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-foreground">ATS Score</h3>
          <p className="text-xs text-muted-foreground">Compatibility rating</p>
        </div>
        <ScoreRing score={score.overall} />
      </div>

      <div className="space-y-3">
        <MetricBar label="Keywords" score={score.keywords} icon={TrendingUp} />
        <MetricBar label="Formatting" score={score.formatting} icon={FileText} />
        <MetricBar label="Readability" score={score.readability} icon={BookOpen} />
      </div>

      {score.suggestions.length > 0 && (
        <div className="pt-3 border-t border-border">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Suggestions
          </h4>
          <ul className="space-y-1">
            {score.suggestions.slice(0, 3).map((suggestion, index) => (
              <li key={index} className="text-xs text-muted-foreground pl-3 relative">
                <span className="absolute left-0">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
