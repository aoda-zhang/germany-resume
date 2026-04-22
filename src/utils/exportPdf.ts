/**
 * PDF export using browser native print (window.print).
 * This produces perfect PDFs with automatic page breaks that never cut text.
 * Uses CSS @media print for layout control.
 *
 * @param fileName - The PDF filename WITHOUT .pdf extension (e.g. "aoda-zhang-fullstack-developer").
 *                  The browser's Save as PDF dialog will use this as the default filename.
 */
export async function exportToPDF(fileName: string = 'resume'): Promise<void> {
  const originalTitle = document.title;
  document.title = fileName;

  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 100);
}
