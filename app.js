document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Solicitud recibida';
    success.classList.remove('hidden');
  });
});
