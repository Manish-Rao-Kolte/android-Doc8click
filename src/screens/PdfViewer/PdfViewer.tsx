import {StyleSheet, Dimensions, View} from 'react-native';
import React from 'react';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';
import Pdf from 'react-native-pdf';
import {MAIN_BG_COLOR} from '../../utils/colors';

const PdfViewer = () => {
  const source = {
    uri: 'http://www.pdf995.com/samples/pdf.pdf',
    cache: true,
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </SafeScreen>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: MAIN_BG_COLOR,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
