import axios from 'axios';

const endpoint = 'https://api.joshuacattaruzza.com/api/task/mobile/';
const pending = 'https://api.joshuacattaruzza.com/api/task/mobile/pending/';
const getData = (id) => { 
	return axios.get(endpoint + id);
};
const getDataPending = (id) => { 
	return axios.get(pending + id);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
getData,
getDataPending
};