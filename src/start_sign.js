import okav from './okav'
import bot from './line'

async function start_sign(usr, pass){
	console.log('簽到okav腳本')
	console.log('正在登錄')
	console.log('/---------------------------------/')
	console.log('/---------------------------------/')
	
	
	
	console.log('正在獲取帳號...')
	console.log()

	
	const session = new okav(usr, pass)
	const login_rst = await session.login()
	
	if(!login_rst)
		console.log(`帳號${usr}登錄失敗`)
	console.log(`帳號${usr}登錄成功`)
	console.log('帳號登錄完畢')
	console.log('/---------------------------------/')
	console.log('/---------------------------------/')
	
	
	
	console.log('正在簽到...')
	const signRst = await session.sign()
	if(!signRst)
		console.log(`帳號${usr}簽到失敗`)
	else {
		console.log(`帳號${usr}簽到成功`)
		
		const today = new Date
			, expireDay = new Date(signRst.daysToExpired)
			, lastDays = expireDay.getDate() - today.getDate()
			
		console.log(`帳號${usr}的購物金為${signRst.money}`)
		if(lastDays == 10 || lastDays == 5)
			bot(lastDays, usr, signRst.money)
	}
	console.log('/---------------------------------/')
	console.log('/---------------------------------/')
}

export default start_sign