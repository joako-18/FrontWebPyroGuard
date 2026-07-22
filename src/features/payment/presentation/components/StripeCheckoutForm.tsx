import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Loader2, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { usePaymentStore } from '../store/paymentStore';

interface StripeCheckoutFormProps {
  clientSecret: string;
  amount: number;
  paymentMethodType: string;
  onSuccess: () => void;
}

export default function StripeCheckoutForm({
  amount,
  paymentMethodType,
  onSuccess,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const setPaymentSuccess = usePaymentStore((s) => s.setPaymentSuccess);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || 'Ocurrió un error al procesar el pago.');
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // ✅ Pago exitoso
        setPaymentSuccess(paymentIntent.id, paymentMethodType);
        setIsCompleted(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setErrorMessage(`Estado del pago: ${paymentIntent?.status || 'desconocido'}`);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error inesperado con Stripe.';
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem' }}>
        <CheckCircle2 size={48} style={{ color: '#22c55e', margin: '0 auto 0.75rem auto' }} />
        <h3 style={{ color: '#f8fafc', margin: '0 0 0.5rem 0' }}>¡Pago Realizado con Éxito!</h3>
        <p style={{ color: '#94a3b8', margin: 0 }}>Tu acceso como Administrador ha sido activado.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      {errorMessage && (
        <div className="payment-error-alert">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div style={{ marginBottom: '1.25rem' }}>
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="pay-submit-btn"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="spinner" />
            Procesando Pago Seguro...
          </>
        ) : (
          <>
            <Lock size={16} />
            Pagar ${amount.toFixed(2)} MXN
          </>
        )}
      </button>
    </form>
  );
}