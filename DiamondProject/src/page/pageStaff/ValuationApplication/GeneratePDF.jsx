import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ValuationPDF } from './ValuationPDF';

export const GeneratePDF = ({ result ,image, image1}) => {
  return (
    <PDFViewer style={{ width: "100%", height: '800px' }} >
      <ValuationPDF result={result} image={image} image1={image1} />
    </PDFViewer>
  );
};
