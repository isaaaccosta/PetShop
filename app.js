// ======= CONFIGURE AQUI =======
// WhatsApp no formato internacional: 55 + DDD + número (sem espaços)
// exemplo RS: 5554999999999
const WHATSAPP_NUMBER = "54999625395";

// Link do Google Maps (pode ser aquele "Compartilhar" do endereço)
const MAPS_URL = "https://www.google.com/maps?q=Tapejara+R.+Júlio+de+Castilhos,+2722+-+São+Paulo";

// Mensagem base
function buildMessage({ service = "", name = "", pet = "", when = "", msg = "" } = {}) {
  const lines = [
    "Olá! Gostaria de agendar um atendimento",
    service ? `Serviço: ${service}` : "",
    name ? `Nome: ${name}` : "",
    pet ? `Pet: ${pet}` : "",
    when ? `Preferência: ${when}` : "",
    msg ? `Obs: ${msg}` : "",
  ].filter(Boolean);

  return lines.join("\n");
}

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// ======= NAV MOBILE =======
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ======= CTA LINKS =======
const navCta = document.getElementById("navCta");
const heroCta = document.getElementById("heroCta");
const waFloat = document.getElementById("waFloat");
const contactCta = document.getElementById("contactCta");

const defaultMsg = buildMessage({ service: "Agendamento" });

[navCta, heroCta, waFloat, contactCta].forEach(el => {
  if (!el) return;
  el.href = waLink(defaultMsg);
  el.target = "_blank";
  el.rel = "noopener";
});

// ======= Maps =======
const mapsLink = document.getElementById("mapsLink");
const mapsBtn = document.getElementById("mapsBtn");

[mapsLink, mapsBtn].forEach(el => {
  if (!el) return;
  el.href = MAPS_URL;
});

// ======= Service buttons =======
document.querySelectorAll("[data-service]").forEach(btn => {
  btn.addEventListener("click", () => {
    const service = btn.getAttribute("data-service") || "Agendamento";
    window.open(waLink(buildMessage({ service })), "_blank", "noopener");
  });
});

// ======= Contact form -> WhatsApp =======
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("fName").value.trim();
    const pet = document.getElementById("fPet").value.trim();
    const service = document.getElementById("fService").value;
    const when = document.getElementById("fWhen").value.trim();
    const msg = document.getElementById("fMsg").value.trim();

    const message = buildMessage({ service, name, pet, when, msg });
    window.open(waLink(message), "_blank", "noopener");
  });
}

// ======= FAQ =======
document.querySelectorAll("[data-faq]").forEach(q => {
  q.addEventListener("click", () => {
    q.classList.toggle("active");
    const span = q.querySelector("span");
    if (span) span.textContent = q.classList.contains("active") ? "−" : "+";
  });
});

// ======= Year =======
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
