import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 10,
  },
  topButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  topButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderWidth: 4,
    borderColor: '#DCDCDC',
    padding: 2,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flex: 'wrap'
  },
  buttoncCard: {
    flexDirection: 'row',
    padding: 10,
    gap: 5,
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
    alignContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ECC71',
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 25,
    cursor: 'pointer',

  },
  button2: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 25,

  },
  buttonText: {
    color: '#2ECC71',
    fontSize: 16,
    marginTop: -3,

  },
  buttonText2: {
    color: 'red',
    fontSize: 16,
    marginTop: -3,

  },
});