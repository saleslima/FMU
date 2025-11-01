// Modal management module
import { state, saveState } from './state.js';
import { renderBlockedCalendar, renderCalendar } from './calendar.js';
import { renderCustomizeCalendar } from './admin.js';

export function initializeModals() {
    initializeBookingModal();
    initializeReportModal();
    initializeBlockedDaysModal();
    initializeCancellationModal();
    initializeCustomizeDayModal();
    initializeCustomizeDayFormModal();
    initializeSearchBookingsModal();
    initializeConfirmationModal();
    initializeBookingPasswordModal();
    initializeSetBookingPasswordModal();
    initializeStatisticsModal();
}

function initializeBookingModal() {
    const modal = document.getElementById('bookingModal');
    const closeBtn = modal.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function initializeReportModal() {
    const reportModal = document.getElementById('reportModal');
    const closeReport = document.getElementById('closeReport');

    closeReport.addEventListener('click', () => {
        reportModal.classList.remove('active');
    });

    reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            reportModal.classList.remove('active');
        }
    });
}

function initializeBlockedDaysModal() {
    const blockedDaysModal = document.getElementById('blockedDaysModal');
    const closeBlockedDays = document.getElementById('closeBlockedDays');

    closeBlockedDays.addEventListener('click', () => {
        blockedDaysModal.classList.remove('active');
    });

    blockedDaysModal.addEventListener('click', (e) => {
        if (e.target === blockedDaysModal) {
            blockedDaysModal.classList.remove('active');
        }
    });

    const prevMonthBlocked = document.getElementById('prevMonthBlocked');
    const nextMonthBlocked = document.getElementById('nextMonthBlocked');

    if (prevMonthBlocked && nextMonthBlocked) {
        prevMonthBlocked.addEventListener('click', () => {
            state.blockedCalendarMonth--;
            if (state.blockedCalendarMonth < 0) {
                state.blockedCalendarMonth = 11;
                state.blockedCalendarYear--;
            }
            renderBlockedCalendar();
        });

        nextMonthBlocked.addEventListener('click', () => {
            state.blockedCalendarMonth++;
            if (state.blockedCalendarMonth > 11) {
                state.blockedCalendarMonth = 0;
                state.blockedCalendarYear++;
            }
            renderBlockedCalendar();
        });
    }
}

