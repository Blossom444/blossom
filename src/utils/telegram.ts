interface OrderData {
  firstName: string;
  lastName: string;
  contact: string;
  contactType: string;
  productName: string;
  price: number;
}

export async function sendOrderToTelegram(orderData: OrderData) {
  // Отримуємо токени з env змінних або використовуємо резервні значення
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "7941074643:AAFPIHXsAOdtjuByZS5cWGi-sK_GqOU6Y2w";
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "-1002399101337";

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

    console.log('Message sent successfully to Telegram');
    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
}

export const sendTelegramMessage = async (message: string): Promise<void> => {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error('Telegram credentials not configured');
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
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
      throw new Error('Failed to send Telegram message');
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};

export const testTelegramBot = async (): Promise<void> => {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error('Telegram credentials not configured');
  }

  try {
    console.log('Testing Telegram bot with:', { botToken, chatId });
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: '🔔 Тестове повідомлення від BLOSSOM',
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send Telegram message');
    }

    console.log('Test message sent successfully');
  } catch (error) {
    console.error('Error sending test message:', error);
    throw error;
  }
}; 