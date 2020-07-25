import request from 'request'
import cheerio from 'cheerio'

const UA = {
	'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0'
}

const myRequest = (() => {
	const cookieJar = request.jar()
	
	
	return class {
		constructor(){}
		
		get(url){
			return new Promise((resolve, reject) => {
				request({
					method: 'GET',
					url: url,
					headers: { ...UA },
					jar: cookieJar
				}, (err, res, body) => {
					if(err)
						return reject(err)
					else 
						return resolve({
							text: () => body,
							jq: () => cheerio.load(body)
						})
				})
			})
		}
		
		post(url, data){
			return new Promise((resolve, reject) => {
				request({
					method: 'POST',
					url: url,
					body: Object.keys(data).map(e => `${encodeURIComponent(e)}=${encodeURIComponent(data[e])}`).join('&'),
					headers: { 
						...UA,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					jar: cookieJar
				}, (err, res, body) => {
					if(err)
						return reject(err)
					else 
						return resolve({
							text: () => body,
							jq: () => cheerio.load(body)
						})	
				})
			})
		}
	}
	
})()


export default myRequest