function initializeCancellationModal() {
    const modal = document.getElementById('cancellationModal');
    const closeBtn = document.getElementById('closeCancellation');
    const passwordInput = document.getElementById('cancelPassword');
    const reasonInput = document.getElementById('cancelReason');
    const requestedByInput = document.getElementById('cancelRequestedBy');
    const confirmBtn = document.getElementById('confirmCancelBtn');
    const cancelBtn = document.getElementById('cancelCancelBtn');

    const validateForm = () => {
        const password = passwordInput.value;
        const reason = reasonInput.value.trim();
        const requestedBy = requestedByInput.value.trim();

        confirmBtn.disabled = !(password === 'daqta' && reason.length >= 10 && requestedBy.length > 0);
    };

    passwordInput.addEventListener('input', validateForm);

    reasonInput.addEventListener('input', () => {
        reasonInput.value = reasonInput.value.toUpperCase();
        validateForm();
    });

    requestedByInput.addEventListener('input', () => {
        requestedByInput.value = requestedByInput.value.toUpperCase();
        validateForm();
    });

    confirmBtn.addEventListener('click', () => {
        const dateKey = modal.dataset.dateKey;
        const bookingIndex = parseInt(modal.dataset.bookingIndex);
        const reason = reasonInput.value.trim();
        const requestedBy = requestedByInput.value.trim();

        if (state.bookings[dateKey] && state.bookings[dateKey][bookingIndex]) {
            state.bookings[dateKey][bookingIndex].cancellation = {
                reason,
                requestedBy,
                timestamp: new Date().toISOString()
            };
            saveState();
            renderCalendar();
            modal.classList.remove('active');
            window.dispatchEvent(new CustomEvent('showReport'));
            alert('Reserva cancelada com sucesso!');
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function initializeCustomizeDayModal() {
    const customizeDayModal = document.getElementById('customizeDayModal');
    const closeCustomizeDay = document.getElementById('closeCustomizeDay');

    closeCustomizeDay.addEventListener('click', () => {
        customizeDayModal.classList.remove('active');
    });

    customizeDayModal.addEventListener('click', (e) => {
        if (e.target === customizeDayModal) {
            customizeDayModal.classList.remove('active');
        }
    });

    const prevMonthCustomize = document.getElementById('prevMonthCustomize');
    const nextMonthCustomize = document.getElementById('nextMonthCustomize');

    if (prevMonthCustomize && nextMonthCustomize) {
        prevMonthCustomize.addEventListener('click', () => {
            state.customizeCalendarMonth--;
            if (state.customizeCalendarMonth < 0) {
                state.customizeCalendarMonth = 11;
                state.customizeCalendarYear--;
            }
            renderCustomizeCalendar();
        });

        nextMonthCustomize.addEventListener('click', () => {
            state.customizeCalendarMonth++;
            if (state.customizeCalendarMonth > 11) {
                state.customizeCalendarMonth = 0;
                state.customizeCalendarYear++;
            }
            renderCustomizeCalendar();
        });
    }
}

function initializeCustomizeDayFormModal() {
    const modal = document.getElementById('customizeDayFormModal');
    const closeBtn = document.getElementById('closeCustomizeDayForm');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function initializeSearchBookingsModal() {
    const modal = document.getElementById('searchBookingsModal');
    const closeBtn = document.getElementById('closeSearchBookings');
    const searchBtn = document.getElementById('searchBtn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    searchBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('performSearchBookings'));
    });
    
    // Allow Enter key to search
    document.getElementById('searchCpf').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.dispatchEvent(new CustomEvent('performSearchBookings'));
        }
    });
}

function initializeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.getElementById('closeConfirmation');
    const closeBtnMain = document.getElementById('closeConfirmationBtn');
    const shareWhatsApp = document.getElementById('shareWhatsApp');
    const shareEmail = document.getElementById('shareEmail');
    const downloadPDF = document.getElementById('downloadPDF');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    closeBtnMain.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    shareWhatsApp.addEventListener('click', () => {
        const bookingInfo = JSON.parse(modal.dataset.bookingInfo);
        const message = `🏥 *COMPROVANTE DE AGENDAMENTO - FISIOTERAPIA*\n\n` +
                       `📅 *Data:* ${bookingInfo.date}\n` +
                       `⏰ *Período:* ${bookingInfo.period}\n` +
                       `🕐 *Horário:* ${bookingInfo.time}\n` +
                       `👤 *Paciente:* ${bookingInfo.name}\n` +
                       `📱 *WhatsApp:* ${bookingInfo.phone}\n` +
                       `📋 *CPF:* ${bookingInfo.cpf}\n` +
                       `✅ *Confirmado em:* ${bookingInfo.timestamp}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    });
    
    shareEmail.addEventListener('click', () => {
        const bookingInfo = JSON.parse(modal.dataset.bookingInfo);
        const subject = 'Comprovante de Agendamento - Fisioterapia';
        const body = `COMPROVANTE DE AGENDAMENTO - FISIOTERAPIA\n\n` +
                    `Data: ${bookingInfo.date}\n` +
                    `Período: ${bookingInfo.period}\n` +
                    `Horário: ${bookingInfo.time}\n` +
                    `Paciente: ${bookingInfo.name}\n` +
                    `WhatsApp: ${bookingInfo.phone}\n` +
                    `CPF: ${bookingInfo.cpf}\n` +
                    `Confirmado em: ${bookingInfo.timestamp}`;
        
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });
    
    downloadPDF.addEventListener('click', () => {
        const bookingInfo = JSON.parse(modal.dataset.bookingInfo);
        generateBookingPDF(bookingInfo);
    });
}

function generateBookingPDF(bookingInfo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('COMPROVANTE DE AGENDAMENTO', 105, 30, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('Fisioterapia', 105, 40, { align: 'center' });
    
    // Booking details box
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(20, 55, 170, 90);
    
    let yPos = 70;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    
    doc.text('Data:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.date, 80, yPos);
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('Período:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.period, 80, yPos);
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('Horário:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.time, 80, yPos);
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('Paciente:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.name, 80, yPos);
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('CPF:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.cpf, 80, yPos);
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('WhatsApp:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.phone, 80, yPos);
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('Confirmado em:', 30, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(bookingInfo.timestamp, 80, yPos);
    
    // Footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'italic');
    doc.setTextColor(128);
    doc.text('Guarde este comprovante para apresentar no dia do atendimento.', 105, 160, { align: 'center' });
    
    // Save
    doc.save(`comprovante_agendamento_${bookingInfo.date.replace(/\s/g, '_')}.pdf`);
}

export function showCancellationModal(dateKey, bookingIndex) {
    const modal = document.getElementById('cancellationModal');
    modal.dataset.dateKey = dateKey;
    modal.dataset.bookingIndex = bookingIndex;
    modal.classList.add('active');

    document.getElementById('cancelPassword').value = '';
    document.getElementById('cancelReason').value = '';
    document.getElementById('cancelRequestedBy').value = '';
    document.getElementById('confirmCancelBtn').disabled = true;
}

function initializeBookingPasswordModal() {
    const modal = document.getElementById('bookingPasswordModal');
    const closeBtn = document.getElementById('closeBookingPassword');
    const passwordInput = document.getElementById('bookingPasswordInput');
    const confirmBtn = document.getElementById('confirmBookingPassword');
    const cancelBtn = document.getElementById('cancelBookingPassword');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        passwordInput.value = '';
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        passwordInput.value = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            passwordInput.value = '';
        }
    });
    
    confirmBtn.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;
        const correctPassword = state.bookingPassword?.password;
        
        if (enteredPassword === correctPassword) {
            modal.classList.remove('active');
            passwordInput.value = '';
            const day = parseInt(modal.dataset.day);
            window.dispatchEvent(new CustomEvent('openBookingModalDirect', { detail: { day } }));
        } else {
            alert('Senha incorreta!');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmBtn.click();
        }
    });
}

function initializeSetBookingPasswordModal() {
    const modal = document.getElementById('setBookingPasswordModal');
    const closeBtn = document.getElementById('closeSetBookingPassword');
    const cancelBtn = document.getElementById('cancelSetPassword');
    const saveBtn = document.getElementById('savePasswordBtn');
    const disableBtn = document.getElementById('disablePasswordBtn');
    const newPasswordInput = document.getElementById('newBookingPassword');
    const confirmPasswordInput = document.getElementById('confirmBookingPassword2');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    saveBtn.addEventListener('click', () => {
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        if (!newPassword) {
            alert('Por favor, digite uma senha.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (newPassword.length < 4) {
            alert('A senha deve ter pelo menos 4 caracteres.');
            return;
        }
        
        state.bookingPassword = {
            enabled: true,
            password: newPassword
        };
        
        saveState();
        alert('Senha de agendamento salva com sucesso!');
        modal.classList.remove('active');
    });
    
    disableBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja desabilitar a senha de agendamento?')) {
            state.bookingPassword = {
                enabled: false,
                password: null
            };
            saveState();
            alert('Senha de agendamento desabilitada!');
            modal.classList.remove('active');
        }
    });
}

function initializeStatisticsModal() {
    const modal = document.getElementById('statisticsModal');
    const closeBtn = document.getElementById('closeStatistics');
    const monthSelect = document.getElementById('statsMonthSelect');
    const yearSelect = document.getElementById('statsYearSelect');
    
    // Populate month and year selects
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 1; i <= currentYear + 2; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    
    monthSelect.value = state.currentMonth;
    yearSelect.value = state.currentYear;
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    monthSelect.addEventListener('change', () => {
        renderStatistics();
    });
    
    yearSelect.addEventListener('change', () => {
        renderStatistics();
    });
}

export function showStatistics() {
    const modal = document.getElementById('statisticsModal');
    const monthSelect = document.getElementById('statsMonthSelect');
    const yearSelect = document.getElementById('statsYearSelect');
    
    monthSelect.value = state.currentMonth;
    yearSelect.value = state.currentYear;
    
    renderStatistics();
    modal.classList.add('active');
}

function renderStatistics() {
    const content = document.getElementById('statisticsContent');
    const monthSelect = document.getElementById('statsMonthSelect');
    const yearSelect = document.getElementById('statsYearSelect');
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const configKey = `${year}-${month}`;
    const config = state.configurations[configKey];
    
    if (!config) {
        content.innerHTML = '<p class="no-statistics">Nenhuma configuração encontrada para este mês.</p>';
        return;
    }
    
    // Calculate statistics
    let totalBookings = 0;
    let totalActiveBookings = 0;
    let totalCancelled = 0;
    const dayStats = {};
    
    // Get all dates in the selected month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month}-${day}`;
        const dayBookings = state.bookings[dateKey] || [];
        
        if (dayBookings.length > 0) {
            const customConfig = state.customDayConfigurations && state.customDayConfigurations[dateKey];
            const effectiveConfig = customConfig || config;
            
            dayStats[dateKey] = {
                day: day,
                periods: {},
                total: 0,
                active: 0,
                cancelled: 0
            };
            
            dayBookings.forEach(booking => {
                totalBookings++;
                
                if (booking.cancellation) {
                    totalCancelled++;
                    dayStats[dateKey].cancelled++;
                } else {
                    totalActiveBookings++;
                    dayStats[dateKey].active++;
                }
                
                const period = effectiveConfig.periods[booking.periodIndex];
                if (period) {
                    const periodKey = `${booking.periodIndex}-${period.name}`;
                    if (!dayStats[dateKey].periods[periodKey]) {
                        dayStats[dateKey].periods[periodKey] = {
                            name: period.name,
                            time: `${period.start} - ${period.end}`,
                            count: 0,
                            active: 0,
                            cancelled: 0
                        };
                    }
                    dayStats[dateKey].periods[periodKey].count++;
                    if (booking.cancellation) {
                        dayStats[dateKey].periods[periodKey].cancelled++;
                    } else {
                        dayStats[dateKey].periods[periodKey].active++;
                    }
                }
                
                dayStats[dateKey].total++;
            });
        }
    }
    
    // Render statistics
    let html = `
        <div class="statistics-summary">
            <div class="stat-card" data-filter="all">
                <h3>Total de Agendamentos</h3>
                <div class="stat-number">${totalBookings}</div>
                <small style="color: var(--text-secondary); font-size: 11px; display: block; margin-top: 4px;">Clique 2x para detalhes</small>
            </div>
            <div class="stat-card" data-filter="active">
                <h3>Agendamentos Ativos</h3>
                <div class="stat-number" style="color: #4caf50;">${totalActiveBookings}</div>
                <small style="color: var(--text-secondary); font-size: 11px; display: block; margin-top: 4px;">Clique 2x para detalhes</small>
            </div>
            <div class="stat-card" data-filter="cancelled">
                <h3>Cancelados</h3>
                <div class="stat-number" style="color: #f44336;">${totalCancelled}</div>
                <small style="color: var(--text-secondary); font-size: 11px; display: block; margin-top: 4px;">Clique 2x para detalhes</small>
            </div>
        </div>
        <div id="detailedStats" class="statistics-days" style="display: none;"></div>
    `;
    
    content.innerHTML = html;
    
    // Add double-click handlers to stat cards
    const statCards = content.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('dblclick', () => {
            const filter = card.dataset.filter;
            const detailedStats = document.getElementById('detailedStats');
            
            // Toggle visibility
            if (detailedStats.style.display === 'block' && detailedStats.dataset.currentFilter === filter) {
                detailedStats.style.display = 'none';
                detailedStats.innerHTML = '';
            } else {
                renderDetailedStats(dayStats, filter, months, month, year);
                detailedStats.style.display = 'block';
                detailedStats.dataset.currentFilter = filter;
            }
        });
    });
}

