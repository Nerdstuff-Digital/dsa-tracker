document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Data load from localStorage ---
    const savedData = JSON.parse(localStorage.getItem("dsa_char_data")) || {};
    
    // Default values representing "Ruslan" as per original HTML
    const defaultData = {
        "Stufe": 0,
        "AP_Gesamt": 420,
        "AP_eingesetzt": 297,
        "CH": 11, "FF": 14, "GE": 12, "GS": 8, "IN": 13, "KK": 16, "KL": 8, "KO": 15, "MU": 15,
        "LE": 34, "AU": 33, "AE": 32, "MR": 5, "INI": 11, "AT_Basis": 9, "PA_Basis": 8, "FK_Basis": 9,
        "BE": 0,
        geld: { gold: 0, silber: 0, heller: 0 },
        coreText: {
            "Name": "Ruslan (Kopie)",
            "Rasse": "Thorwaler",
            "Kultur": "Thorwal",
            "Profession": "Seefahrer, Pirat"
        },
        customList: {
            "eigenschaften": [],
            "basiswerte": [],
            "talent_gabe": [
                { name: "Magiegespür", probe: "(MU/IN/IN)", taw: 3 }
            ],
            "kampftechniken": [
                { name: "Dolche", be: "BE-1", at: 11, pa: 8, taw: 2 },
                { name: "Hiebwaffen", be: "BE-4", at: 12, pa: 10, taw: 5 },
                { name: "Raufen", be: "BE", at: 13, pa: 9, taw: 5 },
                { name: "Schwerter", be: "BE-2", at: 13, pa: 11, taw: 7 },
                { name: "Wurfmesser", be: "BE-3", at: 12, pa: 0, taw: 3 }
            ],
            "talent_koerper": [
                { name: "Akrobatik", probe: "(MU/GE/KK)", taw: 2 },
                { name: "Athletik", probe: "(GE/KO/KK)", taw: 4 },
                { name: "Klettern", probe: "(MU/GE/KK)", taw: 4 },
                { name: "Körperbeherrschung", probe: "(MU/IN/GE)", taw: 5 },
                { name: "Schwimmen", probe: "(GE/KO/KK)", taw: 6 },
                { name: "Zechen", probe: "(IN/KO/KK)", taw: 7 }
            ],
            "talent_gesellschaft": [
                { name: "Überreden", probe: "(MU/IN/CH)", taw: 5 }
            ],
            "talent_natur": [
                { name: "Fesseln/Entfesseln", probe: "(FF/GE/KK)", taw: 4 },
                { name: "Fischen/Angeln", probe: "(IN/FF/KK)", taw: 6 },
                { name: "Orientierung", probe: "(KL/IN/IN)", taw: 5 },
                { name: "Wettervorhersage", probe: "(KL/IN/IN)", taw: 4 },
                { name: "Wildnisleben", probe: "(IN/GE/KO)", taw: 3 }
            ],
            "talent_wissen": [
                { name: "Geografie", probe: "(KL/KL/IN)", taw: 2 },
                { name: "Sagen und Legenden", probe: "(KL/IN/CH)", taw: 5 }
            ],
            "talent_sprachen": [
                { name: "Garethi", probe: "18", taw: 4 },
                { name: "Isdira", probe: "21", taw: 4 },
                { name: "Thorwalsch", probe: "18", taw: 6 }
            ],
            "talent_handwerk": [
                { name: "Boote fahren", probe: "(GE/KO/KK)", taw: 6 },
                { name: "Holzbearbeitung", probe: "(KL/FF/KK)", taw: 3 },
                { name: "Schneidern", probe: "(KL/FF/FF)", taw: 6 },
                { name: "Seefahrt", probe: "(FF/GE/KK)", taw: 6 }
            ],
            "zauber": [
                { name: "Ignifaxius Flammenstrahl", probe: "(KL/FF/KO)", zfw: 0, rep: "Magier<br>Elem (Feu), Scha" },
                { name: "Ignisphaero Feuerball", probe: "(MU/IN/KO)", zfw: 0, rep: "Magier<br>Elem (Feu), Scha, Tele" },
                { name: "Juckreiz, dämlicher!", probe: "(MU/IN/CH)", zfw: 0, rep: "Magier<br>Einfl" }
            ],
            "vorteile": [
                { name: "Balance" }, { name: "Eisern" }, { name: "Glück" },
                { name: "Herausragende Eigenschaft: Körperkraft 1" },
                { name: "Magiegespür" }, { name: "Vollzauberer" }
            ],
            "nachteile": [
                { name: "Aberglaube: 5" }, { name: "Angst vor Insekten: 12" },
                { name: "Angst vor Spinnen: 12" }, { name: "Goldgier: 5" },
                { name: "Jähzorn: 6" }, { name: "Unbewusster Viertelzauberer" },
                { name: "Unfähigkeit für [Talentgruppe] Wissen" }, { name: "Vergesslichkeit" }
            ],
            "sonderfertigkeiten": [
                { name: "Aufmerksamkeit" }, { name: "Kulturkunde (Thorwal)" },
                { name: "Meereskundig" }, { name: "Repräsentation: Magier" },
                { name: "Standfest" }
            ],
            "ausruestung": [
                { id: "A1", name: "Langschwert: 1W6 +4", be: 0 },
                { id: "A2", name: "Lederharnisch", be: -1, rs: 3 }
            ],
            "gegenstaende": [
                { id: "I1", amount: 1, name: "Brett- und Kartenspiel" },
                { id: "I2", amount: 1, name: "Zinnkrug" },
                { id: "I3", amount: 1, name: "Brosche" },
                { id: "I4", amount: 1, name: "Angelhaken" }
            ]
        },
        openSections: ["Personendaten", "Eigenschaften & Basiswerte", "Talente"]
    };

    // Merge logic
    const charData = { ...defaultData, ...savedData };
    if (!savedData.coreText) charData.coreText = defaultData.coreText;
    else charData.coreText = { ...defaultData.coreText, ...savedData.coreText };
    
    if (!savedData.geld) charData.geld = defaultData.geld;
    else charData.geld = { ...defaultData.geld, ...savedData.geld };

    if (!savedData.openSections) charData.openSections = defaultData.openSections;
    else charData.openSections = savedData.openSections;

    if (!savedData.customList) charData.customList = defaultData.customList;
    else {
        charData.customList = { ...defaultData.customList, ...savedData.customList };
        
        // MIGRATION: Populate defaults if array is empty (for already initialized caches)
        const catsCheck = ["talent_gabe", "kampftechniken", "talent_koerper", "talent_gesellschaft", "talent_natur", "talent_wissen", "talent_sprachen", "talent_handwerk", "zauber", "vorteile", "nachteile", "sonderfertigkeiten"];
        catsCheck.forEach(cat => {
            if (!savedData.customList[cat] || savedData.customList[cat].length === 0) {
                charData.customList[cat] = defaultData.customList[cat];
            }
        });

        if (!savedData.customList.ausruestung) charData.customList.ausruestung = defaultData.customList.ausruestung;
        else {
            charData.customList.ausruestung.forEach(item => {
                if(item.name.includes("Lederharnisch") && item.rs === undefined) {
                    item.rs = 3; item.be = -1;
                }
            });
        }
        if (!savedData.customList.gegenstaende) charData.customList.gegenstaende = defaultData.customList.gegenstaende;
    }

    // Set globals for easy usage
    window.charData = charData;

    function saveData() {
        localStorage.setItem("dsa_char_data", JSON.stringify(charData));
    }


    // --- 2. Update DOM Helpers ---
    function renderCustomLists() {
        // Clear all custom containers first
        document.querySelectorAll("[id^='custom-']").forEach(el => el.innerHTML = "");

        // Render Simple Properties (Eigenschaften, Basiswerte)
        ["eigenschaften", "basiswerte"].forEach(cat => {
            const container = document.getElementById(`custom-${cat}`);
            if (!container) return;
            charData.customList[cat].forEach(item => {
                // Register stat if new
                if (charData[item.id] === undefined) charData[item.id] = parseInt(item.wert) || 0;
                
                container.innerHTML += `
                    <div class="data-row custom-item-bind" data-cat="${cat}" data-idx="${index}">
                        <span class="data-label">${item.name}</span>
                        <div class="editable custom-editable" data-stat-id="${item.id}"></div>
                    </div>
                `;
            });
        });

        // Render Talente
        const talentCats = ["talent_gabe", "talent_koerper", "talent_gesellschaft", "talent_natur", "talent_wissen", "talent_sprachen", "talent_handwerk"];
        talentCats.forEach(cat => {
            const container = document.getElementById(`custom-${cat}`);
            if (!container) return;
            charData.customList[cat].forEach((item, index) => {
                container.innerHTML += `
                    <div class="talent-row custom-item-bind" data-cat="${cat}" data-idx="${index}">
                        <span class="talent-name">${item.name}</span>
                        <div class="talent-probe">
                            <span>${item.probe}</span>
                            <span class="talent-probe-stats probe-calc" data-probe="${item.probe}"></span>
                        </div>
                        <span class="talent-taw">${item.taw}</span>
                    </div>
                `;
            });
        });

        // Render Kampftechniken
        const kampfc = document.getElementById("custom-kampftechniken");
        if (kampfc) {
            charData.customList["kampftechniken"].forEach((item, index) => {
                kampfc.innerHTML += `
                    <div class="talent-row kampf-row custom-item-bind" data-cat="kampftechniken" data-idx="${index}">
                        <span class="talent-name">${item.name}</span>
                        <div class="talent-probe"><span>${item.be}</span><div class="formula-calc" data-formula="${item.be}"></div></div>
                        <span>${item.at}</span><span>${item.pa}</span><span class="talent-taw">${item.taw}</span>
                    </div>
                `;
            });
        }

        // Render Zauber
        const zauberC = document.getElementById("custom-zauber-container");
        if (zauberC) {
            charData.customList["zauber"].forEach((item, index) => {
                zauberC.innerHTML += `
                    <tr class="custom-item-bind" data-cat="zauber" data-idx="${index}">
                        <td><strong>${item.name}</strong></td>
                        <td>
                            <div class="talent-probe">
                            <span>${item.probe}</span><span class="talent-probe-stats probe-calc" data-probe="${item.probe}"></span>
                            </div>
                        </td>
                        <td>${item.zfw}</td>
                        <td style="font-size:0.8rem; color:var(--text-secondary);">${item.rep}</td>
                    </tr>
                `;
            });
        }

        // Render Simple Lists
        ["vorteile", "nachteile", "sonderfertigkeiten"].forEach(cat => {
             const container = document.getElementById(`custom-${cat}-container`);
             if (!container) return;
             charData.customList[cat].forEach((item, index) => {
                 container.innerHTML += `
                    <div class="data-row custom-item-bind" data-cat="${cat}" data-idx="${index}" style="cursor:pointer; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 8px 0; display:flex;">
                        <span class="data-label" style="color:var(--text-secondary); width:100%">${item.name}</span>
                    </div>
                 `;
             });
        });

        setupEditables(); // re-bind editables logic for new elements
        bindCustomItems();
    }

    function updateDOM() {
        // Text stats from coreText
        document.querySelectorAll(".long-press-edit").forEach(el => {
            const statId = el.getAttribute("data-stat-text");
            if (charData.coreText[statId] !== undefined) {
                // If it's an H1 container, update inner H1, otherwise data-value
                const innerH1 = el.querySelector("h1");
                const dataVal = el.querySelector(".data-value");
                if (innerH1) innerH1.innerText = charData.coreText[statId];
                else if (dataVal) dataVal.innerText = charData.coreText[statId];
                else el.innerText = charData.coreText[statId];
            }
        });

        // Loop over active editables to update UI inner HTML without losing focus if possible
        document.querySelectorAll(".editable").forEach(el => {
            const statId = el.getAttribute("data-stat-id");
            if (statId && charData[statId] !== undefined) {
                const input = el.querySelector(".edit-input");
                if (input) input.value = charData[statId];
            }
        });

        // Update AP displays
        const apGesamtEl = document.getElementById("disp-ap-gesamt");
        if (apGesamtEl) apGesamtEl.innerText = charData["AP_Gesamt"] || 0;
        
        const apEingesetztEl = document.getElementById("disp-ap-eingesetzt");
        if (apEingesetztEl) apEingesetztEl.innerText = charData["AP_eingesetzt"] || 0;

        updateProbes();
        updateFormulas();
        calculateBE();
    }

    function calculateBE() {
        let totalBE = 0;
        charData.customList.ausruestung.forEach(item => {
            if (item.be) totalBE += parseInt(item.be) || 0;
        });
        charData.BE = totalBE;
        const beEl = document.getElementById("disp-be");
        if (beEl) beEl.innerText = totalBE;
    }


    // --- 3. Interactive Edit Logic ---
    function setupEditables() {
        document.querySelectorAll(".editable:not(.bound)").forEach(wrapper => {
            wrapper.classList.add("bound"); // Prevent duplicate binding
            const statId = wrapper.getAttribute("data-stat-id");
            if (!statId) return;

            if (!wrapper.querySelector(".edit-input")) {
                const initialVal = charData[statId] !== undefined ? charData[statId] : (parseInt(wrapper.innerText) || 0);
                if (charData[statId] === undefined) {
                    charData[statId] = initialVal;
                }
                wrapper.innerHTML = `
                    <button class="edit-btn minus">-</button>
                    <input type="number" class="edit-input" value="${initialVal}" />
                    <button class="edit-btn plus">+</button>
                `;
            } else {
                wrapper.querySelector(".edit-input").value = charData[statId] || 0;
            }

            const input = wrapper.querySelector(".edit-input");
            const btnMinus = wrapper.querySelector(".minus");
            const btnPlus = wrapper.querySelector(".plus");

            wrapper.addEventListener("click", (e) => {
                if (!wrapper.classList.contains("active")) {
                    document.querySelectorAll(".editable.active").forEach(el => el.classList.remove("active"));
                    wrapper.classList.add("active");
                    // No input.focus(); here, to prevent keyboard popup on first click.
                }
            });

            btnMinus.addEventListener("click", (e) => {
                e.stopPropagation();
                charData[statId] = parseInt(input.value) - 1;
                input.value = charData[statId];
                saveData();
                updateDOM();
            });

            btnPlus.addEventListener("click", (e) => {
                e.stopPropagation();
                charData[statId] = parseInt(input.value) + 1;
                input.value = charData[statId];
                saveData();
                updateDOM();
            });

            input.addEventListener("change", (e) => {
                charData[statId] = parseInt(input.value) || 0;
                saveData();
                updateDOM();
            });
            
            input.addEventListener("keydown", (e) => {
                if(e.key === "Enter") {
                    wrapper.classList.remove("active");
                    input.blur();
                }
            });
        });
    }

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".editable")) {
            document.querySelectorAll(".editable.active").forEach(el => el.classList.remove("active"));
        }
    });

    // --- 4. Long Press Edit Logic ---
    let longPressTimer;
    document.querySelectorAll(".long-press-edit").forEach(el => {
        const textKey = el.getAttribute("data-stat-text");
        
        function startPress(e) {
            longPressTimer = setTimeout(() => {
                openTextEditModal(textKey, charData.coreText[textKey]);
            }, 1000); // 1.0s to avoid being too tedious, user requested 1.5s but 1.0s is usually better on phone. I'll stick to 1.5s as requested.
        }
        function cancelPress(e) {
            clearTimeout(longPressTimer);
        }

        el.addEventListener("mousedown", (e) => { startPress(e); });
        el.addEventListener("touchstart", (e) => { startPress(e); });
        
        el.addEventListener("mouseup", cancelPress);
        el.addEventListener("mouseleave", cancelPress);
        el.addEventListener("touchend", cancelPress);
        el.addEventListener("touchmove", cancelPress);
    });

    // --- 5. Calculators ---
    function updateProbes() {
        document.querySelectorAll(".probe-calc").forEach(el => {
            const probeStr = el.getAttribute("data-probe"); // (MU/IN/CH)
            if (!probeStr || !probeStr.includes("/")) return;
            
            const parts = probeStr.replace(/[()]/g, "").split("/");
            const values = parts.map(p => {
                const stat = p.trim();
                return charData[stat] !== undefined ? charData[stat] : "?";
            });
            el.innerHTML = values.join(" / ");
        });
    }

    function updateFormulas() {
        document.querySelectorAll(".formula-calc").forEach(el => {
            const formulaStr = el.getAttribute("data-formula");
            if (!formulaStr) return;
            
            let beVal = parseInt(charData["BE"]) || 0;
            let result = "";

            if (formulaStr === "AP_CALC") {
                const gesamt = parseInt(charData["AP_Gesamt"]) || 0;
                const eingesetzt = parseInt(charData["AP_eingesetzt"]) || 0;
                result = `${gesamt - eingesetzt}`;
                el.innerHTML = result;
                return; // Early return for this specific style
            } else if (formulaStr.includes("x")) {
                const mult = parseInt(formulaStr.split("x")[1]) || 1;
                result = `${beVal} * ${mult} = ${beVal * mult}`;
            } else if (formulaStr.includes("-")) {
                const sub = parseInt(formulaStr.split("-")[1]) || 0;
                result = `${beVal} - ${sub} = ${beVal - sub}`;
            } else if (formulaStr.includes("+")) {
                const add = parseInt(formulaStr.split("+")[1]) || 0;
                result = `${beVal} + ${add} = ${beVal + add}`;
            } else if (formulaStr === "BE") {
                result = `BE: ${beVal}`;
            } else if (formulaStr.includes("->")) { 
                result = `0 bis ${beVal}`;
            } else {
                result = "-";
            }
            el.innerHTML = `<span class="talent-probe-stats">${result}</span>`;
        });
    }

    // --- 6. Modal System ---
    const modalContainer = document.getElementById("modal-container");
    
    function closeModals() {
        modalContainer.innerHTML = "";
    }

    window.closeModals = closeModals; // global helper

    window.cancelAddItem = function(category) {
        closeModals();
        if(category === 'ausruestung' || category === 'gegenstaende') {
            openInventoryModal();
        }
    };

    window.openAPModal = function(mode) {
        let title = mode === "add" ? "AP erhalten" : "AP ausgeben";
        let label = mode === "add" ? "Wie viele AP hast du bekommen?" : "Wie viele AP hast du ausgegeben?";
        
        modalContainer.innerHTML = `
            <div class="modal-overlay active">
                <div class="modal-card">
                    <h2>${title}</h2>
                    <div class="modal-form">
                        <div class="form-group">
                            <label>${label}</label>
                            <input type="number" id="modal-ap-input" class="modal-input" placeholder="0" />
                        </div>
                        <div class="modal-actions">
                            <button class="btn-secondary" onclick="closeModals()">Abbrechen</button>
                            <button class="btn-primary" id="modal-ap-save">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("modal-ap-input").focus();
        document.getElementById("modal-ap-save").addEventListener("click", () => {
             let val = parseInt(document.getElementById("modal-ap-input").value) || 0;
             if (val > 0) {
                 if (mode === "add") {
                     charData.AP_Gesamt = (parseInt(charData.AP_Gesamt) || 0) + val;
                 } else if (mode === "spend") {
                     charData.AP_eingesetzt = (parseInt(charData.AP_eingesetzt) || 0) + val;
                 }
                 saveData();
                 updateDOM();
             }
             closeModals();
        });
    };

    function openTextEditModal(keyName, currentValue) {
        modalContainer.innerHTML = `
            <div class="modal-overlay active">
                <div class="modal-card">
                    <h2>${keyName} bearbeiten</h2>
                    <div class="modal-form">
                        <input type="text" id="modal-text-input" class="modal-input" value="${currentValue}" />
                        <div class="modal-actions">
                            <button class="btn-secondary" onclick="closeModals()">Abbrechen</button>
                            <button class="btn-primary" id="modal-text-save">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("modal-text-input").focus();
        document.getElementById("modal-text-save").addEventListener("click", () => {
            charData.coreText[keyName] = document.getElementById("modal-text-input").value;
            saveData();
            updateDOM();
            closeModals();
        });
    }

    // Handling '+' buttons
    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const category = btn.getAttribute("data-modal");
            openAddItemModal(category);
        });
    });

    window.openAddItemModal = openAddItemModal;
    function openAddItemModal(category, editIndex = null) {
        const isEdit = editIndex !== null;
        const existing = isEdit ? charData.customList[category][editIndex] : {};
        
        let splitName = existing.name || "";
        let existingText = "";
        if (category === "ausruestung" && isEdit) {
            if (splitName.includes(": ")) {
                let parts = splitName.split(": ");
                splitName = parts[0];
                existingText = parts.slice(1).join(": ");
            }
        }

        let fieldsHTML = `<div class="form-group"><label>Name</label><input type="text" id="add-name" class="modal-input" placeholder="Name eintragen..." value="${splitName}" required/></div>`;
        
        const needsProbe = category.startsWith("talent_") || category === "zauber";
        const needsWert = category === "eigenschaften" || category === "basiswerte";
        const isKampf = category === "kampftechniken";
        const isZauber = category === "zauber";
        const isAus = category === "ausruestung";
        const isGeg = category === "gegenstaende";

        if (needsProbe) {
            fieldsHTML += `<div class="form-group"><label>Probe (z.B. MU/IN/CH)</label><input type="text" id="add-probe" class="modal-input" placeholder="(XX/YY/ZZ)" value="${existing.probe || ''}"/></div>`;
            fieldsHTML += `<div class="form-group"><label>TaW / ZfW (Startwert)</label><input type="number" id="add-value" class="modal-input" placeholder="0" value="${existing.taw || existing.zfw || ''}"/></div>`;
        } else if (needsWert) {
            fieldsHTML += `<div class="form-group"><label>Startwert</label><input type="number" id="add-value" class="modal-input" placeholder="0" value="${existing.wert !== undefined ? existing.wert : ''}"/></div>`;
        } else if (isKampf) {
            fieldsHTML += `<div class="form-group"><label>BE Formel (z.B. BE-2)</label><input type="text" id="add-be" class="modal-input" placeholder="BEx2" value="${existing.be || ''}"/></div>`;
            fieldsHTML += `<div class="form-group"><label>AT</label><input type="number" id="add-at" class="modal-input" placeholder="10" value="${existing.at !== undefined ? existing.at : ''}"/></div>`;
            fieldsHTML += `<div class="form-group"><label>PA</label><input type="number" id="add-pa" class="modal-input" placeholder="10" value="${existing.pa !== undefined ? existing.pa : ''}"/></div>`;
            fieldsHTML += `<div class="form-group"><label>TaW</label><input type="number" id="add-value" class="modal-input" placeholder="0" value="${existing.taw !== undefined ? existing.taw : ''}"/></div>`;
        } else if (isAus) {
            let beSign = (existing.be !== undefined && existing.be >= 0) ? '+' : '-';
            let beValStr = existing.be !== undefined ? Math.abs(existing.be) : '';
            fieldsHTML += `<div class="form-group"><label>Spezialwerte (z.B. 1w6+4)</label><input type="text" id="add-aus-text" class="modal-input" placeholder="Werte..." value="${existingText}"/></div>`;
            fieldsHTML += `<div class="form-group"><label>Rüstungsschutz (RS)</label><input type="number" id="add-rs" class="modal-input" placeholder="0" value="${existing.rs !== undefined ? existing.rs : ''}"/></div>`;
            fieldsHTML += `<div class="form-group">
                              <label>Zusätzliche BE (Rüstung)</label>
                              <div style="display:flex; gap:5px;">
                                  <select id="add-be-sign" class="modal-input" style="flex: 0 0 50px; padding:5px;">
                                      <option value="-" ${beSign === '-' ? 'selected' : ''}>-</option>
                                      <option value="+" ${beSign === '+' ? 'selected' : ''}>+</option>
                                  </select>
                                  <input type="number" id="add-be-val" class="modal-input" placeholder="z.B. 1" style="flex: 1;" value="${beValStr}" />
                              </div>
                           </div>`;
        } else if (isGeg) {
            fieldsHTML += `<div class="form-group"><label>Anzahl</label><input type="number" id="add-amount" class="modal-input" placeholder="1" value="${existing.amount !== undefined ? existing.amount : ''}"/></div>`;
        }
        
        let titleMap = {
            "eigenschaften": "Eigenschaft", "basiswerte": "Basiswert",
            "kampftechniken": "Kampftechnik", "zauber": "Zauber",
            "vorteile": "Vorteil", "nachteile": "Nachteil",
            "sonderfertigkeiten": "Sonderfertigkeit",
            "ausruestung": "Ausrüstung",
            "gegenstaende": "Gegenstand"
        };
        const title = (isEdit ? "Bearbeiten: " : "Hinzufügen: ") + (titleMap[category] || "Eintrag");

        modalContainer.innerHTML = `
            <div class="modal-overlay active" style="z-index: 1000;">
                <div class="modal-card">
                    <h2>${title}</h2>
                    <div class="modal-form">
                        ${fieldsHTML}
                        <div class="modal-actions">
                            <button class="btn-secondary" onclick="cancelAddItem('${category}')">Abbrechen</button>
                            ${isEdit ? `<button class="btn-primary" style="background:var(--accent-red-hover);" id="modal-del-save">Löschen</button>` : ''}
                            <button class="btn-primary" id="modal-add-save">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => document.getElementById("add-name").focus(), 100);

        if (isEdit) {
            document.getElementById("modal-del-save").addEventListener("click", () => {
                charData.customList[category].splice(editIndex, 1);
                saveData();
                renderCustomLists();
                calculateBE();
                updateDOM();
                closeModals();
                if (isAus || isGeg) openInventoryModal();
            });
        }

        document.getElementById("modal-add-save").addEventListener("click", () => {
            const nameEl = document.getElementById("add-name");
            if(!nameEl || nameEl.value.trim() === "") return;
            const nameVal = nameEl.value.trim();

            let newItem = isEdit ? existing : { name: nameVal };
            newItem.name = nameVal;

            if (needsProbe) {
                newItem.probe = document.getElementById("add-probe").value || "(MU/KL/IN)";
                newItem.taw = document.getElementById("add-value").value || 0;
                if(isZauber) {
                    newItem.zfw = newItem.taw; // Map TAW to ZfW for UI
                    newItem.rep = newItem.rep || "-"; // Default representation
                }
            } else if (needsWert) {
                if(!isEdit) newItem.id = "CUSTOM_" + Math.random().toString(36).substr(2, 5).toUpperCase();
                newItem.wert = document.getElementById("add-value").value || 0;
            } else if (isKampf) {
                newItem.be = document.getElementById("add-be").value || "BE";
                newItem.at = document.getElementById("add-at").value || 10;
                newItem.pa = document.getElementById("add-pa").value || 10;
                newItem.taw = document.getElementById("add-value").value || 0;
            } else if (isAus) {
                const addText = document.getElementById("add-aus-text").value.trim();
                newItem.name = addText ? nameVal + ": " + addText : nameVal;
                let rsValStr = document.getElementById("add-rs").value;
                if (rsValStr.trim() !== "") newItem.rs = parseInt(rsValStr) || 0;
                else delete newItem.rs;

                let beValStr = document.getElementById("add-be-val").value;
                if (beValStr.trim() !== "") {
                    let sign = document.getElementById("add-be-sign").value;
                    newItem.be = parseInt(beValStr) || 0;
                    if (sign === "-") {
                        newItem.be = -newItem.be;
                    }
                } else {
                    delete newItem.be;
                }
            } else if (isGeg) {
                newItem.amount = parseInt(document.getElementById("add-amount").value) || 1;
            }

            if (!isEdit) charData.customList[category].push(newItem);
            
            saveData();
            
            // Re-render
            renderCustomLists();
            calculateBE();
            updateDOM();
            closeModals();
            if (isAus || isGeg) {
                openInventoryModal();
            }
        });
    }

    // --- 7. Inventory Modal Logic ---
    window.openInventoryModal = function() {
        const invData = charData.customList;
        const geld = charData.geld;
        
        let ausrHTML = invData.ausruestung.map((item, idx) => {
            let stats = [];
            if(item.rs) stats.push(`RS: ${item.rs}`);
            if(item.be) stats.push(`BE: ${item.be}`);
            let statText = stats.length > 0 ? `<span style="font-size:0.7rem; color:var(--text-secondary); margin-left:5px;">(${stats.join(' | ')})</span>` : '';
            return `
            <div class="inv-row custom-item-bind" data-cat="ausruestung" data-idx="${idx}">
                <div style="flex:1;">
                    <strong>${item.name}</strong>
                    ${statText}
                </div>
            </div>`;
        }).join('');

        let gegHTML = invData.gegenstaende.map((item, idx) => `
            <div class="inv-row custom-item-bind" data-cat="gegenstaende" data-idx="${idx}">
                <div style="flex:1;">
                    <span style="color:var(--accent-gold); margin-right:5px;">${item.amount}x</span> 
                    <strong>${item.name}</strong>
                </div>
            </div>
        `).join('');

        document.getElementById("inventory-modal-container").innerHTML = `
            <div class="modal-overlay active" style="z-index: 950; display:flex;">
                <div class="inventory-card modal-card" style="margin: auto; max-height: 85vh;">
                    <div class="inventory-header">
                        <h2>Items</h2>
                        <button class="close-btn" onclick="closeInventoryModal()">&#x2715;</button>
                    </div>
                    <div class="inventory-content">
                        <div class="geld-container">
                            <div class="geld-item">
                                <span class="geld-label">Gold</span>
                                <div class="editable bind-geld" data-coin="gold"></div>
                            </div>
                            <div class="geld-item">
                                <span class="geld-label">Silber</span>
                                <div class="editable bind-geld" data-coin="silber"></div>
                            </div>
                            <div class="geld-item">
                                <span class="geld-label">Heller</span>
                                <div class="editable bind-geld" data-coin="heller"></div>
                            </div>
                        </div>
                        
                        <div class="inv-section">
                            <div class="header-row" style="margin-bottom:10px;">
                                <h3 style="margin:0; font-size:1rem; border:none; padding:0;">Ausrüstung</h3>
                                <button class="add-btn" style="width:25px; height:25px; line-height:21px;" onclick="openAddItemModal('ausruestung')">+</button>
                            </div>
                            ${ausrHTML}
                        </div>

                        <div class="inv-section">
                            <div class="header-row" style="margin-bottom:10px;">
                                <h3 style="margin:0; font-size:1rem; border:none; padding:0;">Weitere Gegenstände</h3>
                                <button class="add-btn" style="width:25px; height:25px; line-height:21px;" onclick="openAddItemModal('gegenstaende')">+</button>
                            </div>
                            ${gegHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.querySelectorAll(".bind-geld").forEach(wrapper => {
            const coin = wrapper.getAttribute("data-coin");
            wrapper.innerHTML = `
                <button class="edit-btn minus">-</button>
                <input type="number" class="edit-input" value="${charData.geld[coin]}" style="max-width:50px;" />
                <button class="edit-btn plus">+</button>
            `;
            const input = wrapper.querySelector(".edit-input");
            const act = () => { charData.geld[coin] = parseInt(input.value) || 0; input.value = charData.geld[coin]; saveData(); };
            wrapper.querySelector(".minus").onclick = (e) => { e.stopPropagation(); input.value = (parseInt(input.value) || 0) - 1; act(); updateDOM(); };
            wrapper.querySelector(".plus").onclick = (e) => { e.stopPropagation(); input.value = (parseInt(input.value) || 0) + 1; act(); updateDOM(); };
            input.onchange = act;
            wrapper.onclick = () => { wrapper.classList.add("active"); };
        });
        bindCustomItems();
    };

    window.closeInventoryModal = function() {
        document.getElementById("inventory-modal-container").innerHTML = "";
    };

    window.removeInventoryItem = function(type, idx) {
        charData.customList[type].splice(idx, 1);
        saveData();
        calculateBE();
        updateDOM();
        openInventoryModal(); // refresh
    };

    window.changeItemAmount = function(e, idx, delta) {
        e.stopPropagation();
        charData.customList.gegenstaende[idx].amount += delta;
        if(charData.customList.gegenstaende[idx].amount < 0) charData.customList.gegenstaende[idx].amount = 0;
        saveData();
        openInventoryModal();
    };

    let universalPressTimer;
    function bindCustomItems() {
        document.querySelectorAll(".custom-item-bind").forEach(el => {
            const startPress = (e) => {
                universalPressTimer = setTimeout(() => {
                    const cat = el.getAttribute("data-cat");
                    const idx = parseInt(el.getAttribute("data-idx"));
                    if(cat === 'ausruestung' || cat === 'gegenstaende') {
                        closeInventoryModal();
                    }
                    openAddItemModal(cat, idx);
                }, 600); 
            };
            const cancelPress = () => { clearTimeout(universalPressTimer); };

            el.addEventListener("touchstart", startPress, { passive: true });
            el.addEventListener("touchend", cancelPress);
            el.addEventListener("touchcancel", cancelPress);
            el.addEventListener("touchmove", cancelPress, { passive: true });
        });
    }

    // Fix for 1.5s exactly on longpress 
    document.querySelectorAll(".long-press-edit").forEach(el => {
        // Redefine precisely
        const textKey = el.getAttribute("data-stat-text");
        const startPress = (e) => {
            longPressTimer = setTimeout(() => {
                openTextEditModal(textKey, charData.coreText[textKey]);
            }, 600); 
        };
        const cancelPress = () => { clearTimeout(longPressTimer); };
        
        el.addEventListener("touchstart", startPress, { passive: true });
        el.addEventListener("touchend", cancelPress);
        el.addEventListener("touchcancel", cancelPress);
        el.addEventListener("touchmove", cancelPress, { passive: true });
    });

    // --- State Persistence for <details> Tags ---
    document.querySelectorAll("details.section-card").forEach(details => {
        const h2Info = details.querySelector("h2");
        if (!h2Info) return;
        const title = h2Info.innerText.trim();
        
        if (charData.openSections && charData.openSections.includes(title)) {
            details.setAttribute("open", "");
        } else {
            details.removeAttribute("open");
        }
        
        details.addEventListener("toggle", (e) => {
            if (!charData.openSections) charData.openSections = [];
            if (details.open) {
                if (!charData.openSections.includes(title)) charData.openSections.push(title);
            } else {
                charData.openSections = charData.openSections.filter(t => t !== title);
            }
            saveData();
        });
    });

    // --- On Init ---
    renderCustomLists();
    updateDOM();

});
