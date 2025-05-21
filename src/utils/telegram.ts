interface OrderData {
  firstName: string;
  lastName: string;
  contact: string;
  contactType: string;
  productName: string;
  price: number;
}

export async function sendOrderToTelegram(orderData: OrderData) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram credentials are not configured');
    return;
  }

  const message = `🛍 Нове замовлення!\n
📦 Товар: ${orderData.productName}
💰 Ціна: ${orderData.price}₴\n
👤 Замовник:
${orderData.firstName} ${orderData.lastName}
📞 ${orderData.contactType}: ${orderData.contact}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
} 