function renderDetailedStats(dayStats, filter, months, month, year) {
    const detailedStats = document.getElementById('detailedStats');
    let html = '';
    
    if (Object.keys(dayStats).length === 0) {
        html = '<p class="no-statistics">Nenhum agendamento encontrado.</p>';
    } else {
        // Sort by date
        const sortedDates = Object.keys(dayStats).sort();
        
        sortedDates.forEach(dateKey => {
            const stats = dayStats[dateKey];
            
            // Apply filter
            let shouldShow = false;
            let filterCount = 0;
            
            if (filter === 'all') {
                shouldShow = stats.total > 0;
                filterCount = stats.total;
            } else if (filter === 'active') {
                shouldShow = stats.active > 0;
                filterCount = stats.active;
            } else if (filter === 'cancelled') {
                shouldShow = stats.cancelled > 0;
                filterCount = stats.cancelled;
            }
            
            if (!shouldShow) return;
            
            html += `
                <div class="stat-day-group">
                    <h3>${stats.day} de ${months[month]} de ${year} - ${filterCount} ${filter === 'all' ? 'total' : (filter === 'active' ? 'ativos' : 'cancelados')}</h3>
                    <div class="stat-periods">
            `;
            
            Object.values(stats.periods).forEach(period => {
                let periodCount = 0;
                let periodLabel = '';
                
                if (filter === 'all') {
                    periodCount = period.count;
                    periodLabel = period.count;
                    if (period.cancelled > 0) {
                        periodLabel += ` (${period.active} ativos, ${period.cancelled} cancelados)`;
                    }
                } else if (filter === 'active') {
                    periodCount = period.active;
                    periodLabel = period.active;
                } else if (filter === 'cancelled') {
                    periodCount = period.cancelled;
                    periodLabel = period.cancelled;
                }
                
                if (periodCount > 0) {
                    html += `
                        <div class="stat-period-item">
                            <div>
                                <div class="stat-period-name">${period.name}</div>
                                <div style="font-size: 12px; color: var(--text-secondary);">${period.time}</div>
                            </div>
                            <div class="stat-period-count">${periodLabel}</div>
                        </div>
                    `;
                }
            });
            
            html += `
                    </div>
                </div>
            `;
        });
    }
    
    detailedStats.innerHTML = html;
}