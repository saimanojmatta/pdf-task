import { useEffect, useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
function Pdfcomp({ pdffile }) {
  const pdfref = useRef();
  const [numPages, setNumPages] = useState();
  const [selectpages, setSelectPages] = useState([]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    const newSelectedPages = Array.from({ length: numPages }, () => false);
    setSelectPages(newSelectedPages);
  }

  const handleCheckboxChange = (page) => {
    setSelectPages((prevSelectedPages) =>
      prevSelectedPages.map((isSelected, index) => (index === page - 1 ? !isSelected : isSelected))
    );
  };

  const renderPages = () => {
    return Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
      <div key={`page-${page}`} className='border rounded-lg p-4 mb-4'>
        <div className='flex justify-between items-center'>
          <p>Page {page} of {numPages}</p>
          <input
            className='h-6 w-6'
            type='checkbox'
            checked={selectpages[page - 1]}
            onChange={() => handleCheckboxChange(page)}
          />
        </div>
        <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
      </div>
    ));
  };

  const handleDownload = async () => {
    setDownloadError(null); 
    const pdf = new jsPDF();
    const selectedPages = selectpages
      .map((isSelected, index) => isSelected ? index + 1 : null)
      .filter((page) => page !== null);
  
    for (let i = 0; i < selectedPages.length; i++) {
      const page = selectedPages[i];
      const pageElement = document.querySelector(`div[data-page-number="${page}"]`);
      if (pageElement) {
        if (i > 0) {
          pdf.addPage();
        }
        const canvas = await html2canvas(pageElement, { scale: 2, logging: false });
        const imgData = canvas.toDataURL('image/jpeg', 0.8); 
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      } else {
        setDownloadError(`Error downloading page ${page}`);
      }
    }
    pdf.save('selected_pages.pdf');
  };
  return (
    <div className='text-center'>
      <Document file={pdffile} onLoadSuccess={onDocumentLoadSuccess}>
        {isPreviewing
          ? selectpages.map((isSelected, index) => isSelected && <div key={`selected-page-${index + 1}`} className='selected-page' data-page-number={index + 1}>
              <Page pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
            </div>)
          : renderPages()}
      </Document>
      {
        numPages && 
      <button
        disabled={!selectpages.some((checked) => checked)}
        onClick={() => setIsPreviewing(!isPreviewing)}
        className={`py-2 px-4 rounded-lg  bg-blue-800 text-white
         ${isPreviewing ? 'hidden' : ''} disabled:bg-blue-300` }
      >
        {isPreviewing ? 'Hide Preview' : 'Preview Selected Pages'}
      </button>
      }
      {isPreviewing && (
        <button
          className='py-2 px-4 bg-blue-800 rounded-lg
           text-white disabled:bg-blue-300'
          onClick={handleDownload}
          disabled={!selectpages.some((checked) => checked)}
        >
          Download Selected Pages
        </button>
      )}
    </div>
  );
}

export default Pdfcomp;
