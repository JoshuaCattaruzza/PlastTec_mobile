import axios from 'axios';

const url = 'https://api.joshuacattaruzza.com/api/auth/';

const signup = (username, password) => {
	return axios.post(url + 'signup', {
		username,
		password,
	});
};
const login = (username, password) => {
	return axios
		.post(url + 'signin', {
			username,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				console.log(response.data);
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return Promise.resolve();
		});
};
const logout = () => {
	localStorage.removeItem('user');
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	signup,
	login,
	logout,
};
