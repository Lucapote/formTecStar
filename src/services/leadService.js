import { MAKE_WEBHOOK_URL } from '../config/constants';
import { getCookie, getClientIp, generateEventId, cleanPhoneNumber } from '../utils/helpers';

/**
 * Envía la información del lead al Webhook de Make.com y dispara el evento Lead en Meta Pixel.
 * Estructura limpia y compatible con Meta Conversions API (CAPI) para evitar el error 100 de Meta.
 */
export const submitLead = async (formData, hasScholarship) => {
  const eventId = generateEventId();
  const clientIp = await getClientIp();
  const fbc = getCookie('_fbc');
  const fbp = getCookie('_fbp');
  
  const cleanPhoneDigits = cleanPhoneNumber(formData.contactPhone); // 10 dígitos
  const phoneE164 = `+52${cleanPhoneDigits}`;
  const phoneDigitsOnly = `52${cleanPhoneDigits}`;
  const cleanName = formData.contactName.trim();
  const cleanEmail = formData.contactEmail.trim().toLowerCase();

  // Payload estructurado con alias estándar de Meta CAPI y Make.com
  const payload = {
    // Datos del Diagnóstico
    age: formData.age || '',
    interest: formData.interest || '',
    commitment: formData.commitment || '',
    urgency: formData.urgency || '',
    hasScholarship: Boolean(hasScholarship),

    // Datos de Contacto (Alias para Make.com)
    contactName: cleanName,
    contactPhone: phoneE164,
    contactEmail: cleanEmail,

    // Datos Estándar Meta CAPI (User Data)
    first_name: cleanName,
    name: cleanName,
    email: cleanEmail,
    em: cleanEmail,
    phone: phoneDigitsOnly,
    ph: phoneDigitsOnly,
    phone_number: phoneE164,

    // Identificador de Evento (Deduplicación Pixel + CAPI)
    event_ID: eventId,
    event_id: eventId,

    // Contexto de Navegación
    pageurl: typeof window !== 'undefined' ? (window.location.href || '') : ''
  };

  // Solo incluir IP si existe y no está vacía
  if (clientIp) {
    payload.Client_IP = clientIp;
    payload.client_ip_address = clientIp;
    payload.client_ip = clientIp;
  }

  // Solo incluir User Agent si existe y no está vacío
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    payload.user_agent = navigator.userAgent;
    payload.client_user_agent = navigator.userAgent;
  }

  // REGLA CRÍTICA META CAPI: NUNCA enviar fbc o fbp si son cadenas vacías ("")
  if (fbc && fbc.trim() !== '') {
    payload.fbc = fbc;
  }

  if (fbp && fbp.trim() !== '') {
    payload.fbp = fbp;
  }

  // Enviar datos al Webhook de Make.com
  await fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  // Disparar Evento Lead en Meta Pixel (Navegador)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Registro Clase Muestra TecStars',
      value: hasScholarship ? 2000 : 2500,
      currency: 'MXN'
    }, { eventID: eventId });
  }

  return payload;
};
