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
        el.style.width = `${element.scrollWidth}px`;
        el.style.height = `${element.scrollHeight}px`;
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
    const imgWidth = pdfWidth;

    // Template top padding: CSS px → mm (1 CSS px = 1/96 inch = 25.4/96 mm)
    const topPaddingPx = parseFloat(getComputedStyle(element).paddingTop) || 0;
    const topPaddingMm = topPaddingPx * 25.4 / 96;

    // Total image height in mm (accounts for the overflow height beyond one page)
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    console.log('[PDF] topPadding:', topPaddingPx, 'px =', topPaddingMm.toFixed(2), 'mm | imgH:', imgHeight.toFixed(1), 'mm | pages:', Math.ceil(imgHeight / pdfHeight));

    // ---- Page 1: show from y=0 (the template's top padding appears at top — this is correct) ----
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // ---- Pages 2+: skip the top-padding slice from the image so content aligns with page top ----
    let sliceY = pdfHeight - topPaddingMm; // where in the image (mm) page 2 should start reading

    while (sliceY < imgHeight) {
      pdf.addPage();
      // Draw a white background first
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

      // Shift the image UP so that sliceY in the image aligns with page top (y=0 in PDF)
      const imgY = -sliceY;

      // Clip: only draw inside the page bounds
      pdf.saveGraphicsState();
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'CLIP NODRAW');
      pdf.clip();
      pdf.addImage(imgData, 'PNG', 0, imgY, imgWidth, imgHeight);
      pdf.restoreGraphicsState();

      sliceY += pdfHeight;
    }

    pdf.save(fileName);
  } catch (err) {
    console.error('PDF export failed:', err);
    throw err;
  }
}
