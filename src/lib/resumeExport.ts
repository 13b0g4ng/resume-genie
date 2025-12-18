import { ResumeData, TemplateType } from '@/types/resume';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Resume element not found');

  const html2pdf = (await import('html2pdf.js')).default;
  
  const opt = {
    margin: 0.5,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  await html2pdf().set(opt).from(element).save();
}

export function exportToHTML(data: ResumeData, template: TemplateType, filename: string): void {
  const { personalInfo, experience, education, skills } = data;

  const templateColors = {
    professional: { primary: '#1e293b', accent: '#1e293b', bg: '#ffffff' },
    modern: { primary: '#0891b2', accent: '#0891b2', bg: '#f8fafc' },
    creative: { primary: '#9333ea', accent: '#9333ea', bg: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)' },
  };

  const colors = templateColors[template];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.fullName || 'Resume'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', system-ui, sans-serif; 
      line-height: 1.6; 
      color: #334155;
      background: ${colors.bg};
      padding: 2rem;
    }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    header { border-bottom: 2px solid ${colors.primary}; padding-bottom: 1rem; margin-bottom: 1.5rem; }
    h1 { color: ${colors.primary}; font-size: 2rem; margin-bottom: 0.5rem; }
    .contact { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: #64748b; }
    section { margin-bottom: 1.5rem; }
    h2 { color: ${colors.accent}; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid ${colors.accent}; padding-bottom: 0.25rem; margin-bottom: 0.75rem; }
    .entry { margin-bottom: 1rem; }
    .entry-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .entry-title { font-weight: 600; color: ${colors.primary}; }
    .entry-subtitle { font-size: 0.875rem; color: #64748b; }
    .entry-date { font-size: 0.75rem; color: #94a3b8; }
    .entry-description { font-size: 0.875rem; margin-top: 0.5rem; }
    .skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .skill { background: #f1f5f9; color: #475569; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; }
    .summary { font-size: 0.9rem; color: #475569; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${personalInfo.fullName || 'Your Name'}</h1>
      <div class="contact">
        ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
        ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
        ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        ${personalInfo.linkedin ? `<span>🔗 ${personalInfo.linkedin}</span>` : ''}
        ${personalInfo.website ? `<span>🌐 ${personalInfo.website}</span>` : ''}
      </div>
    </header>

    ${personalInfo.summary ? `
    <section>
      <h2>Summary</h2>
      <p class="summary">${personalInfo.summary}</p>
    </section>
    ` : ''}

    ${experience.length > 0 ? `
    <section>
      <h2>Experience</h2>
      ${experience.map(exp => `
        <div class="entry">
          <div class="entry-header">
            <div>
              <div class="entry-title">${exp.position}</div>
              <div class="entry-subtitle">${exp.company}</div>
            </div>
            <div class="entry-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</div>
          </div>
          ${exp.description ? `<p class="entry-description">${exp.description}</p>` : ''}
        </div>
      `).join('')}
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <section>
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="entry">
          <div class="entry-header">
            <div>
              <div class="entry-title">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
              <div class="entry-subtitle">${edu.institution}</div>
            </div>
            <div class="entry-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</div>
          </div>
          ${edu.gpa ? `<p class="entry-description">GPA: ${edu.gpa}</p>` : ''}
        </div>
      `).join('')}
    </section>
    ` : ''}

    ${skills.length > 0 ? `
    <section>
      <h2>Skills</h2>
      <div class="skills">
        ${skills.map(skill => `<span class="skill">${skill.name}</span>`).join('')}
      </div>
    </section>
    ` : ''}
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  saveAs(blob, `${filename}.html`);
}

export async function exportToDOCX(data: ResumeData, filename: string): Promise<void> {
  const { personalInfo, experience, education, skills } = data;

  const children: Paragraph[] = [];

  // Name
  children.push(
    new Paragraph({
      children: [new TextRun({ text: personalInfo.fullName || 'Your Name', bold: true, size: 48 })],
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    })
  );

  // Contact info
  const contactParts: string[] = [];
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.location) contactParts.push(personalInfo.location);
  
  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contactParts.join(' | '), size: 20, color: '666666' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      })
    );
  }

  // Summary
  if (personalInfo.summary) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'SUMMARY', bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: personalInfo.summary, size: 22 })],
        spacing: { after: 300 },
      })
    );
  }

  // Experience
  if (experience.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'EXPERIENCE', bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    experience.forEach(exp => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position, bold: true, size: 22 }),
            new TextRun({ text: ` at ${exp.company}`, size: 22 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ 
              text: `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`, 
              size: 20, 
              color: '666666' 
            }),
          ],
          spacing: { after: 100 },
        })
      );
      if (exp.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: exp.description, size: 22 })],
            spacing: { after: 200 },
          })
        );
      }
    });
  }

  // Education
  if (education.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`, bold: true, size: 22 }),
          ],
        }),
        new Paragraph({
          children: [new TextRun({ text: edu.institution, size: 22 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ 
              text: `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`, 
              size: 20, 
              color: '666666' 
            }),
          ],
          spacing: { after: 200 },
        })
      );
    });
  }

  // Skills
  if (skills.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'SKILLS', bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: skills.map(s => s.name).join(' • '), size: 22 })],
      })
    );
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
}
