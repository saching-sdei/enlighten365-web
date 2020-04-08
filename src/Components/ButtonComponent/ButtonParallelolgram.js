import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class Triangle extends Component {
  render() {
    return <View style={[styles.triangle, this.props.style]} />;
  }
}

class TriangleDown extends Component {
  render() {
    return <Triangle style={styles.triangleDown} />;
  }
}

export default class Button extends Component {
  render() {
    return (
      <View style={styles.parallelogram}>
        <TriangleDown style={styles.parallelogramRight} />
        {/* <View style={styles.parallelogramInner} /> */}
        <Triangle style={styles.parallelogramLeft} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  triangle: {
    width: 140,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 70,
    borderRightWidth: 70,
    borderBottomWidth: 140,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
  },

  triangleDown: {
    transform: [{rotate: '180deg'}],
  },

  parallelogram: {
    width: 150,
    height: 100,
  },
  parallelogramInner: {
    position: 'absolute',

    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  parallelogramRight: {
    top: 0,
    right: -70,
    position: 'absolute',
  },
  parallelogramLeft: {
    top: 0,
    left: -70,
    position: 'absolute',
  },
});
