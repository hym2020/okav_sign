import myRequest from './myRequest'



const okav = (() => {
	const session = new myRequest
	
	let password = null
	  , isLogin = false
	  , isSigned = false
	  , daysToExpired = null
	  , money = null
	
	
	return class {
		constructor(usr, pass){
			this.usr = usr
			password = pass
		}
		
		async login(){
			if(isLogin)
				return Promise.resolve(true)
			
			try{
				const rst = await session.post('http://okav.com.tw/do.php?act=login', {
					url: 'http://okav.com.tw/',
					user_email: this.usr,
					user_passwd: password
				})
				
				
				if(/您輸入的Email帳戶或密碼錯誤/.test(rst.text()))
					return Promise.resolve(false)
				
				if(/操作成功/.test(rst.text())){
					isLogin = true
					return Promise.resolve(true)
				}
				
			}
			catch(e){
				console.log('登入失敗，錯誤信息: ' + e.message)
				return Promise.resolve(false)
			}
		}
		
		async sign(){
			if(!isLogin){
				console.log(`帳號${this.usr}還未登錄，無法簽到`)
				return Promise.resolve(false)
			}
			
			if(isSigned){
				console.log(`帳號${this.usr}已簽到，不用重新簽到`)
				return Promise.resolve(true)
			}
			
			try{
				let rst = await session.get('http://okav.com.tw/modules.php?day=up')
				  , $ = rst.jq()
				
				if($('#infoBox form > input[type="hidden"][name="day"]').length){
					rst = await session.get('http://okav.com.tw/modules.php?day=up')
					$ = rst.jq()
				}
				
				
				if($('#infoBox input[type="image"]').length){
					isSigned = true
					
					const moneyStr = $('#infoBox .normal').text().match(/購物金：[0-9]+/)
					if(moneyStr !== null)
						money = parseInt(moneyStr[0].match(/[0-9]+/)[0])
					
					const expireStr = $('#infoBox').text().match(/將於[0-9\-]+到期/)
					if(expireStr !== null)
						daysToExpired = ((...tmpDate) => {
							tmpDate = Array.from(...tmpDate).map(e => parseInt(e.replace(/^0+/, '')))
							let d = new Date
							d.setFullYear(tmpDate[0])
							d.setMonth(tmpDate[1] - 1)
							d.setDate(tmpDate[2])
							return d
						})(expireStr[0].match(/[0-9\-]+/)[0].split('-'))
					
					return Promise.resolve({
						money,
						daysToExpired
					})
				}
			}
			catch(e){
				console.log('簽到失敗，錯誤信息: ' + e.message)
				return Promise.resolve(false)
			}
		}
	}
})()

export default okav