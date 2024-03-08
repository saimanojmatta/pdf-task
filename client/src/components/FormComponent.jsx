import { useState } from "react";
import axios from 'axios'
const FormComponent = ({setViewPdf, getPdf} ) => {
    const [file, setFile] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a PDF file to upload');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('http://localhost:5000/api/upload-file', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            setViewPdf((prevViewPdf) => [...prevViewPdf, { pdf: file.name }]);
            setFile('');
            getPdf();
        } catch (err) {
            console.error("Error uploading PDF file:", err);
        }
    };
  return (
    <form onSubmit={handleSubmit} className="mb-12">
        <div  className="  space-y-8 font-[sans-serif] max-w-md mx-auto flex items-center ">
        <input onChange={(e) => setFile(e.target.files[0])} 
        type="file" accept="application/pdf" id="file" 
        className=" mt-8 w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer 
        file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded " />
        <button className="bg-gray-800  text-white text-sm cursor-pointer.
         p-2 rounded-lg ml-8 "  >Upload </button>
        </div>
    </form>
  )
}
export default FormComponent