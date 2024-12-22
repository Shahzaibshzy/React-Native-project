import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderWidth:4,
    borderColor:'#DCDCDC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
  },
  sports: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  button: {
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor: '#2ECC71',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#2ECC71',
    fontSize: 16,
  },
});