import html2pdf from 'html2pdf.js';

const generatePdf = (element: HTMLElement) => {
  html2pdf()
    .from(element)
    .save('resume.pdf')
    .then(() => {
      console.log('PDF downloaded successfully');
    })
    .catch((error: any) => { // Explicitly type the error
      console.error('Error generating PDF:', error);
    });
};

export { generatePdf };
