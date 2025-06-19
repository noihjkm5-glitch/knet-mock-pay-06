
// Utility functions for payment link generation and management

export const generatePaymentLink = (): string => {
  // Generate a unique payment link ID with better uniqueness
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 12);
  const uniqueId = Math.random().toString(36).substring(2, 6);
  return `pay_${timestamp}_${random}_${uniqueId}`;
};

export const formatAmount = (amount: number, currency: string = 'KWD'): string => {
  const currencySymbols: { [key: string]: string } = {
    'KWD': 'د.ك',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'SAR': 'ر.س',
    'AED': 'د.إ',
    'QAR': 'ر.ق',
    'BHD': 'د.ب'
  };
  
  const symbol = currencySymbols[currency] || currency;
  return `${symbol} ${amount.toFixed(3)}`;
};

export const isLinkExpired = (expiryDate: string): boolean => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry < now;
};

export const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN${timestamp.toString().slice(-8)}${random}`;
};

export const formatCardNumber = (cardNumber: string): string => {
  // Mask card number showing only last 4 digits
  if (cardNumber.length < 4) return cardNumber;
  const lastFour = cardNumber.slice(-4);
  const masked = '*'.repeat(cardNumber.length - 4);
  return `${masked}${lastFour}`;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Basic validation - remove spaces and check if it's all digits and proper length
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  // Validate MM/YY format
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

// Function to generate globally unique payment URLs
export const generateGlobalPaymentUrl = (baseUrl: string, linkId: string): string => {
  return `${baseUrl}/pay/${linkId}`;
};

// Function to validate currency codes
export const isValidCurrency = (currency: string): boolean => {
  const validCurrencies = ['KWD', 'USD', 'EUR', 'GBP', 'SAR', 'AED', 'QAR', 'BHD'];
  return validCurrencies.includes(currency);
};
