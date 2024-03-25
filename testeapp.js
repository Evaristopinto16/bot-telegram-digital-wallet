require('dotenv').config();

async function sendTelegram(token, channe, message){
    try {
        const resutl = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${channe}&text=${message}`, {
            method: 'GET',
            redirect: "follow"
        })
        const response = await resutl.json()
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }

}

async function main(){
    //6276564167:AAF8g0YwZy-cg5FpgVX6RBL2Dd4iM1nikqY
    //1918474997
    let TOKEN=' '
let CHANNEL=' ' 
    sendTelegram(TOKEN, CHANNEL, 'me responde no whatsapp +244 949631868???')
}
main()