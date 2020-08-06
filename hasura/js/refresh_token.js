import axios from 'axios'

function Login(url, body, fun) {
	axios.post(
		url,
		body,
		{
			withCredentials: true
		})
		.then(function (response) {
			fun(response)
		})
		.catch(function (error) {
			fun(error)
		})
}

function RefreshToken(url, fun) {
	axios.get(
		url,
		{
			withCredentials: true
		})
		.then(function (response) {
			fun(response)
		})
		.catch(function (error) {
			fun(error)
		})
}

export {
	Login,
	RefreshToken
}