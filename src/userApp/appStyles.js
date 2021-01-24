import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
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
    color: '#000080',
  },
  alertLevel: {
    marginBottom: 60,
    fontWeight: '200',
    fontSize: 20,
  }

})

const alert = StyleSheet.create({
 green: {
    color: '#00ff00'
  },
  red: {
    color: '#ff0000'
  }
})

export { styles, alert };
