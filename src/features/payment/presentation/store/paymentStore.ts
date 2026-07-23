import { create } from 'zustand';
import { checkPaymentStatus as checkPaymentStatusApi } from '../../data/paymentService';

interface PaymentState {
  isPaid: boolean;
  isLoading: boolean;
  paymentStatus: string | null;
  paymentMethod: string | null;
  setPaymentSuccess: (paymentId: string, method: string) => void;
  checkPaymentStatus: () => Promise<void>;
  resetPayment: () => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  isPaid: localStorage.getItem('payment_status') === 'paid',
  isLoading: false,
  paymentStatus: localStorage.getItem('payment_status') === 'paid' ? 'succeeded' : null,
  paymentMethod: localStorage.getItem('payment_method') || null,

  setPaymentSuccess: (paymentId: string, method: string) => {
    set({ 
      isPaid: true, 
      paymentStatus: 'succeeded',
      paymentMethod: method,
      isLoading: false 
    });
    localStorage.setItem('payment_status', 'paid');
    localStorage.setItem('payment_id', paymentId);
    localStorage.setItem('payment_method', method);
  },

  checkPaymentStatus: async () => {
    const { isPaid } = get();
    if (isPaid) return;

    set({ isLoading: true });
    try {
      const response = await checkPaymentStatusApi();
      if (response.is_paid) {
        set({ isPaid: true, paymentStatus: 'succeeded' });
        localStorage.setItem('payment_status', 'paid');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  resetPayment: () => {
    set({ isPaid: false, paymentStatus: null, isLoading: false });
    localStorage.removeItem('payment_status');
    localStorage.removeItem('payment_id');
  }
}));