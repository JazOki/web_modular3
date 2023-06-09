import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Card from "../../../components/Card";

const handleDownload = async () => {
  const pdf = new jsPDF();
  const container = document.getElementById("pdf-container");

  const canvas = await html2canvas(container);
  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Estado_del_arte.pdf");
};

const PDFContent = () => {
  const router = useRouter()
  const { id } = router.query
  const [documents, setDocuments] = useState([])


  useEffect(() => {
    Promise.all([
      fetch(`/api/documents/${id}`).then((response) => response.json())
    ]).then(([res]) => {
      setDocuments(res)
      console.log(res);

    }).catch((error) => {
      toast.error("Error al obtener los datos");
      console.log(error)
    });
  }, [id])


  if (!documents)
    return <p>Loading...</p>
  console.log(documents);
  console.log(documents.DocEtapa1);



  // código para obtener los datos y mostrar el contenido del PDF

  return (
    <Card>
      <button onClick={handleDownload} class="bg-blue-500 hover:bg-blue-400 text-gray-darkest font-bold py-2 px-4 rounded inline-flex items-center">
        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
        <span>Descargar</span>
      </button>
      
      <div id="pdf-container" className="felx flex-col container ">
        {/* Tu código para mostrar el contenido del PDF */}

        <div className='flex justify-center'>
          <img src="/logo.png" alt="" className=" mt-20 w-full lg:w-1/3 xl:w-1/5" />
        </div>

        <div className=' mt-4 text-center font-bold text-lg'>
          <h1 className=''>CENTRO UNIVERSITARIO UNE</h1>
          <h1 className=''>INGENIERÍA EN COMPUTACIÓN</h1>
          <h1 className=''>PROYECTO MODULAR</h1>
        </div>

        <p className='text-center'>
        </p>
        <p className='text-center'>{documents.nombre}</p>
        <h1 className=' mt-4 text-center font-bold text-lg'>ESTADO DEL ARTE</h1>
        <p className='text-center'>{documents.titulo}</p>
        {/* <h1 className=' mt-4 text-center font-bold text-lg'>INTEGRANTES:</h1>
      <p className='text-center'>Obtener los integrantes</p> */}

        <h1 className=' mt-4 text-center font-bold text-lg'>INDICE</h1>
        <br />
        <h1 className=' ml-60 mt-4 font-bold text-lg text-blue-500'>Contenido</h1>
        <div className=' ml-60 mt-4 font-bold text-lg '>

          <h1 className=''>RESUMEN</h1>
          <h1 className=''>PALABRAS CLAVE</h1>
          <h1 className=''>INTRODUCCIÓN</h1>
          <h1 className=''>DESARROLLO DEL TEMA</h1>
          <h1 className=''>CONCLUSIONES</h1>
          <h1 className=''>REFERENCIAS</h1>

          <br />

        </div>

        {/* <div className="border-t"></div> */}

        <div className='ml-36 mt-32 text-lg text-justify max-w-full mx-32'>

          <h1 className='font-bold'>RESUMEN</h1>
          <p className=' '>
            {typeof documents !== 'undefined' ?
              typeof documents.DocEtapa1 !== 'undefined' ?
                documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.resumen : '' : '' : ''}
          </p>

          <br />
          <h1 className='font-bold'>PALABRAS CLAVE</h1>
          <p className=''>{typeof documents !== 'undefined' ?
            typeof documents.DocEtapa1 !== 'undefined' ?
              documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.palabrasClave : '' : '' : ''}</p>
          <br />

          <h1 className='font-bold'>INTRODUCCIÓN</h1>
          <p className=''>{typeof documents !== 'undefined' ?
            typeof documents.DocEtapa1 !== 'undefined' ?
              documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.introduccion : '' : '' : ''}</p>
          <br />
          <h1 className='font-bold'>DESARROLLO DEL TEMA</h1>
          <p className=''>{typeof documents !== 'undefined' ?
            typeof documents.DocEtapa1 !== 'undefined' ?
              documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.desarrollo : '' : '' : ''}</p>
          <br />
          <h1 className='font-bold'>CONCLUSIONES</h1>
          <p className=''>{typeof documents !== 'undefined' ?
            typeof documents.DocEtapa1 !== 'undefined' ?
              documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.conclusion : '' : '' : ''}</p>
          <br />
          <h1 className='font-bold'>REFERENCIAS</h1>
          <p className=''>{typeof documents !== 'undefined' ?
            typeof documents.DocEtapa1 !== 'undefined' ?
              documents.DocEtapa1.length > 0 ? documents.DocEtapa1[0]?.referencias : '' : '' : ''}</p>
        </div>
        <br />


        {/* 
        <button onClick={handleDownload}>Descargar PDF</button> */}



      </div>


    </Card>


  );
};

export default PDFContent;
