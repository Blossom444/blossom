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

  console.log('Attempting to send order to Telegram');
  console.log('Token exists:', !!token);
  console.log('Chat ID exists:', !!chatId);
  console.log('Token value:', token);
  console.log('Chat ID value:', chatId);

  if (!token || !chatId) {
    console.error('Telegram credentials are not configured');
    return false;
  }

  const message = `🛍 Нове замовлення!\n
📦 Товар: ${orderData.productName}
💰 Ціна: ${orderData.price}₴\n
👤 Замовник:
${orderData.firstName} ${orderData.lastName}
📞 ${orderData.contactType}: ${orderData.contact}`;

  console.log('Prepared message:', message);

  try {
    console.log('Sending request to Telegram API...');
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    console.log('Response status:', response.status);
    const responseData = await response.text();
    console.log('Response data:', responseData);

    if (!response.ok) {
      console.error('Telegram API error:', responseData);
      throw new Error('Failed to send message to Telegram');
    }

    console.log('Message sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
} 