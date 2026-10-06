/**
 * Obtiene el valor de una galleta (cookie) por su nombre.
 */
export const getCookie = (name) => {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift() || '';
  return '';
};

/**
 * Obtiene la dirección IP pública del cliente.
 */
export const getClientIp = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip || '';
  } catch (err) {
    return '';
  }
};

/**
 * Genera un ID único para deduplicación de eventos.
 */
export const generateEventId = () => {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Limpia y normaliza el número telefónico a 10 dígitos.
 */
export const cleanPhoneNumber = (phone) => {
  let clean = phone.replace(/\D/g, '');
  if (clean.startsWith('52') && clean.length === 12) {
    clean = clean.slice(2);
  }
  return clean;
};

/**
 * Valida si la cadena tiene un formato de correo electrónico válido.
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};
