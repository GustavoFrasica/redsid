document.addEventListener('DOMContentLoaded', () => {
    // Elementos del simulador de Clínicas
    const citasInput = document.getElementById('citas-input');
    const valorInput = document.getElementById('valor-input');
    const noShowInput = document.getElementById('no-show-input');
    const recepcionInput = document.getElementById('recepcion-input');

    const citasVal = document.getElementById('citas-val');
    const valorVal = document.getElementById('valor-val');
    const noShowVal = document.getElementById('no-show-val');

    const fugaCostEl = document.getElementById('fuga-cost');
    const ahorroCostEl = document.getElementById('ahorro-cost');
    const maturityLevelEl = document.getElementById('maturity-level');
    const maturityDescEl = document.getElementById('maturity-desc');

    // Elementos del formulario
    const leadForm = document.getElementById('lead-form');
    const formSuccess = document.getElementById('form-success');

    // Función para formatear moneda
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    // Función de cálculo para Clínicas y Spas
    const calculateROI = () => {
        const citasMensuales = parseInt(citasInput.value);
        const valorCita = parseFloat(valorInput.value);
        const noShowRate = parseFloat(noShowInput.value) / 100;
        const salarioRecepcion = parseFloat(recepcionInput.value) || 0;

        // Actualizar etiquetas
        citasVal.textContent = `${citasMensuales} citas`;
        valorVal.textContent = `${valorCita} USD`;
        noShowVal.textContent = `${noShowInput.value}% inasistencia`;

        // Cálculo de citas perdidas al año
        const citasMensualesPerdidas = citasMensuales * noShowRate;
        const fugaMensualFacturacion = citasMensualesPerdidas * valorCita;
        const fugaAnualFacturacion = fugaMensualFacturacion * 12;

        // Facturación recuperada por REDSID (prometemos al menos un 60% de reducción en no-shows)
        const ahorroAnual = fugaAnualFacturacion * 0.60;

        // Mostrar valores
        fugaCostEl.textContent = `${formatCurrency(fugaAnualFacturacion)} USD / año`;
        ahorroCostEl.textContent = `${formatCurrency(ahorroAnual)} USD / año`;

        // Diagnóstico de madurez de WhatsApp
        let level = '';
        let desc = '';

        if (noShowInput.value > 20) {
            level = 'Nivel 1: Clínica Manual';
            desc = 'Dependencia de recordatorios de última hora. Tus pacientes no asisten por falta de confirmación rápida.';
        } else if (noShowInput.value > 10) {
            level = 'Nivel 2: Digitalizada';
            desc = 'Confirmas por WhatsApp, pero las respuestas tardías los fines de semana y la noche dejan tu agenda con huecos vacíos.';
        } else {
            level = 'Nivel 3: Automatizada';
            desc = 'Buena tasa de asistencia. Lista para agendamiento inteligente 24/7 sin intervención humana y CRM activo.';
        }

        maturityLevelEl.textContent = level;
        maturityDescEl.textContent = desc;
    };

    // Event Listeners para cambios
    citasInput.addEventListener('input', calculateROI);
    valorInput.addEventListener('input', calculateROI);
    noShowInput.addEventListener('input', calculateROI);
    recepcionInput.addEventListener('input', calculateROI);

    // Inicializar cálculos
    calculateROI();

    // Enviar Formulario
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            
            // Simular carga de envío
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            setTimeout(() => {
                leadForm.reset();
                submitBtn.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                calculateROI(); // Resetear visuales
            }, 1000);
        });
    }
});
