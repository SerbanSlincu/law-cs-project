
import { StyleSheet } from 'react-native';

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  title: {
    marginVertical:20,
    marginBottom: 60,
    fontWeight: '700',
    fontSize: 40,
    textShadowRadius: 5,
    color: '#add8e6',
  },
})

const scanner = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },
});

export { styles, scanner };
