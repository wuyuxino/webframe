function request(config) {
	config = Object.assign({}, {
		url: '',
		body: undefined,
		method: 'POST',
		hasCert: false,
		isJson: true,
		isBlob: false,
		hasHeader: true,
		token: null,
	}, config)
	let elements = {
		method: config.method,
		body: config.body,
		headers: undefined
	}
	if (config.hasHeader) {
		if (config.token) {
			elements.headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'authorization': `Bearer ${config.token}`
			}
		} else {
			elements.headers = {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			}
		}
	}

	return (
		fetch(config.url, elements)
			.then((response) => {
				if (!response.ok) {
					let error = new Error(response.statusText || 'Something bas happen')
					error.response = response
					throw error
				}
				if (config.isBlob) return response.blob()
				if (config.isJson) return response.json()
				return response.text()
			}).then(jsonText => {
				return jsonText
			})
	)
}

function requestFile(config) {
	config = Object.assign({}, {
		url: '',
		body: undefined,
		method: 'POST',
		hasCert: false,
		isJson: true,
		isBlob: false,
		hasHeader: true,
		token: null,
	}, config)
	let elements = {
		method: config.method,
		body: config.body,
		headers: undefined
	}
	if (config.hasHeader) {
		if (config.token) {
			elements.headers = {
				'Accept': 'application/json',
				'authorization': `Bearer ${config.token}`
			}
		} else {
			elements.headers = {
				'Accept': 'application/json'
			}
		}
	}

	return (
		fetch(config.url, elements)
			.then((response) => {
				if (!response.ok) {
					let error = new Error(response.statusText || 'Something bas happen')
					error.response = response
					throw error
				}
				if (config.isBlob) return response.blob()
				if (config.isJson) return response.json()
				return response.text()
			}).then(jsonText => {
				return jsonText
			})
	)
}



function Add(serviceDomain, token, data, fun) {

	let parameter = {
		"query": `mutation{ insert_` + data.table_name + `` + data.add_field + `}`,
		"vaiables": null
	}

	request(
		{
			url: serviceDomain,
			body: JSON.stringify(parameter),
			token: token,
		}
	).then(req => {
		fun(req)
	}).catch(err => {
		fun(err)
	})
}

function Delete(serviceDomain, token, data, fun) {

	let parameter = {
		"query": `mutation{delete_` + data.table_name + `` + data.delete_data + `}`,
		"variables": null
	}

	request(
		{
			url: serviceDomain,
			body: JSON.stringify(parameter),
			token: token,
		}
	).then(req => {
		fun(req)
	}).catch(err => {
		fun(err)
	})
}

function Update(serviceDomain, token, data, fun) {

	let parameter = {
		"query": `mutation{update_` + data.table_name + `` + data.update_field + `}`,
		"vaiables": null
	}

	request(
		{
			url: serviceDomain,
			body: JSON.stringify(parameter),
			token: token,
		}
	).then(req => {
		fun(req)
	}).catch(err => {
		fun(err)
	})
}

function UpdateId(serviceDomain, token, data, fun) {
	let parameter = {
		"query": `mutation update_an_` + data.table_name + ` {
			update_` + data.table_name + `_by_pk(
				pk_columns: {id: ${JSON.stringify(data.id)}},
				_set: `+ data.update_field + `
			)`+ data.callback_field + `
		}`,
		"vaiables": null
	}

	request(
		{
			url: serviceDomain,
			body: JSON.stringify(parameter),
			token: token,
		}
	).then(req => {
		fun(req)
	}).catch(err => {
		fun(err)
	})
}

function Get(serviceDomain, token, data, fun) {

	let parameter = {
		"query": data.criteria ?
			`query {` + data.table_name + `` + data.criteria + `` + data.search_field + `}`
			:
			`query {` + data.table_name + `` + data.search_field + `}`,
		"vaiables": null
	}

	request(
		{
			url: serviceDomain,
			body: JSON.stringify(parameter),
			token: token,
		}
	).then(req => {
		fun(req)
	}).catch(err => {
		fun(err)
	})
}

export {
	Get,
	Add,
	Update,
	UpdateId,
	Delete,
	request,
	requestFile
}