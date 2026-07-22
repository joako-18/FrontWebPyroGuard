export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_V1_BASE_URL: import.meta.env.VITE_API_V1_BASE_URL,
  ML_API_BASE_URL: import.meta.env.VITE_ML_API_BASE_URL,
  PAYMENTS_API_URL: import.meta.env.VITE_PAYMENTS_API_URL || (import.meta.env.DEV ? '/pagos-proxy' : 'https://pyroguard.inode.cloud/pagos'),
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51TuxlvJfj0jjxDLn1A0H6KIXuLmk1ACbcuLWdZxWgKoIUFHTza9z4OudA5T4mVM3ADSKcKK5agtXAeB9mUNVekrt00gtkzvBCH',
};