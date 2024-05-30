import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import { ValuationPDF } from './ValuationPDF';

export const GeneratePDF = () => {
  return (
    <PDFViewer style={{ width: "100%", height: '800px' }} >
      <ValuationPDF />
    </PDFViewer>
  );
};