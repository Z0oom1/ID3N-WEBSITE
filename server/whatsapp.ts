/**
 * WhatsApp Integration Service
 * Handles sending messages to WhatsApp
 */

const WHATSAPP_TARGET_NUMBER = '5518996392316';

export interface WhatsAppMessage {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  company: string;
  service: string;
  message?: string;
}

/**
 * Format a lead message for WhatsApp
 */
export function formatLeadMessage(lead: WhatsAppMessage): string {
  return `
📋 *Novo Lead - ID3N*

👤 *Nome:* ${lead.name}
📧 *Email:* ${lead.email}
📱 *Telefone:* ${lead.phone}
🆔 *CPF:* ${lead.cpf}
🏢 *Empresa:* ${lead.company}
💼 *Serviço:* ${lead.service}
${lead.message ? `\n💬 *Mensagem:*\n${lead.message}` : ''}

_Mensagem enviada automaticamente pelo sistema ID3N_
  `.trim();
}

/**
 * Generate WhatsApp Web link for sending message
 * This works without API key and opens WhatsApp Web
 */
export function generateWhatsAppWebLink(message: string, phoneNumber: string = WHATSAPP_TARGET_NUMBER): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Send message via WhatsApp API (requires credentials)
 * This is a placeholder for future integration
 */
export async function sendWhatsAppMessage(
  message: string,
  phoneNumber: string = WHATSAPP_TARGET_NUMBER
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Check if API credentials are available
    const apiUrl = process.env.WHATSAPP_API_URL;
    const apiKey = process.env.WHATSAPP_API_KEY;

    if (!apiUrl || !apiKey) {
      console.warn('[WhatsApp] API credentials not configured. Message will be logged but not sent.');
      console.log('[WhatsApp] Message content:', message);
      return {
        success: true,
        messageId: `local-${Date.now()}`,
      };
    }

    // Implementation for actual API integration
    // This would be implemented when credentials are provided
    const response = await fetch(`${apiUrl}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        body: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      messageId: (data as any).messageId || (data as any).sid,
    };
  } catch (error) {
    console.error('[WhatsApp] Error sending message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send lead notification via WhatsApp
 */
export async function sendLeadNotification(lead: WhatsAppMessage): Promise<{ success: boolean; error?: string }> {
  try {
    const message = formatLeadMessage(lead);
    const result = await sendWhatsAppMessage(message);

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Failed to send message',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('[WhatsApp] Error sending lead notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
