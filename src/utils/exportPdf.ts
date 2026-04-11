import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export async function exportToPDF(element: HTMLElement, fileName: string = 'resume.pdf'): Promise<void> {
  try {
    // Log element dimensions BEFORE html2canvas
    console.log('[PDF DEBUG] element.scrollWidth:', element.scrollWidth, 'scrollHeight:', element.scrollHeight);
    console.log('[PDF DEBUG] element.offsetWidth:', element.offsetWidth, 'offsetHeight:', element.offsetHeight);
    const style = getComputedStyle(element);
    console.log('[PDF DEBUG] paddingTop:', style.paddingTop, 'paddingLeft:', style.paddingLeft);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,  // verbose for debugging
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

    console.log('[PDF DEBUG] canvas width:', canvas.width, 'height:', canvas.height);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

    // Image dimensions in PDF mm
    const imgWidth = pdfWidth;  // 210mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width; // total template height in mm

    // Template top padding in mm
    const topPaddingPx = parseFloat(getComputedStyle(element).paddingTop) || 0;
    // CSS px → mm: 1px = 25.4/96 mm
    const pxToMm = 25.4 / 96;
    const topPaddingMm = topPaddingPx * pxToMm;

    // Canvas pixels per mm of image
    const pxPerMm = canvas.height / imgHeight; // px/mm

    // PDF page height in canvas pixels
    const pageHeightPx = Math.round(pxPerMm * pdfHeight);

    const pageCount = Math.ceil(imgHeight / pdfHeight);

    console.log('[PDF DEBUG] imgWidth:', imgWidth, 'imgHeight:', imgHeight.toFixed(2));
    console.log('[PDF DEBUG] topPaddingPx:', topPaddingPx, 'topPaddingMm:', topPaddingMm.toFixed(2));
    console.log('[PDF DEBUG] pxPerMm:', pxPerMm.toFixed(4), 'pageHeightPx:', pageHeightPx);
    console.log('[PDF DEBUG] pageCount:', pageCount, 'pdfHeight:', pdfHeight);

    // Print each page's slice info
    for (let p = 1; p <= pageCount; p++) {
      if (p === 1) {
        console.log(`[PDF DEBUG] Page ${p}: canvas y=[0, ${pageHeightPx}], template y=[0mm, ${pdfHeight}mm]`);
      } else {
        const sliceTopPx = (p - 1) * pageHeightPx;
        const sliceBotPx = Math.min(p * pageHeightPx, canvas.height);
        const tTop = sliceTopPx / pxPerMm;
        const tBot = sliceBotPx / pxPerMm;
        console.log(`[PDF DEBUG] Page ${p}: canvas y=[${sliceTopPx}, ${sliceBotPx}], template y=[${tTop.toFixed(1)}mm, ${tBot.toFixed(1)}mm]`);
      }
    }

    // ===================================================================
    // Page 1: full canvas, clipped at pdfHeight → top padding visible
    // ===================================================================
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // ===================================================================
    // Pages 2+: extract the correct slice, render at PDF y=0
    // ===================================================================
    for (let page = 2; page <= pageCount; page++) {
      const sliceTopPx = (page - 1) * pageHeightPx;
      const sliceHeightPx = canvas.height - sliceTopPx;

      if (sliceHeightPx <= 0) break;

      console.log(`[PDF DEBUG] Page ${page}: extracting sliceTopPx=${sliceTopPx}, height=${sliceHeightPx}`);

      pdf.addPage();
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeightPx;
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(
        canvas,
        0, sliceTopPx, canvas.width, sliceHeightPx,
        0, 0, canvas.width, sliceHeightPx
      );

      const sliceImgHeightMm = sliceHeightPx / pxPerMm;
      console.log(`[PDF DEBUG] Page ${page}: sliceImgHeightMm=${sliceImgHeightMm.toFixed(2)}, will clip at ${pdfHeight}mm`);

      pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG',
        0, 0, imgWidth, sliceImgHeightMm);
    }

    pdf.save(fileName);
  } catch (err) {
    console.error('PDF export failed:', err);
    throw err;
  }
}
