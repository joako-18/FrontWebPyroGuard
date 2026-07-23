import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { 
  ShieldCheck, 
  Receipt, 
  Building2, 
  AlertCircle, 
  Loader2, 
  CreditCard, 
  Check, 
  Copy, 
  ExternalLink, 
  Clock, 
  Lock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { createPaymentCharge, checkPaymentStatus } from '../../data/paymentService';
import { ENV } from '../../../../shared/config/env';
import StripeCheckoutForm from './StripeCheckoutForm';
import { usePaymentStore } from '../store/paymentStore';
import './PaymentModal.css';

const stripePromise = loadStripe(ENV.STRIPE_PUBLIC_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

// ✅ Componente de instrucciones OXXO con función de copiado
const OxxoInstructions = ({ data }: { data: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (data.number) {
      navigator.clipboard.writeText(data.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="voucher-details-container">
      <div className="voucher-number-card">
        <span className="voucher-label">📌 Número de referencia OXXO</span>
        <div className="voucher-code-wrapper">
          <strong className="voucher-code">{data.number || 'N/A'}</strong>
          {data.number && (
            <button 
              type="button" 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title="Copiar número de referencia"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          )}
        </div>
      </div>

      {data.hosted_voucher_url && (
        <a 
          className="voucher-download-btn" 
          href={data.hosted_voucher_url} 
          target="_blank" 
          rel="noreferrer"
        >
          <ExternalLink size={16} />
          <span>Ver / Imprimir Ficha de Pago OXXO</span>
        </a>
      )}

      <div className="settlement-info-box">
        <Clock size={16} className="info-icon" />
        <span>Presenta esta ficha en cualquier tienda OXXO. El pago suele procesarse en minutos.</span>
      </div>
    </div>
  );
};

// ✅ Componente de instrucciones SPEI con función de copiado
const SpeiInstructions = ({ data }: { data: any }) => {
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const copyToClipboard = (text: string, type: 'clabe' | 'ref') => {
    navigator.clipboard.writeText(text);
    if (type === 'clabe') {
      setCopiedClabe(true);
      setTimeout(() => setCopiedClabe(false), 2000);
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="spei-details-container">
      <div className="spei-grid">
        <div className="spei-card">
          <span className="spei-card-label">🏦 CLABE Interbancaria</span>
          <div className="spei-code-wrapper">
            <strong className="spei-clabe">{data.clabe || 'N/A'}</strong>
            {data.clabe && (
              <button 
                type="button" 
                className={`copy-btn ${copiedClabe ? 'copied' : ''}`}
                onClick={() => copyToClipboard(data.clabe, 'clabe')}
                title="Copiar CLABE"
              >
                {copiedClabe ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedClabe ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            )}
          </div>
        </div>

        {data.bank_name && (
          <div className="spei-row-item">
            <span className="label">Banco Receptor</span>
            <span className="val">{data.bank_name}</span>
          </div>
        )}

        {data.reference && (
          <div className="spei-card compact">
            <span className="spei-card-label">📌 Concepto / Referencia</span>
            <div className="spei-code-wrapper">
              <span className="spei-ref">{data.reference}</span>
              <button 
                type="button" 
                className={`copy-btn ${copiedRef ? 'copied' : ''}`}
                onClick={() => copyToClipboard(data.reference, 'ref')}
                title="Copiar referencia"
              >
                {copiedRef ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedRef ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="settlement-info-box">
        <Clock size={16} className="info-icon" />
        <span>Realiza tu transferencia desde la app de tu banco. Se valida automáticamente.</span>
      </div>
    </div>
  );
};

export default function PaymentModal({ isOpen, onSuccess }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'oxxo' | 'customer_balance'>('card');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [voucherData, setVoucherData] = useState<any>(null);
  const [isLoadingSecret, setIsLoadingSecret] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  
  const { setPaymentSuccess: setStorePaymentSuccess } = usePaymentStore();
  const paymentAmount = 500;

  // ✅ Crear PaymentIntent al seleccionar método
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoadingSecret(true);
    setApiError(null);
    setClientSecret(null);
    setVoucherData(null);
    setPaymentSuccess(false);
    setPollingAttempts(0);

    createPaymentCharge({
      method: selectedMethod,
      amount: paymentAmount,
      currency: 'mxn',
      customer_info: {
        email: 'cliente@test.com',
        name: 'Cliente Test',
      },
      description: `Pago PyroGuard (${selectedMethod.toUpperCase()})`,
    })
      .then((res) => {
        if (!isMounted) return;
        
        console.log('🔍 Respuesta del backend:', res);

        if (selectedMethod === 'card') {
          if (res.client_secret) {
            setClientSecret(res.client_secret);
          } else {
            setApiError('El servidor no retornó un token de pago válido.');
          }
        } else if (selectedMethod === 'oxxo') {
          if (res.hosted_voucher_url || res.number) {
            setVoucherData(res);
            setIsPolling(true);
          } else {
            setApiError('No se recibieron datos de OXXO del servidor.');
          }
        } else if (selectedMethod === 'customer_balance') {
          if (res.clabe) {
            setVoucherData(res);
            setIsPolling(true);
          } else {
            setApiError('No se recibieron datos de SPEI del servidor.');
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setApiError(err.message || 'Error al conectar con el servidor de pagos.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingSecret(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedMethod]);

  // ✅ POLLING AUTOMÁTICO DE VERIFICACIÓN
  useEffect(() => {
    if (!isPolling || !voucherData) return;

    let isMounted = true;
    let attempts = 0;
    const maxAttempts = 360;

    const pollPaymentStatus = async () => {
      if (!isMounted) return;
      
      attempts++;
      setPollingAttempts(attempts);
      
      try {
        console.log(`🔍 Verificando pago (intento ${attempts}/${maxAttempts})...`);
        const status = await checkPaymentStatus();
        
        if (status.is_paid) {
          console.log('✅ Pago confirmado automáticamente!');
          setPaymentSuccess(true);
          setStorePaymentSuccess('auto-' + Date.now(), selectedMethod);
          setIsPolling(false);
          setTimeout(() => {
            if (isMounted) onSuccess();
          }, 2000);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error verificando pago:', error);
      }
      
      if (attempts >= maxAttempts) {
        console.warn('⏰ Tiempo de espera agotado');
        setIsPolling(false);
        setApiError('⏰ Tiempo de espera agotado. Si ya realizaste tu pago, por favor contacta a soporte.');
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(pollPaymentStatus, 5000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [isPolling, voucherData, onSuccess, setStorePaymentSuccess, selectedMethod]);

  // ✅ Manejar éxito desde StripeCheckoutForm (tarjeta)
  const handleStripeSuccess = () => {
    setPaymentSuccess(true);
    setStorePaymentSuccess('stripe-' + Date.now(), selectedMethod);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (!isOpen) return null;

  // ✅ PANTALLA DE ÉXITO MEJORADA
  if (paymentSuccess) {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal-card payment-success-card">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={64} className="success-icon" />
          </div>
          <h2>¡Pago Realizado con Éxito!</h2>
          <p className="success-subtitle">Tu acceso a PyroGuard ha sido activado correctamente.</p>
          <div className="success-badge">
            <Sparkles size={16} />
            <span>Acceso activado</span>
          </div>
          <p className="redirect-text">Redirigiendo al panel de control en unos segundos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-card">
        {/* Encabezado */}
        <div className="payment-modal-header">
          <div className="badge-pro">
            <ShieldCheck size={16} className="badge-icon" />
            <span>Acceso PyroGuard</span>
          </div>
          <h2>Pago de Activación</h2>
          <p>Realiza tu pago para ingresar a la plataforma y habilitar todas las funciones del sistema.</p>
        </div>

        {/* Resumen del Monto */}
        <div className="payment-summary-box">
          <div className="summary-main">
            <div className="summary-info">
              <span className="summary-label">Acceso a la Plataforma</span>
              <span className="summary-desc">Pago de activación PyroGuard</span>
            </div>
            <div className="summary-price">
              ${paymentAmount.toFixed(2)} <span className="currency">MXN</span>
            </div>
          </div>
          <div className="summary-features">
            <div className="feature-pill"><Check size={12} /> Pago único</div>
            <div className="feature-pill"><Check size={12} /> Acceso inmediato</div>
            <div className="feature-pill"><Check size={12} /> Transacción segura</div>
          </div>
        </div>

        {/* Selector de Método de Pago */}
        <div className="payment-methods-selector">
          <label className="selector-title">Selecciona tu método de pago:</label>
          <div className="methods-grid">
            <button
              onClick={() => setSelectedMethod('card')}
              className={`method-tab ${selectedMethod === 'card' ? 'active' : ''}`}
            >
              <CreditCard size={20} className="method-icon" />
              <div className="method-text">
                <span className="method-name">Tarjeta</span>
                <span className="method-sub">Débito / Crédito</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('oxxo')}
              className={`method-tab ${selectedMethod === 'oxxo' ? 'active' : ''}`}
            >
              <Receipt size={20} className="method-icon" />
              <div className="method-text">
                <span className="method-name">OXXO Pay</span>
                <span className="method-sub">Pago en tienda</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod('customer_balance')}
              className={`method-tab ${selectedMethod === 'customer_balance' ? 'active' : ''}`}
            >
              <Building2 size={20} className="method-icon" />
              <div className="method-text">
                <span className="method-name">SPEI</span>
                <span className="method-sub">Transferencia</span>
              </div>
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="payment-modal-body">
          {apiError && (
            <div className="payment-error-alert">
              <AlertCircle size={18} />
              <span>{apiError}</span>
            </div>
          )}
          
          {isLoadingSecret ? (
            <div className="payment-loading-state">
              <Loader2 size={36} className="spinner" />
              <p>Conectando de forma segura con el procesador de pagos...</p>
            </div>
          ) : (
            <>
              {/* ✅ CASO OXXO */}
              {voucherData && selectedMethod === 'oxxo' && (
                <div className="payment-action-card">
                  <div className="action-card-header">
                    <div className="method-badge oxxo-bg">
                      <Receipt size={20} />
                      <span>Ficha OXXO</span>
                    </div>
                    <h3>Pago en Efectivo OXXO</h3>
                  </div>

                  <OxxoInstructions data={voucherData} />
                  
                  {/* Tarjeta de estado de espera sin botón */}
                  <div className="waiting-status-card">
                    <div className="pulse-indicator">
                      <span className="pulse-ring"></span>
                      <Loader2 size={20} className="spinner-icon" />
                    </div>
                    <div className="waiting-info">
                      <span className="waiting-title">Esperando acreditación del pago...</span>
                      <span className="waiting-subtitle">
                        {pollingAttempts > 0 
                          ? `Verificando estado en tiempo real (intento ${pollingAttempts})`
                          : 'El sistema acreditará tu cuenta automáticamente en cuanto realices el pago.'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ CASO SPEI */}
              {voucherData && selectedMethod === 'customer_balance' && (
                <div className="payment-action-card">
                  <div className="action-card-header">
                    <div className="method-badge spei-bg">
                      <Building2 size={20} />
                      <span>Transferencia SPEI</span>
                    </div>
                    <h3>Datos de Transferencia Bancaria</h3>
                  </div>

                  <SpeiInstructions data={voucherData} />
                  
                  {/* Tarjeta de estado de espera sin botón */}
                  <div className="waiting-status-card">
                    <div className="pulse-indicator">
                      <span className="pulse-ring"></span>
                      <Loader2 size={20} className="spinner-icon" />
                    </div>
                    <div className="waiting-info">
                      <span className="waiting-title">Esperando transferencia bancaria...</span>
                      <span className="waiting-subtitle">
                        {pollingAttempts > 0 
                          ? `Verificando estado en tiempo real (intento ${pollingAttempts})`
                          : 'Tu acceso se activará en automático al detectarse la transferencia.'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ CASO TARJETA - Stripe Elements */}
              {clientSecret && selectedMethod === 'card' && (
                <div className="stripe-checkout-container">
                  <Elements
                    key={clientSecret}
                    stripe={stripePromise}
                    options={{ 
                      clientSecret,
                      appearance: {
                        theme: 'night',
                        variables: {
                          colorPrimary: '#f97316',
                          colorBackground: '#0f172a',
                          colorText: '#f8fafc',
                          colorDanger: '#ef4444',
                          borderRadius: '8px',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }
                      }
                    }}
                  >
                    <StripeCheckoutForm
                      clientSecret={clientSecret}
                      amount={paymentAmount}
                      paymentMethodType={selectedMethod}
                      onSuccess={handleStripeSuccess}
                    />
                  </Elements>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pie de Seguridad */}
        <div className="payment-modal-footer">
          <Lock size={14} className="lock-icon" />
          <span>Procesado de forma 100% <strong>segura</strong></span>
        </div>
      </div>
    </div>
  );
}