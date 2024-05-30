import React from 'react'
import {Page, Text, Document, View, StyleSheet} from '@react-pdf/renderer'
export const ValuationPDF = () => {
    // create style , de tao sau
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
          },
          section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
          },
      });
      
    // Create docummetn
  return (
    <Document>
        {/* view la div, con text la p */}
    <Page size="A3" style={styles.page}>
      <View style={styles.section}>
        <Text style={{textAlign: 'center'}}>Chào Anh Khánh Đep Trai</Text>
      </View>
    </Page>
  </Document>
  )
}
