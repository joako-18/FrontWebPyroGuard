import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usePaymentStore } from '../store/paymentStore';
import PaymentModal from './PaymentModal';
import { Loader2 } from 'lucide-react';
import './PaymentModal.css';

export default function PaymentGuard() {
  const { isPaid, checkPaymentStatus } = usePaymentStore();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // ✅ Verificar estado del pago con el backend al cargar
    const verifyStatus = async () => {
      try {
        await checkPaymentStatus();
      } catch (err) {
        console.error('Error al verificar estado de pago en backend:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifyStatus();

    return () => {
      isMounted = false;
    };
  }, [checkPaymentStatus]);

  if (isLoading) {
    return (
      <div className="payment-guard-loading">
        <Loader2 size={40} className="spinner" />
        <span>Verificando estado de la cuenta...</span>
      </div>
    );
  }

  const needsPayment = !isPaid;

  const handlePaymentSuccess = () => {
    console.log('✅ PaymentGuard - Pago confirmado, permitiendo acceso');
    setModalOpen(false);
  };

  if (needsPayment) {
    return (
      <div className="payment-guard-container">
        <PaymentModal isOpen={modalOpen} onSuccess={handlePaymentSuccess} />
      </div>
    );
  }

  return <Outlet />;
}