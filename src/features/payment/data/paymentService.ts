import { httpClient } from '../../../shared/api/httpClient';
import { ENV } from '../../../shared/config/env';

export interface CreatePaymentChargeDto {
  amount: number;
  currency?: string;
  method?: string;
  payment_method_type?: string;
  description?: string;
  customer_info?: {
    email: string;
    name: string;
  };
}

export interface PaymentChargeResponse {
  client_secret: string;
  payment_intent_id?: string;
  status?: string;
  // ✅ Campos para OXXO/SPEI
  hosted_voucher_url?: string;
  number?: string;
  clabe?: string;
  bank_name?: string;
  reference?: string;
  expires_at?: string;
  payment_intent?: string;
  [key: string]: unknown;
}

// Traduce los nombres del frontend a los que espera tu backend
const METHOD_MAP: Record<string, string> = {
  card: 'card',
  oxxo: 'cash',
  customer_balance: 'transfer',
};

/**
 * Llama a POST /api/v1/payments/charge en el microservicio de FastAPI
 */
export async function createPaymentCharge(
  data: CreatePaymentChargeDto
): Promise<PaymentChargeResponse> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  let userEmail = 'usuario@pyroguard.com';
  let userName = 'Usuario PyroGuard';

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.accessToken || null;
      userName = parsed.state?.userName || userName;
      // Nota: email no se guarda en nuestro authStore por defecto, usaremos el fallback
    } catch (e) {
      console.error('Error al leer auth-storage:', e);
    }
  }

  const rawMethod = data.method || data.payment_method_type || 'card';
  const backendMethod = METHOD_MAP[rawMethod] || rawMethod;

  const customerInfo = {
    email: data.customer_info?.email && data.customer_info.email !== 'cliente@test.com'
      ? data.customer_info.email
      : userEmail,
    name: data.customer_info?.name && data.customer_info.name !== 'Cliente Test'
      ? data.customer_info.name
      : userName,
  };

  const requestBody = {
    method: backendMethod,
    amount: data.amount,
    currency: data.currency || 'mxn',
    customer_info: customerInfo,
    description: data.description || `Pago PyroGuard (${backendMethod})`,
  };

  console.log('🔍 Enviando pago con:', { token, body: requestBody });

  return httpClient<PaymentChargeResponse>('/api/v1/payments/charge', {
    method: 'POST',
    baseUrlOverride: ENV.PAYMENTS_API_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}

// ✅ NUEVO: Verificar estado de pago
export async function checkPaymentStatus(): Promise<{ is_paid: boolean; payment_status?: string }> {
  const authStorage = localStorage.getItem('auth-storage');
  let token = null;
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      token = parsed.state?.accessToken || null;
    } catch (e) {
      console.error('Error al leer auth-storage:', e);
    }
  }

  return httpClient('/api/v1/payments/status', {
    method: 'GET',
    baseUrlOverride: ENV.PAYMENTS_API_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
