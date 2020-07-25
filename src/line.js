import linebot from 'linebot'

const bot = linebot({
	channelId: process.env.LINECHANNEL,
	channelSecret: process.env.LINESECRET,
	channelAccessToken: process.env.LINECHANNELTOKEN
})



export default function(days, usr, money){
	return bot.push(process.env.LINE_USERID, `今天是${new Date().toString()}，帳號${usr}的Okav點數共${money}元，還有${days}就過期`)
}