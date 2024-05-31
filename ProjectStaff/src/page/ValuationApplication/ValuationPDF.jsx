import React from 'react';
import { Page, Text, Document, View, StyleSheet, Image } from '@react-pdf/renderer';
export const ValuationPDF = ({ result }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    title: {
      textAlign: 'center',
      fontSize: 40,
      marginBottom: 20,
    },
    section: {
      marginBottom: 10,
    },
    header: {
      backgroundColor: '#7CF4DE',
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 10,
      padding: 5,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    wrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wrapLeft: {
      width: '45%',
    },
    wrapRight: {
      width: '45%',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Valuation Result</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Valuation ID: {result.valuation}</Text>
          <Text style={styles.text}>Order ID: {result.orderID}</Text>
          <Text style={styles.text}>Customer Name: {result.customerName}</Text>
        </View>

        <View style={styles.wrap}>
          <View style={styles.wrapLeft}>
            <View style={styles.section}>
              <Text style={styles.header}>GIA Report Details</Text>
              <Text style={styles.text}>Certificate Date: {result.certificateDate}</Text>
              <Text style={styles.text}>Measurements: {result.measurements}</Text>
              <Text style={styles.text}>Assessment ID: {result.assessmentID}</Text>
              <Text style={styles.text}>Shape: {result.shape}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Grading Results</Text>
              <Text style={styles.text}>Carat Weight: {result.caratWeight}</Text>
              <Text style={styles.text}>Color Grade: {result.colorGrade}</Text>
              <Text style={styles.text}>Clarity Grade: {result.clarityGrade}</Text>
              <Text style={styles.text}>Cut Grade: {result.cutGrade}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Additional Grading Information</Text>
              <Text style={styles.text}>Polish: {result.polish}</Text>
              <Text style={styles.text}>Symmetry: {result.symmetry}</Text>
              <Text style={styles.text}>Fluorescence: {result.fluorescence}</Text>
              <Text style={styles.text}>Clarity Characteristics: {result.clarityCharacteristics}</Text>
              <Text style={styles.text}>Inscription: {result.inscription}</Text>
              <Text style={styles.text}>Comments: {result.comments}</Text>
              <Text style={styles.text}>Estimate Price: {result.estimatePrice}</Text>
            </View>
          </View>
          <View style={styles.wrapRight}>
            <View style={styles.section}>
              <Text style={styles.header}>Proportions</Text>
              {result.image && <Image style={styles.image} src={result.image} />}
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Clarity Characteristics</Text>
              {result.image1 && <Image style={styles.image} src={result.image1} />}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
