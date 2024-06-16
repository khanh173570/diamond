import React from 'react';
import { Page, Text, Document, View, StyleSheet, Image } from '@react-pdf/renderer';

export const ValuationPDF = ({ result} ) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
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
          {/* <View>
            <Image style={styles.image} src="" />
          </View> */}
          <View>
            <Text style={styles.title}>Valuation Report</Text>
          </View>
        </View>
        <View style={styles.wrap}>
          <View style={styles.wrapLeft}>
            <View style={styles.section}>
              <Text style={styles.header}>Diamond Valuation Report</Text>
              <Text style={styles.text}>Diamond Origin:{result.diamondOrigin}</Text>
              <Text style={styles.text}>Measurements: {result.measurements}</Text>
              <Text style={styles.text}>Shape Cut: {result.shapeCut}</Text>
              <Text style={styles.text}>Description: {result.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Grading Results</Text>
              <Text style={styles.text}>Carat Weight: {result.caratWeight}</Text>
              <Text style={styles.text}>Color Grade: {result.color}</Text>
              <Text style={styles.text}>Clarity Grade: {result.clarity}</Text>
              <Text style={styles.text}>Cut Grade: {result.cut}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Additional Grading Information</Text>
              <Text style={styles.text}>Polish: {result.polish}</Text>
              <Text style={styles.text}>Symmetry: {result.symmetry}</Text>
              <Text style={styles.text}>Fluorescence: {result.fluorescence}</Text>
              <Text style={styles.text}>Comments: {result.proportions}</Text>
              <Text style={styles.text}>Estimate Price: {result.estimatePrice}</Text>
            </View>
          </View>
          <View style={styles.wrapRight}>
            <View style={styles.section}>
              <Text style={styles.header}>Product Image</Text>
              <Image style={styles.image} src={result.img} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
