import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function exportToPDF(element: HTMLElement, fileName: string = 'resume.pdf'): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (_clonedDoc, clonedEl) => {
        const el = clonedEl as HTMLElement;
        el.style.position = 'fixed';
        el.style.left = '0';
        el.style.top = '0';
        el.style.zIndex = '-1';
        el.querySelectorAll('*').forEach((node) => {
          (node as HTMLElement).style.transition = 'none';
          (node as HTMLElement).style.animation = 'none';
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

    // Image dimensions in PDF mm
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width; // mm

    // Template top padding: CSS px → mm
    const topPaddingPx = parseFloat(getComputedStyle(element).paddingTop) || 0;
    const topPaddingMm = topPaddingPx * 25.4 / 96;

    // Canvas pixels per mm of template content
    const pxPerMm = canvas.height / imgHeight; // px / mm
    const pageHeightPx = Math.round(pxPerMm * pdfHeight); // how many canvas px = one PDF page

    // Total pages needed
    const pageCount = Math.ceil(imgHeight / pdfHeight);

    console.log('[PDF] canvas:', canvas.width, 'x', canvas.height,
      ' | imgH:', imgHeight.toFixed(1), 'mm',
      ' | topPad:', topPaddingMm.toFixed(2), 'mm',
      ' | pxPerMm:', pxPerMm.toFixed(2),
      ' | pageHpx:', pageHeightPx,
      ' | pages:', pageCount);

    // ===================================================================
    // Page 1: render full canvas. Template's top padding appears at top.
    // ===================================================================
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // ===================================================================
    // Pages 2+: each page shows the NEXT slice of the canvas.
    // Extract: from (page-1) × pageHeight to bottom of canvas.
    // Render at PDF y=0 → content starts at page top, no padding repeat.
    // ===================================================================
    for (let page = 2; page <= pageCount; page++) {
      // Top edge of this page's slice in canvas pixels
      const sliceTopPx = (page - 1) * pageHeightPx;
      const sliceHeightPx = canvas.height - sliceTopPx;

      if (sliceHeightPx <= 0) break;

      pdf.addPage();
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

      // Extract slice: full canvas width, from sliceTopPx to bottom
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeightPx;
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(
        canvas,
        0, sliceTopPx, canvas.width, sliceHeightPx,
        0, 0, canvas.width, sliceHeightPx
      );

      // Convert slice height back to PDF mm (same px/mm ratio)
      const sliceImgHeightMm = sliceHeightPx / pxPerMm;

      // Render at y=0 → the slice top aligns with page top (no padding on page 2+)
      pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG',
        0, 0, imgWidth, sliceImgHeightMm);
    }

    pdf.save(fileName);
  } catch (err) {
    console.error('PDF export failed:', err);
    throw err;
  }
}
