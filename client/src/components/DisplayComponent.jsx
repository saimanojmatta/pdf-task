import { FaTrashCan } from "react-icons/fa6";
const DisplayComponent = ({ viewPdf, showPdf, deletePdf }) => {
    return (
        <>
            {viewPdf && Array.isArray(viewPdf) && viewPdf.length>0 
            ?(viewPdf.map((data, index) => (
                <div className="flex items-center m-8" key={index}>
                    <button className="bg-gray-400 rounded-lg p-3 mb-3 text-clip 
                    w-48 hover:bg-gray-600 focus:bg-gray-600 text-white" 
                    onClick={() => showPdf(data.pdf)}>
                        <p className="truncate overflow-hidden">{data.pdf}</p>
                    </button>
                    <button className="mb-2 ml-2"onClick={() => deletePdf(data.pdf)}>
                        <FaTrashCan />
                    </button>
                </div>
                
            ))
            ):(
                <p>NO pdf files to display</p>
            )
           }
        </>
    );
};

export default DisplayComponent;
