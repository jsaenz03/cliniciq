    // SWPE & PIP Calculator Logic
    // Age/gender weighting factors (Standardised Whole Patient Equivalent)
    // Source: Department of Human Services, August 2019 (most recent officially published table)
    const swpe_weights = {
      female: [0.5298, 0.8482, 0.5000, 0.8333, 1.0387, 1.1071, 1.4405, 2.1667],
      male:   [0.5714, 0.9226, 0.5089, 0.5387, 0.6875, 0.8958, 1.3006, 1.9732]
    };

    function resetForm() {
      document.querySelectorAll('#swpe-pip-form input[type="number"]').forEach(input => {
        input.value = '0';
      });
      document.getElementById('fraction').value = '1';
      document.getElementById('afterhours').value = '0';
      document.getElementById('swpe-pip-calc-result').style.display = 'none';
    }

    document.getElementById('swpe-pip-form').addEventListener('submit', function(e) {
      e.preventDefault();
      let totalSWPE = 0;

      // Get fraction of care
      let fraction = parseFloat(document.getElementById('fraction').value);

      // Calculate SWPE for each age group and gender
      for (let i = 0; i < 8; i++) {
        let female_count = parseInt(document.querySelector(`input[name="female_${i}"]`).value) || 0;
        let male_count = parseInt(document.querySelector(`input[name="male_${i}"]`).value) || 0;
        totalSWPE += female_count * swpe_weights.female[i] * fraction;
        totalSWPE += male_count * swpe_weights.male[i] * fraction;
      }

      // PIP incentive calculation
      let afterhours = parseFloat(document.getElementById('afterhours').value);
      let ah_rate = 0;
      if (afterhours === 1) ah_rate = 1.0;
      else if (afterhours === 2) ah_rate = 4.0;
      else if (afterhours === 3) ah_rate = 5.5;
      else if (afterhours === 5) ah_rate = 11.0;

      // PIP QI Incentive (Quality Improvement)
      // $5.00 per SWPE per annum, capped at $50,000/yr ($12,500/quarter); cap reached at SWPE 10,000
      let qi_swpe = Math.min(totalSWPE, 10000);
      let qi_per_year = Math.min(qi_swpe * 5, 50000);
      let qi_per_quarter = qi_per_year / 4;

      // After Hours Incentive
      let ah_swpe = Math.min(totalSWPE, 4000); // After Hours capped at 4000 SWPE
      let ah_per_quarter = ah_swpe * ah_rate;
      let ah_per_year = ah_per_quarter * 4;

      // My Health Record shared health summary upload target (PIP eHealth Requirement 5(iii))
      // 0.5% of SWPE per quarter; new/small practices (SWPE < 1,000) use default SWPE of 1,000; rounded down.
      let upload_swpe = Math.max(totalSWPE, 1000);
      let upload_target = Math.floor(upload_swpe * 0.005);

      document.getElementById('swpe-pip-calc-result').style.display = 'block';
      document.getElementById('swpe-result-content').innerHTML = `
        <div class="result-item">
          <span class="result-label">Practice SWPE:</span>
          <span class="result-value">${totalSWPE.toFixed(2)}</span>
        </div>
        <div class="result-item">
          <span class="result-label">My Health Record Upload Target:</span>
          <span class="result-value">${upload_target} / quarter</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">PIP Quality Improvement Incentive:</span>
          <span class="result-value">$${qi_per_year.toLocaleString()} / year</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">PIP After Hours Incentive:</span>
          <span class="result-value">$${ah_per_year.toLocaleString()} / year</span>
        </div>
      `;
      document.getElementById('swpe-pip-calc-result').classList.add('show');
    });

    // WIP Calculator Logic — Workforce Incentive Program (Practice Stream)
    // Payment rates current as at 1 July 2026 (annual August-quarter indexation applies)
    // Source: WIP Practice Stream Guidelines, Table 2 (health.gov.au)
    const WIP_PARAMS = {
      // Per-1000-SWPE annual amounts (high-tier / low-tier eligible professionals)
      high_per_1000: 35236.84,
      low_per_1000: 17618.42,
      // Minimum weekly hours required at the 4000-SWPE tier (scales linearly with SWPE)
      full_hours_at_4000: 50.6667,
      rural_loading: {
        MM1: 0, MM2: 0, MM3: 30, MM4: 40, MM5: 40, MM6: 60, MM7: 60
      },
      max_swpe: 4000,
      ams_swpe_boost: 0.5
    };

    function calculateIncentive(swpe, highHours, lowHours, mmm, ams) {
      if (ams) swpe *= (1 + WIP_PARAMS.ams_swpe_boost);
      swpe = Math.min(swpe, WIP_PARAMS.max_swpe);

      // Minimum eligible hours scale linearly with SWPE (12h40m per 1,000 SWPE)
      let minHours = (swpe / 1000) * 12.6667;

      // High-tier hours are consumed FIRST from the pool; low-tier fills the remaining cap.
      // (Guidelines s.5: "those eligible for the higher incentive ... will be calculated first")
      let highUsed = Math.min(highHours, minHours);
      let remaining = Math.max(0, minHours - highUsed);
      let lowUsed = Math.min(lowHours, remaining);

      let swpeUnits = swpe / 1000;
      let highContribution = minHours > 0 ? (highUsed / minHours) * swpeUnits * WIP_PARAMS.high_per_1000 : 0;
      let lowContribution  = minHours > 0 ? (lowUsed  / minHours) * swpeUnits * WIP_PARAMS.low_per_1000  : 0;

      let baseIncentive = highContribution + lowContribution;
      let loading = WIP_PARAMS.rural_loading[mmm];
      let totalIncentive = baseIncentive * (1 + loading / 100);

      return {
        base: Math.round(baseIncentive),
        loading: Math.round(baseIncentive * loading / 100),
        total: Math.round(totalIncentive),
        highContribution: Math.round(highContribution),
        lowContribution: Math.round(lowContribution),
        minHours: minHours.toFixed(1),
        highUsed: highUsed.toFixed(1),
        lowUsed: lowUsed.toFixed(1),
        loadingPercent: loading
      };
    }

    document.getElementById('wip-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const swpe = parseFloat(document.getElementById('swpe').value) || 0;
      const highHours = parseFloat(document.getElementById('high_hours').value) || 0;
      const lowHours = parseFloat(document.getElementById('low_hours').value) || 0;
      const mmm = document.getElementById('mmm').value;
      const ams = document.getElementById('ams').checked;

      const result = calculateIncentive(swpe, highHours, lowHours, mmm, ams);

      document.getElementById('cliniciq-result').style.display = 'block';
      document.getElementById('wip-result-content').innerHTML = `
        <div class="result-item result-highlight">
          <span class="result-label">Total Annual Incentive:</span>
          <span class="result-value">$${result.total.toLocaleString()}</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">Base Incentive:</span>
          <span class="result-value">$${result.base.toLocaleString()}</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">Rural Loading (${result.loadingPercent}%):</span>
          <span class="result-value">$${result.loading.toLocaleString()}</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">SWPE Value (capped at 4,000):</span>
          <span class="result-value">${Math.round(swpe)}</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">Min Hours / Week:</span>
          <span class="result-value">${result.minHours} hrs</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">Eligible High-Tier Hours:</span>
          <span class="result-value">${result.highUsed} hrs</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">Eligible Low-Tier Hours:</span>
          <span class="result-value">${result.lowUsed} hrs</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">High-Tier Contribution:</span>
          <span class="result-value">$${result.highContribution.toLocaleString()}</span>
        </div>
        <div class="result-item result-detail">
          <span class="result-label">Low-Tier Contribution:</span>
          <span class="result-value">$${result.lowContribution.toLocaleString()}</span>
        </div>
        <p class="result-note">Note: Estimate based on inputs. Payment rates current as at 1 July 2026 (subject to annual August-quarter indexation). WIP eligibility and payments are formally assessed by Services Australia / the Department of Health, Disability and Ageing.</p>
      `;
      document.getElementById('cliniciq-result').classList.add('show');
    });
        // ROI Calculator
        function calculateROI() {
            const investment = parseFloat(document.getElementById('roi-investment').value) || 0;
            const annualSavings = parseFloat(document.getElementById('roi-annual-savings').value) || 0;
            const period = parseFloat(document.getElementById('roi-period').value) || 1;
            const maintenance = parseFloat(document.getElementById('roi-maintenance').value) || 0;

            const totalSavings = (annualSavings - maintenance) * period;
            const netSavings = totalSavings - investment;
            const roiPercentage = investment > 0 ? ((netSavings / investment) * 100) : 0;
            const paybackMonths = investment > 0 && (annualSavings - maintenance) > 0 ?
                (investment / (annualSavings - maintenance)) * 12 : 0;

            document.getElementById('roi-total-savings').textContent = '$' + netSavings.toLocaleString();
            document.getElementById('roi-percentage').textContent = roiPercentage.toFixed(1) + '%';
            document.getElementById('roi-payback').textContent = paybackMonths.toFixed(1) + ' months';

            document.getElementById('roi-results').classList.add('show');
        }

        // Time Savings Calculator
        function calculateTimeSavings() {
            const hoursPerWeek = parseFloat(document.getElementById('time-hours-week').value) || 0;
            const hourlyRate = parseFloat(document.getElementById('time-hourly-rate').value) || 0;
            const automationPercent = parseFloat(document.getElementById('time-automation-percent').value) || 0;
            const employees = parseFloat(document.getElementById('time-employees').value) || 1;

            const hoursSaved = hoursPerWeek * (automationPercent / 100) * employees;
            const weeklySavings = hoursSaved * hourlyRate;
            const annualSavings = weeklySavings * 52;
            const monthlySavings = annualSavings / 12;

            document.getElementById('time-hours-saved').textContent = hoursSaved.toFixed(1) + ' hours';
            document.getElementById('time-annual-savings').textContent = '$' + annualSavings.toLocaleString();
            document.getElementById('time-monthly-savings').textContent = '$' + monthlySavings.toLocaleString();

            document.getElementById('time-results').classList.add('show');
        }

        // Website Cost Calculator
        function calculateWebsiteCost() {
            const pages = parseInt(document.getElementById('website-pages').value) || 1;
            const complexity = parseFloat(document.getElementById('website-complexity').value) || 1;
            const ecommerce = parseInt(document.getElementById('website-ecommerce').value) || 0;
            const cms = parseInt(document.getElementById('website-cms').value) || 0;

            const baseCostPerPage = 300;
            const baseCost = pages * baseCostPerPage * complexity;
            const featuresCost = ecommerce + cms;
            const totalCost = baseCost + featuresCost;

            document.getElementById('website-base-cost').textContent = '$' + baseCost.toLocaleString();
            document.getElementById('website-features-cost').textContent = '$' + featuresCost.toLocaleString();
            document.getElementById('website-total-cost').textContent = '$' + totalCost.toLocaleString();

            document.getElementById('website-results').classList.add('show');
        }

        // Automation Potential Calculator
        function calculateAutomationPotential() {
            const repetitive = parseInt(document.getElementById('auto-repetitive').value) || 0;
            const timeConsuming = parseInt(document.getElementById('auto-time-consuming').value) || 0;
            const errorProne = parseInt(document.getElementById('auto-error-prone').value) || 0;
            const ruleBased = parseInt(document.getElementById('auto-rule-based').value) || 0;
            const volume = parseInt(document.getElementById('auto-volume').value) || 0;
            const impact = parseInt(document.getElementById('auto-impact').value) || 0;

            const score = (repetitive + timeConsuming + errorProne + ruleBased + volume + impact) / 6;

            let priority, recommendation;
            if (score >= 8) {
                priority = 'Very High';
                recommendation = 'Immediate automation';
            } else if (score >= 6) {
                priority = 'High';
                recommendation = 'Plan automation';
            } else if (score >= 4) {
                priority = 'Medium';
                recommendation = 'Consider automation';
            } else {
                priority = 'Low';
                recommendation = 'Manual process okay';
            }

            document.getElementById('auto-score').textContent = score.toFixed(1) + '/10';
            document.getElementById('auto-priority').textContent = priority;
            document.getElementById('auto-recommendation').textContent = recommendation;

            document.getElementById('automation-results').classList.add('show');
        }

        // Cost Per Lead Calculator
        function calculateCPL() {
            const marketingSpend = parseFloat(document.getElementById('cpl-marketing-spend').value) || 0;
            const leadsGenerated = parseInt(document.getElementById('cpl-leads-generated').value) || 1;
            const conversionRate = parseFloat(document.getElementById('cpl-conversion-rate').value) || 0;
            const avgDeal = parseFloat(document.getElementById('cpl-avg-deal').value) || 0;

            const costPerLead = marketingSpend / leadsGenerated;
            const costPerCustomer = costPerLead / (conversionRate / 100);
            const revenue = leadsGenerated * (conversionRate / 100) * avgDeal;
            const roi = marketingSpend > 0 ? ((revenue - marketingSpend) / marketingSpend) * 100 : 0;

            document.getElementById('cpl-cost').textContent = '$' + costPerLead.toFixed(2);
            document.getElementById('cpl-customer-cost').textContent = '$' + costPerCustomer.toFixed(2);
            document.getElementById('cpl-roi').textContent = roi.toFixed(1) + '%';

            document.getElementById('cpl-results').classList.add('show');
        }

        // Productivity Impact Calculator
        function calculateProductivity() {
            const currentOutput = parseInt(document.getElementById('prod-current-output').value) || 0;
            const improvedOutput = parseInt(document.getElementById('prod-improved-output').value) || 0;
            const valuePerUnit = parseFloat(document.getElementById('prod-value-per-unit').value) || 0;
            const workingDays = parseInt(document.getElementById('prod-working-days').value) || 250;

            const productivityIncrease = currentOutput > 0 ? ((improvedOutput - currentOutput) / currentOutput) * 100 : 0;
            const additionalUnits = improvedOutput - currentOutput;
            const annualValue = additionalUnits * valuePerUnit * workingDays;
            const monthlyValue = annualValue / 12;

            document.getElementById('prod-increase').textContent = productivityIncrease.toFixed(1) + '%';
            document.getElementById('prod-annual-value').textContent = '$' + annualValue.toLocaleString();
            document.getElementById('prod-monthly-value').textContent = '$' + monthlyValue.toLocaleString();

            document.getElementById('productivity-results').classList.add('show');
        }

        // BBPIP (Bulk Billing Practice Incentive Program) Calculator
        // Effective 1 Nov 2025: 12.5% incentive on eligible MBS benefits, split 50/50 GP/practice.
        function calculateBBPIP() {
            const annualMBS = parseFloat(document.getElementById('bbpip-annual-mbs').value) || 0;
            const split = parseFloat(document.getElementById('bbpip-split').value);

            const total = annualMBS * 0.125;
            // split value = practice share fraction (0.5 default → GP gets 0.5 too)
            const practiceShare = total * split;
            const gpShare = total - practiceShare;

            document.getElementById('bbpip-total').textContent = '$' + total.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('bbpip-gp').textContent = '$' + gpShare.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('bbpip-practice').textContent = '$' + practiceShare.toLocaleString(undefined, {maximumFractionDigits: 0});

            document.getElementById('bbpip-results').classList.add('show');
        }

        // GP in Aged Care Incentive Calculator
        // Effective 1 Jul 2024: $300/resident/yr to provider + $130/resident/yr to practice, + rural loading.
        function calculateAgedCare() {
            const patients = parseInt(document.getElementById('ac-patients').value) || 0;
            const loadingPct = parseFloat(document.getElementById('ac-mmm').value) || 0;
            const loadingFactor = 1 + loadingPct / 100;

            const gpPayment = patients * 300 * loadingFactor;
            const practicePayment = patients * 130 * loadingFactor;
            const total = gpPayment + practicePayment;

            document.getElementById('ac-gp').textContent = '$' + gpPayment.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('ac-practice').textContent = '$' + practicePayment.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('ac-total').textContent = '$' + total.toLocaleString(undefined, {maximumFractionDigits: 0});

            document.getElementById('agedcare-results').classList.add('show');
        }

        // Chronic Disease & Health Assessment Billing Opportunity Calculator
        // Item 703 standard health assessment fee $165.05; item 965 GPCCMP prep fee ~$164.00.
        function calculateCDM() {
            const feeHealthAssess = 165.05;
            const feeGPCCMP = 164.00;

            const patients75 = parseInt(document.getElementById('cdm-patients-75').value) || 0;
            const billed75 = parseFloat(document.getElementById('cdm-billed-75').value) || 0;
            const patientsChronic = parseInt(document.getElementById('cdm-patients-chronic').value) || 0;
            const billedChronic = parseFloat(document.getElementById('cdm-billed-chronic').value) || 0;

            const currentHA = patients75 * (billed75 / 100) * feeHealthAssess;
            const potentialHA = patients75 * feeHealthAssess;
            const currentCDM = patientsChronic * (billedChronic / 100) * feeGPCCMP;
            const potentialCDM = patientsChronic * feeGPCCMP;

            const current = currentHA + currentCDM;
            const potential = potentialHA + potentialCDM;
            const opportunity = potential - current;

            document.getElementById('cdm-current').textContent = '$' + current.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('cdm-potential').textContent = '$' + potential.toLocaleString(undefined, {maximumFractionDigits: 0});
            document.getElementById('cdm-opportunity').textContent = '$' + opportunity.toLocaleString(undefined, {maximumFractionDigits: 0});

            document.getElementById('cdm-results').classList.add('show');
        }
    // Australian date helpers (DD/MM/YYYY). Input format is explicit because
    // <input type="date"> renders in the browser/OS locale, which is unsafe for
    // clinical use where DD/MM vs MM/DD confusion causes real errors.
    // Normalise a wide range of Australian date inputs to DD/MM/YYYY.
    // Accepts "/", "-", "." or whitespace as separators; pads single-digit
    // day/month; expands a 2-digit year (00-29 -> 20xx, 30-99 -> 19xx).
    // A date with no year part ("25/12", typed positionally as "2512")
    // normalises to the CURRENT year.
    // Returns "DD/MM/YYYY" or null if it cannot be parsed.
    function normaliseAuDate(str) {
        if (str == null) return null;
        const parts = String(str).trim().split(/[/.\-\s]+/).filter(p => p !== '');
        if (parts.length < 2 || parts.length > 3) return null;
        let [d, mo, y] = parts;
        if (y === undefined) y = String(new Date().getFullYear());
        if (!/^\d{1,2}$/.test(d) || !/^\d{1,2}$/.test(mo)) return null;
        if (!/^\d{2}$/.test(y) && !/^\d{4}$/.test(y)) return null;
        d = d.padStart(2, '0');
        mo = mo.padStart(2, '0');
        if (y.length === 2) {
            const yy = parseInt(y, 10);
            y = String(yy <= 29 ? 2000 + yy : 1900 + yy);
        }
        return d + '/' + mo + '/' + y;
    }
    function parseAuDate(str) {
        const norm = normaliseAuDate(str);
        if (!norm) return new Date(NaN);
        const [d, mo, y] = norm.split('/').map(n => parseInt(n, 10));
        const dt = new Date(y, mo - 1, d);
        // reject rollover dates like 31/02
        if (dt.getDate() !== d || dt.getMonth() !== mo - 1 || dt.getFullYear() !== y) return new Date(NaN);
        return dt;
    }
    function formatAuDate(dt) {
        return String(dt.getDate()).padStart(2, '0') + '/' +
               String(dt.getMonth() + 1).padStart(2, '0') + '/' +
               dt.getFullYear();
    }
    // Auto-mask typed digits into DD/MM/YYYY
    // Australian date mask. Allows free-text with OR without slashes and never
    // eats typed digits. Pure-digit typing auto-inserts slashes; once the user
    // types a slash we respect it as a segment boundary. Final padding
    // ("5" -> "05") happens on blur so live typing stays predictable.
    // Live formatting while typing: keep digits and any separator (/ - . space),
    // normalise separators to "/", and auto-insert slashes for pure-digit entry.
    function formatAuDateInput(raw) {
        let v = String(raw).replace(/[^\d/.\-\s]/g, '')     // keep digits + separators
                           .replace(/[.\-\s]+/g, '/')        // other separators -> /
                           .replace(/\/{2,}/g, '/')          // collapse //
                           .replace(/^\/+/, '')              // no leading slash
                           .slice(0, 10);
        if (!v.includes('/')) {
            // no separators yet — positional DDMMYYYY
            const d = v.slice(0, 8);
            if (d.length > 4) return d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4);
            if (d.length > 2) return d.slice(0, 2) + '/' + d.slice(2);
            return d;
        }
        return v; // separators respected; finalize pads/expands on blur
    }
    // On blur, normalise fully to DD/MM/YYYY via the shared normaliser
    // (handles 3-3-23, 3.3.23, 3 3 23, single digits and 2-digit years).
    function finalizeAuDate(raw) {
        return normaliseAuDate(raw) || String(raw || '').trim();
    }
    function attachAuDateMask(el) {
        el.addEventListener('input', () => { el.value = formatAuDateInput(el.value); });
        el.addEventListener('blur', () => {
            const final = finalizeAuDate(el.value);
            if (final !== el.value) { el.value = final; el.dispatchEvent(new Event('input')); }
            // mirror valid value into the paired native picker so it opens on the right date
            const dt = parseAuDate(el.value);
            const native = document.querySelector('.date-picker-native[data-date-target="' + el.id + '"]');
            if (native) native.value = isNaN(dt) ? '' : dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
        });
    }
    // Calendar picker: button opens the hidden native <input type="date">; the
    // chosen ISO date is mirrored back into the text field as DD/MM/YYYY.
    function attachAuDatePicker(textId) {
        const textEl = document.getElementById(textId);
        const native = document.querySelector('.date-picker-native[data-date-target="' + textId + '"]');
        if (!textEl || !native) return;
        // The native date input is overlaid on the calendar icon, so a tap opens
        // the OS picker directly (no showPicker() — reliable on mobile + desktop).
        // When a date is chosen, mirror it into the text field as DD/MM/YYYY.
        native.addEventListener('change', () => {
            if (!native.value) return; // native value is YYYY-MM-DD
            const [y, mo, d] = native.value.split('-');
            textEl.value = d + '/' + mo + '/' + y;
            textEl.dispatchEvent(new Event('input'));
        });
    }
    function showCalcError(id, msg) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = msg;
        el.classList.toggle('show', !!msg);
    }

    // Build a "X years, Y months, ..." string from [value, unit] pairs,
    // omitting zero values and pluralising correctly. Falls back to "0 days".
    function formatMixedUnit(pairs) {
        const parts = [];
        pairs.forEach(([val, unit]) => {
            if (val) parts.push(val + ' ' + unit + (val !== 1 ? 's' : ''));
        });
        return parts.length ? parts.join(', ') : '0 days';
    }
    // ===== Date Difference Calculator =====
    function calculateDateDiff() {
        const startEl = document.getElementById('datediff-start');
        const endEl = document.getElementById('datediff-end');
        showCalcError('datediff-error', '');
        const start = parseAuDate(startEl.value);
        const end = parseAuDate(endEl.value);
        if (isNaN(start) || isNaN(end)) {
            document.getElementById('datediff-results').classList.remove('show');
            return showCalcError('datediff-error', 'Please enter both dates as DD/MM/YYYY.');
        }
        const inclusive = document.getElementById('datediff-inclusive').checked;

        // order earliest -> latest
        let s = start, e = end, reversed = false;
        if (e < s) { const t = s; s = e; e = t; reversed = true; }

        let years = e.getFullYear() - s.getFullYear();
        let months = e.getMonth() - s.getMonth();
        let days = e.getDate() - s.getDate();
        if (days < 0) {
            months--;
            days += new Date(e.getFullYear(), e.getMonth(), 0).getDate();
        }
        if (months < 0) { years--; months += 12; }

        let totalDays = Math.round((e - s) / 86400000);
        if (inclusive) totalDays += 1;

        let weeks = Math.floor(days / 7);
        let remDays = days % 7;
        if (inclusive) { remDays += 1; if (remDays >= 7) { weeks++; remDays -= 7; } }

        // headline calendar breakdown — no decimals, zero units omitted
        const breakdown = (reversed ? '(dates reversed) ' : '') +
            formatMixedUnit([[years, 'year'], [months, 'month'], [weeks, 'week'], [remDays, 'day']]);

        // "Total Weeks" — split the leftover days instead of dropping them
        const wkVal = Math.floor(totalDays / 7);
        const weeksBreakdown = formatMixedUnit([[wkVal, 'week'], [totalDays - wkVal * 7, 'day']]);

        // "Total Months (approx)" — convert the decimal remainder into weeks + days
        let moVal = Math.floor(totalDays / 30.4375);
        let moRemDays = totalDays - moVal * 30.4375;
        let moWeeks = Math.floor(moRemDays / 7);
        let moDays = Math.round(moRemDays - moWeeks * 7);
        if (moDays >= 7) { moWeeks++; moDays -= 7; }
        const monthsBreakdown = formatMixedUnit([[moVal, 'month'], [moWeeks, 'week'], [moDays, 'day']]);

        document.getElementById('datediff-breakdown').textContent = breakdown;
        document.getElementById('datediff-total-days').textContent = totalDays.toLocaleString();
        document.getElementById('datediff-total-weeks').textContent = weeksBreakdown;
        document.getElementById('datediff-total-months').textContent = monthsBreakdown;
        document.getElementById('datediff-results').classList.add('show');
    }

    // ===== Date Add / Subtract Calculator =====
    function calculateDateAdd() {
        const startEl = document.getElementById('dateadd-start');
        showCalcError('dateadd-error', '');
        const start = parseAuDate(startEl.value);
        if (isNaN(start)) {
            document.getElementById('dateadd-results').classList.remove('show');
            return showCalcError('dateadd-error', 'Please enter the start date as DD/MM/YYYY.');
        }
        const years = parseInt(document.getElementById('dateadd-years').value) || 0;
        const months = parseInt(document.getElementById('dateadd-months').value) || 0;
        const weeks = parseInt(document.getElementById('dateadd-weeks').value) || 0;
        const days = parseInt(document.getElementById('dateadd-days').value) || 0;

        const d = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        d.setFullYear(d.getFullYear() + years);
        d.setMonth(d.getMonth() + months);
        d.setDate(d.getDate() + weeks * 7 + days);
        if (isNaN(d)) {
            document.getElementById('dateadd-results').classList.remove('show');
            return showCalcError('dateadd-error', 'That combination of values is out of range.');
        }

        document.getElementById('dateadd-result').textContent = formatAuDate(d);
        document.getElementById('dateadd-weekday').textContent = d.toLocaleDateString('en-AU', { weekday: 'long' });
        document.getElementById('dateadd-results').classList.add('show');
    }

    // Trim float noise for working lines: 41.6666 -> 41.67, 250 -> 250
    function fmtWorking(n) { return String(Math.round(n * 100) / 100); }

    // Substituted working for the results panel ("500 mg ÷ 10 mL = 50.00 mg/mL").
    // The Excluded Goods Determination's calculator exclusion (item 14L) only
    // covers software that displays calculations in a manner the user can
    // validate, so the working must show the actual numbers, not just the formula.
    function medDoseWorking(stock, volume, dose, unit, result) {
        const conc = result.conc.toFixed(2) + ' mg/mL';
        const steps = [fmtWorking(stock) + ' mg ÷ ' + fmtWorking(volume) + ' mL = ' + conc];
        const mg = unit === 'mcg' ? dose / 1000 : dose;
        if (unit === 'mcg') steps.push(fmtWorking(dose) + ' mcg ÷ 1000 = ' + fmtWorking(mg) + ' mg');
        steps.push(fmtWorking(mg) + ' mg ÷ ' + conc + ' = ' + result.ml.toFixed(2) + ' mL');
        return steps;
    }

    function ivFluidWorking(input, result, timeStr) {
        const vol = fmtWorking(input.volume);
        const df = fmtWorking(input.dropFactor);
        if (input.mode === 'rate') {
            const t = fmtWorking(input.time || 0);
            return [
                vol + ' mL × ' + df + ' gtt/mL ÷ (' + t + (input.timeUnit === 'hr' ? ' hr × 60 min' : ' min') + ') = ' + Math.round(result.gttMin) + ' gtt/min',
                vol + ' mL ÷ ' + t + (input.timeUnit === 'hr' ? ' hr' : ' min × 60') + ' = ' + result.mLhr.toFixed(1) + ' mL/hr'
            ];
        }
        const r = fmtWorking(input.rate || 0);
        const mins = fmtWorking(result.timeMin) + ' min (' + timeStr + ')';
        if (input.rateUnit === 'mghr') {
            return [
                r + ' mL/hr × ' + df + ' gtt/mL ÷ 60 = ' + Math.round(result.gttMin) + ' gtt/min',
                vol + ' mL ÷ ' + r + ' mL/hr × 60 = ' + mins
            ];
        }
        return [
            r + ' gtt/min × 60 ÷ ' + df + ' gtt/mL = ' + result.mLhr.toFixed(1) + ' mL/hr',
            vol + ' mL × ' + df + ' gtt/mL ÷ ' + r + ' gtt/min = ' + mins
        ];
    }

    // ===== Medication Dose Calculator =====
    // Volume to administer from a known solution concentration.
    function calculateMedDose() {
        showCalcError('meddose-error', '');
        const stock = parseFloat(document.getElementById('med-stock').value);
        const volume = parseFloat(document.getElementById('med-volume').value);
        const dose = parseFloat(document.getElementById('med-dose').value);
        if (!(stock > 0) || !(volume > 0) || isNaN(stock) || isNaN(volume) || isNaN(dose) || dose < 0) {
            document.getElementById('meddose-results').classList.remove('show');
            return showCalcError('meddose-error', 'Enter stock amount (mg), solution volume (mL) and ordered dose.');
        }
        const unit = document.getElementById('med-doseunit').value;
        const conc = stock / volume;            // mg/mL
        const doseMg = unit === 'mcg' ? dose / 1000 : dose;
        const ml = doseMg / conc;

        document.getElementById('med-conc').textContent = conc.toFixed(2) + ' mg/mL';
        document.getElementById('med-ml').textContent = ml.toFixed(2) + ' mL';
        document.getElementById('med-working').textContent = medDoseWorking(stock, volume, dose, unit, { conc: conc, ml: ml }).join('\n');
        document.getElementById('meddose-results').classList.add('show');
    }

    // ===== IV Fluid — Drop Rate & Time Calculator (solves either way) =====
    function toggleIvMode() {
        const mode = document.getElementById('iv-solve').value;
        document.getElementById('iv-time-row').style.display = (mode === 'rate') ? '' : 'none';
        document.getElementById('iv-rate-row').style.display = (mode === 'time') ? '' : 'none';
    }
    function calculateIvFluid() {
        showCalcError('ivfluid-error', '');
        const volume = parseFloat(document.getElementById('iv-volume').value);
        const dropFactor = parseFloat(document.getElementById('iv-dropfactor').value) || 20;
        if (!(volume > 0) || isNaN(volume)) {
            document.getElementById('ivfluid-results').classList.remove('show');
            return showCalcError('ivfluid-error', 'Enter the total IV volume (mL).');
        }
        const mode = document.getElementById('iv-solve').value;
        let timeMin, mLhr, gttMin;

        if (mode === 'rate') {
            const t = parseFloat(document.getElementById('iv-time').value);
            if (!(t > 0) || isNaN(t)) {
                document.getElementById('ivfluid-results').classList.remove('show');
                return showCalcError('ivfluid-error', 'Enter the target infusion time.');
            }
            timeMin = document.getElementById('iv-timeunit').value === 'hr' ? t * 60 : t;
            gttMin = volume * dropFactor / timeMin;
            mLhr = volume / (timeMin / 60);
        } else {
            const r = parseFloat(document.getElementById('iv-rate').value);
            if (!(r > 0) || isNaN(r)) {
                document.getElementById('ivfluid-results').classList.remove('show');
                return showCalcError('ivfluid-error', 'Enter the current flow rate.');
            }
            if (document.getElementById('iv-rateunit').value === 'mghr') {
                mLhr = r; gttMin = r * dropFactor / 60; timeMin = volume / r * 60;
            } else {
                gttMin = r; mLhr = r * 60 / dropFactor; timeMin = volume * dropFactor / r;
            }
        }
        const hh = Math.floor(timeMin / 60), mm = Math.round(timeMin % 60);
        const timeStr = (hh ? hh + ' hr ' : '') + mm + ' min';

        document.getElementById('iv-out-gtt').textContent = Math.round(gttMin) + ' gtt/min';
        document.getElementById('iv-out-mlhr').textContent = mLhr.toFixed(1) + ' mL/hr';
        document.getElementById('iv-out-time').textContent = timeStr;
        document.getElementById('iv-working').textContent = ivFluidWorking({
            volume: volume,
            dropFactor: dropFactor,
            mode: mode,
            time: parseFloat(document.getElementById('iv-time').value),
            timeUnit: document.getElementById('iv-timeunit').value,
            rate: parseFloat(document.getElementById('iv-rate').value),
            rateUnit: document.getElementById('iv-rateunit').value
        }, { gttMin: gttMin, mLhr: mLhr, timeMin: timeMin }, timeStr).join('\n');
        // highlight whichever value was solved for
        const solved = mode === 'rate' ? 'iv-row-gtt' : 'iv-row-time';
        ['iv-row-gtt', 'iv-row-mlhr', 'iv-row-time'].forEach(id => {
            document.getElementById(id).classList.toggle('result-highlight', id === solved);
        });
        document.getElementById('ivfluid-results').classList.add('show');
    }

    // "Today" helper — fills a date field with today's date (local, DD/MM/YYYY)
    function auToday() {
        const d = new Date();
        return String(d.getDate()).padStart(2, '0') + '/' +
               String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
    }
    function attachAuTodayButton(textId) {
        const textEl = document.getElementById(textId);
        const btn = document.querySelector('.today-btn[data-date-target="' + textId + '"]');
        if (!textEl || !btn) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); /* never let this tap also activate the date picker */
            textEl.value = auToday();
            textEl.dispatchEvent(new Event('input'));
            // keep the native calendar picker in sync too
            const dt = parseAuDate(textEl.value);
            const native = document.querySelector('.date-picker-native[data-date-target="' + textId + '"]');
            if (native) native.value = isNaN(dt) ? '' : dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
            textEl.focus();
        });
    }

    // Wire up auto-formatting masks, calendar pickers and Today buttons
    ['datediff-start', 'datediff-end', 'dateadd-start'].forEach(id => {
        const el = document.getElementById(id);
        if (el) attachAuDateMask(el);
        attachAuDatePicker(id);
        attachAuTodayButton(id);
    });

    // Default the Date Difference "End Date" (to-date) to today
    const datediffEnd = document.getElementById('datediff-end');
    if (datediffEnd) {
        datediffEnd.value = auToday();
        const dt = parseAuDate(datediffEnd.value);
        const native = document.querySelector('.date-picker-native[data-date-target="datediff-end"]');
        if (native && !isNaN(dt)) native.value = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
    }

    // Pressing Enter inside any calculator field runs that form's calculation,
    // so users aren't forced to click the button. Only acts for forms whose
    // calculate button is type="button"; native submission already handles
    // forms that use a type="submit" button.
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        const field = e.target;
        const form = field && field.closest ? field.closest('.calculator-form') : null;
        if (!form) return;
        const btn = form.querySelector('button.calculate-btn');
        if (!btn || btn.type === 'submit') return;
        e.preventDefault();
        btn.click();
    });
    (function () {
      'use strict';

      var pad = function (n, len) {
        return String(n).padStart(len || 2, '0');
      };

      /* ---- Live clock ---- */
      var clockTime = document.getElementById('clock-time');
      var clockDate = document.getElementById('clock-date');
      if (clockTime) {
        var renderClock = function () {
          var now = new Date();
          clockTime.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
          clockDate.textContent = now.toLocaleDateString('en-AU', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          });
        };
        renderClock();
        setInterval(renderClock, 500);
      }

      /* ---- Countdown timer ---- */
      var cdRemaining = document.getElementById('countdown-remaining');
      var cdNote = document.getElementById('countdown-note');
      var cdError = document.getElementById('countdown-error');
      var cdStartBtn = document.getElementById('countdown-start-btn');
      var cdResetBtn = document.getElementById('countdown-reset-btn');
      var cdInputs = ['countdown-minutes', 'countdown-seconds'].map(function (id) {
        return document.getElementById(id);
      });

      if (cdRemaining && cdStartBtn) {
        // Deadline is stored as an absolute timestamp so the display stays
        // correct even if interval ticks are throttled in a background tab.
        var cdDeadline = null;
        var cdRafId = null;

        var fmtCd = function (ms) {
          var total = Math.max(0, Math.ceil(ms / 1000));
          return pad(Math.floor(total / 60)) + ':' + pad(total % 60);
        };

        var beep = function () {
          try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 880;
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
            osc.start();
            osc.stop(ctx.currentTime + 1);
          } catch (e) { /* audio unavailable — visual alert still fires */ }
        };

        var tick = function () {
          var msLeft = cdDeadline - Date.now();
          cdRemaining.textContent = fmtCd(msLeft);
          if (msLeft <= 0) {
            stopCountdown();
            cdNote.textContent = '⏰ Time is up!';
            beep();
            return;
          }
          cdRafId = setTimeout(tick, 200);
        };

        var stopCountdown = function () {
          if (cdRafId) { clearTimeout(cdRafId); cdRafId = null; }
          cdDeadline = null;
          cdStartBtn.textContent = 'Start';
        };

        var readDurationMs = function () {
          cdError.classList.remove('show');
          var mins = parseInt(cdInputs[0].value, 10) || 0;
          var secs = parseInt(cdInputs[1].value, 10) || 0;
          var ms = (mins * 60 + secs) * 1000;
          if (ms <= 0) {
            cdError.textContent = 'Enter a duration greater than zero.';
            cdError.classList.add('show');
            return null;
          }
          return ms;
        };

        cdStartBtn.addEventListener('click', function () {
          if (cdDeadline) { // running -> pause
            var msLeft = cdDeadline - Date.now();
            stopCountdown();
            var total = Math.max(0, Math.ceil(msLeft / 1000));
            cdInputs[0].value = Math.floor(total / 60);
            cdInputs[1].value = total % 60;
            cdNote.textContent = 'Paused.';
            return;
          }
          var ms = readDurationMs();
          if (ms === null) { return; }
          cdDeadline = Date.now() + ms;
          cdStartBtn.textContent = 'Pause';
          cdNote.textContent = 'Counting down…';
          tick();
        });

        cdResetBtn.addEventListener('click', function () {
          stopCountdown();
          cdRemaining.textContent = '00:00';
          cdNote.textContent = 'Enter a duration or pick a preset, then press Start.';
        });

        document.querySelectorAll('.preset-btn[data-mins]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            stopCountdown();
            cdInputs[0].value = btn.dataset.mins;
            cdInputs[1].value = 0;
            cdRemaining.textContent = fmtCd(btn.dataset.mins * 60000);
            cdNote.textContent = 'Ready — press Start.';
          });
        });
      }

      /* ---- Stopwatch ---- */
      var swDisplay = document.getElementById('stopwatch-display');
      var swStartBtn = document.getElementById('stopwatch-start-btn');
      var swResetBtn = document.getElementById('stopwatch-reset-btn');

      if (swDisplay && swStartBtn) {
        var swStart = null;   // timestamp when started
        var swAccum = 0;      // ms accumulated across pauses
        var swRafId = null;

        var renderSw = function () {
          var ms = swAccum + (swStart ? Date.now() - swStart : 0);
          var m = Math.floor(ms / 60000);
          var s = Math.floor((ms % 60000) / 1000);
          var cs = Math.floor((ms % 1000) / 10);
          swDisplay.textContent = pad(m) + ':' + pad(s) + '.' + pad(cs);
        };

        var swTick = function () {
          renderSw();
          swRafId = requestAnimationFrame(swTick);
        };

        swStartBtn.addEventListener('click', function () {
          if (swStart) { // running -> stop
            swAccum += Date.now() - swStart;
            swStart = null;
            cancelAnimationFrame(swRafId);
            swRafId = null;
            swStartBtn.textContent = 'Start';
            renderSw();
          } else {
            swStart = Date.now();
            swStartBtn.textContent = 'Stop';
            swTick();
          }
        });

        swResetBtn.addEventListener('click', function () {
          if (swRafId) { cancelAnimationFrame(swRafId); swRafId = null; }
          swStart = null;
          swAccum = 0;
          swStartBtn.textContent = 'Start';
          renderSw();
        });
      }
    })();

// ===== CSP: bind handlers previously on inline attributes =====
// (script-src no longer allows 'unsafe-inline'; onclick/onchange attributes
// were converted to data-calc / data-change and are bound here.)
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-calc]');
  if (el && typeof window[el.dataset.calc] === 'function') window[el.dataset.calc]();
});
document.addEventListener('change', function (e) {
  var el = e.target.closest('[data-change]');
  if (el && typeof window[el.dataset.change] === 'function') window[el.dataset.change]();
});

// ===== CSP: form submission previously on inline onsubmit attributes =====
// swpe-pip-form and wip-form have their own submit listeners above; every
// other calculator form gets preventDefault (Enter key guard) plus its
// calculate call where one exists.
document.addEventListener('submit', function (e) {
  var form = e.target;
  if (!form.matches || !form.matches('.calculator-form')) return;
  if (form.id === 'swpe-pip-form' || form.id === 'wip-form') return;
  e.preventDefault();
  if (form.id === 'meddose-form') calculateMedDose();
  if (form.id === 'ivfluid-form') calculateIvFluid();
});
