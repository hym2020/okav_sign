import sign from './start_sign'

const usr = process.env.USR.split('\n')
	, pass = process.env.PASS.split('\n').split('\n')
	, ids = usr.map((e, i) => Object.defineProperties({}, {
		usr: {
			value: e,
			enumerable: true
		},
		pass: {
			value: pass[i],
			enumerable: true
		}
	}))
	
ids.forEach(e => sign(e.usr, e.pass))