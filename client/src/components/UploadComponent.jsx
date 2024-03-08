// UploadForm component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';
import DisplayComponent from './DisplayComponent';
import Pdfcomp from './pdfcomp';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();
const UploadForm = () => {
    const [viewPdf, setViewPdf] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    useEffect(() => {
        getPdf();
    }, []);

    const getPdf = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/get-files');
            const existingPdfFiles = await Promise.all(
                res.data.data.map(async (file) => {
                    try {
                        await axios.head(`http://localhost:5000/files/${file.pdf}`);
                        return file; // File exists, keep it in the list
                    } catch (error) {
                        if (error.response.status === 404) {
                            console.log(`PDF file "${file.pdf}" not found in the backend`);
                            return null; // File not found, filter it out gracefully
                        }
                        throw error; // Rethrow other errors for standard error handling
                    }
                })
            );
            setViewPdf(existingPdfFiles.filter(Boolean)); // Filter out the null entries
        } catch (err) {
            console.error("Error fetching PDF files:", err);
        }
    };
    const showPdf = (pdf) => {
        setPdfFile(`http://localhost:5000/files/${pdf}`)
      };
      const deletePdf = async (selectedpdf) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete-file/${encodeURIComponent(selectedpdf)}`);
            setViewPdf((prevViewpdf) => prevViewpdf.filter((pdf) => pdf.pdf !== selectedpdf));
        } catch (err) {
            console.error("Error deleting PDF file: ", err);
        }
    }  
    // Implement showPdf and deletePdf functions
    return (
        <div >
            <FormComponent setViewPdf={setViewPdf} getPdf={getPdf} />
            <div className='flex flex-col md:flex-row flex-auto'>
                <div className='md:w-1/2'>
            <DisplayComponent viewPdf={viewPdf} showPdf={showPdf} deletePdf={deletePdf} />
                </div>
            <Pdfcomp pdffile={pdfFile}/>
            </div>
        </div>
    );
};

export default UploadForm;
