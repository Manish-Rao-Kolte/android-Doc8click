import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
type ShimmerLoaderProps = {
  number: number;
};

const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({number}) => {
  return (
    <View style={styles.container}>
      {[...Array(number)].map((_, index) => (
        <ShimmerPlaceHolder
          key={index}
          style={styles.placeholder}
          LinearGradient={LinearGradient}
          visible={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  placeholder: {
    width: '45%',
    height: 200,
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default ShimmerLoader;
