const WHATSAPP_NUMBER = '919707054336';

function waUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 80) {
    header.style.background = 'var(--navy-dark)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,.2)';
  } else {
    header.style.background = 'var(--navy)';
    header.style.boxShadow = 'var(--shadow-sm)';
  }
  lastScroll = y;
}, { passive: true });

document.querySelectorAll('.wa-service').forEach((btn) => {
  btn.addEventListener('click', () => {
    const service = btn.dataset.service || 'a service';
    const msg = `Hello HAHI Tours & Travel, I would like to enquire about ${service}.`;
    openWhatsApp(msg);
  });
});

document.querySelectorAll('.wa-car').forEach((btn) => {
  btn.addEventListener('click', () => {
    const car = btn.dataset.car || 'a vehicle';
    const msg = `Hello HAHI Tours & Travel, I would like to enquire about the ${car}. Please let me know about availability and fares.`;
    openWhatsApp(msg);
  });
});

function openWhatsApp(message) {
  const url = waUrl(message);
  const newTab = window.open(url, '_blank');
  if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
    alert(`WhatsApp did not open automatically. Please tap the floating WhatsApp button or visit wa.me/${WHATSAPP_NUMBER} to send your enquiry.`);
  }
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const get = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const name = get('custName');
    const contact = get('contactNum');
    const pickup = get('pickup');
    const destination = get('destination');
    const travelDate = get('travelDate');
    const returnDate = get('returnDate');
    const passengers = get('passengers');
    const vehicle = get('vehiclePref');
    const tripType = get('tripType');
    const additional = get('additional');

    const required = [
      { val: name, field: 'Customer name', id: 'custName' },
      { val: pickup, field: 'Pickup location', id: 'pickup' },
      { val: destination, field: 'Destination', id: 'destination' },
      { val: travelDate, field: 'Travel date', id: 'travelDate' },
      { val: passengers, field: 'Number of passengers', id: 'passengers' },
      { val: vehicle, field: 'Vehicle preference', id: 'vehiclePref' },
      { val: tripType, field: 'Trip type', id: 'tripType' },
    ];

    let firstInvalid = null;
    let missing = [];
    required.forEach((r) => {
      if (!r.val) {
        missing.push(r.field);
        if (!firstInvalid) firstInvalid = document.getElementById(r.id);
      }
    });

    if (missing.length > 0) {
      if (firstInvalid) firstInvalid.focus();
      alert(`Please fill in the required fields: ${missing.join(', ')}.`);
      return;
    }

    let lines = [
      `*Booking Enquiry — HAHI Tours & Travel*`,
      ``,
      `Name: ${name}`,
      contact ? `Contact: ${contact}` : null,
      `Pickup: ${pickup}`,
      `Destination: ${destination}`,
      `Travel Date: ${travelDate}`,
      returnDate ? `Return Date: ${returnDate}` : null,
      `Passengers: ${passengers}`,
      `Vehicle: ${vehicle}`,
      `Trip Type: ${tripType}`,
      additional ? `Additional: ${additional}` : null,
      ``,
      `Please confirm availability and fare.`,
    ].filter(Boolean);

    const message = lines.join('\n');
    const url = waUrl(message);

    const newTab = window.open(url, '_blank');
    const fallback = document.getElementById('formFallback');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      if (fallback) fallback.hidden = false;
    }
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
