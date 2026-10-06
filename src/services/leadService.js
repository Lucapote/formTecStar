import { MAKE_WEBHOOK_URL } from '../config/constants';
import { getCookie, getClientIp, generateEventId, cleanPhoneNumber } from '../utils/helpers';

/**
 * Envía la información del lead al Webhook de Make.com y dispara el evento Lead en Meta Pixel.
 */
export const submitLead = async (formData, hasScholarship) => {
  const eventId = generateEventId();
  const clientIp = await getClientIp();
  const fbc = getCookie('_fbc');
  const fbp = getCookie('_fbp');
  const cleanPhone = cleanPhoneNumber(formData.contactPhone);
  const fullPhone = `+52${cleanPhone}`;
  const cleanName = formData.contactName.trim();
  const cleanEmail = formData.contactEmail.trim();

  const payload = {
    age: formData.age,
    interest: formData.interest,
    commitment: formData.commitment,
    urgency: formData.urgency,
    hasScholarship: hasScholarship,
    contactName: cleanName,
    contactPhone: fullPhone,
    contactEmail: cleanEmail,
    user_agent: typeof navigator !== 'undefined' ? (navigator.userAgent || '') : '',
    fbc: fbc || '',
    fbp: fbp || '',
    event_ID: eventId,
    Client_IP: clientIp || '',
    pageurl: typeof window !== 'undefined' ? (window.location.href || '') : ''
  };

  // Enviar datos al Webhook de Make.com
  await fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  // Disparar Evento Lead en Meta Pixel para CAPI / Browser Tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Registro Clase Muestra TecStars',
      value: hasScholarship ? 2000 : 2500,
      currency: 'MXN'
    }, { eventID: eventId });
  }

  return payload;
};
