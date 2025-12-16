import { Button } from '@/components/ui/button';
import { FileText, FileCode, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExportOptionsProps {
  onExport: (format: 'pdf' | 'docx' | 'html') => void;
  isExporting: boolean;
}

export function ExportOptions({ onExport, isExporting }: ExportOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gold" size="lg" disabled={isExporting} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Resume'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onExport('pdf')}>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('docx')}>
          <FileText className="w-4 h-4 mr-2" />
          Export as DOCX
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport('html')}>
          <FileCode className="w-4 h-4 mr-2" />
          Export as HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
