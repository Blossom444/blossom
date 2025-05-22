interface OrderData {
  firstName: string;
  lastName: string;
  contact: string;
  contactType: string;
  productName: string;
  price: number;
}

export async function sendOrderToTelegram(orderData: OrderData) {
  // Використовуємо прямо значення з ENV для надійності
  const token = "7941074643:AAFPIHXsAOdtjuByZS5cWGi-sK_GqOU6Y2w";
  const chatId = "-1002399101337";

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
        parse_mode: 'HTML',
      }),
      cache: 'no-cache',
    });

    if (!response.ok) {
      const responseData = await response.text();
      console.error('Telegram API error:', responseData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
} 