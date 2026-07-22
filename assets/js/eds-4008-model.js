(function () {
  const datasheetUrl = "assets/products/moxa-eds-4008-series-datasheet-v1.8.pdf";

  const models = {
    "eds-4008-lv": {
      name: "EDS-4008-LV",
      route: "eds-4008-lv.html",
      summary: "Managed Ethernet switch with 8 10/100BaseT(X) ports, dual power supply 12/24/48 VDC, −10 to 60°C operating temperature",
      powerType: "Low-voltage DC",
      powerInput: "Dual 12/24/48 VDC",
      operatingVoltage: "9.6 to 60 VDC",
      inputVoltage: "12/24/48 VDC, redundant dual inputs",
      inputCurrent: "12–48 VDC, 1.50–0.40 A or 24 VDC, 0.70 A",
      powerModule: "PWR-100-LV",
      powerConsumption: "7.20 W",
      temperature: "−10 to 60°C (14 to 140°F)",
      temperatureShort: "−10 to 60°C",
      mtbf: "1,121,399 hrs",
      intro: "Low-voltage model for DC control cabinets and industrial edge deployments that need redundant DC inputs.",
    },
    "eds-4008-hv": {
      name: "EDS-4008-HV",
      route: "eds-4008-hv.html",
      summary: "Managed Ethernet switch with 8 10/100BaseT(X) ports, single power supply 110/220 VAC/VDC, −10 to 60°C operating temperature",
      powerType: "High-voltage AC/DC",
      powerInput: "Single 110/220 VAC/VDC",
      operatingVoltage: "88 to 300 VDC, 85 to 264 VAC",
      inputVoltage: "110/220 VAC/VDC, single input",
      inputCurrent: "110–220 VAC, 50–60 Hz, 0.30–0.20 A or 110–220 VDC, 0.30–0.20 A",
      powerModule: "PWR-105-HV-I",
      powerConsumption: "8.13 W",
      temperature: "−10 to 60°C (14 to 140°F)",
      temperatureShort: "−10 to 60°C",
      mtbf: "513,575 hrs",
      intro: "High-voltage model for panels where AC or high-voltage DC power is already available.",
    },
    "eds-4008-lv-t": {
      name: "EDS-4008-LV-T",
      route: "eds-4008-lv-t.html",
      summary: "Managed Ethernet switch with 8 10/100BaseT(X) ports, dual power supply 12/24/48 VDC, −40 to 75°C operating temperature",
      powerType: "Low-voltage wide temperature",
      powerInput: "Dual 12/24/48 VDC",
      operatingVoltage: "9.6 to 60 VDC",
      inputVoltage: "12/24/48 VDC, redundant dual inputs",
      inputCurrent: "12–48 VDC, 1.50–0.40 A or 24 VDC, 0.70 A",
      powerModule: "PWR-100-LV",
      powerConsumption: "7.20 W",
      temperature: "−40 to 75°C (−40 to 167°F)",
      temperatureShort: "−40 to 75°C",
      mtbf: "1,121,399 hrs",
      intro: "Wide-temperature low-voltage model for outdoor cabinets, rail-side, utility, and harsh industrial environments.",
    },
  };

  const toc = [
    ["model-summary", "Summary"],
    ["ethernet-interface", "Ethernet interface"],
    ["software-features", "Software features"],
    ["switch-io", "Switch / I/O"],
    ["power", "Power"],
    ["physical", "Physical & environment"],
    ["certifications", "Certifications"],
    ["cta", "Next step"],
  ];

  const softwareCards = [
    ["Industrial Protocols", "EtherNet/IP, Modbus TCP, PROFINET IO Device."],
    ["Management", "IPv4/IPv6, flow control, back pressure flow control, DHCP server/client, ARP, RARP, LLDP, port check, port mirroring (SPAN/RSPAN), MVRP, SNMP Trap, SNMP Inform, SNMPv1/v2c/v3, RMON, SSH, TFTP, HTTP, HTTPS, Telnet, Syslog, Private MIB."],
    ["Filter", "GMRP, GVRP, IGMP, 802.1Q VLAN, IGMP Snooping v1/v2/v3, ICMP Querier."],
    ["Redundancy Protocols", "STP, RSTP, Turbo Ring v2, Turbo Chain, Ring Coupling, Dual-Homing, Link Aggregation, MRP, MSTP."],
    ["Security", "Broadcast storm protection, trust access control, Static Port Lock, MAC Sticky, HTTPS/SSL, SSH, RADIUS, TACACS+, access control list, login and password policy, DHCP Snooping."],
    ["Time Management", "SNTP, NTP server/client, NTP authentication, IEEE 1588v2 PTP hardware-based timing, selectable profiles including IEEE 1588 Default 2008, IEC 61850-9-3:2016, and IEEE C37.238-2017."],
    ["Protocols", "IPv4/IPv6, TCP/IP, UDP, ICMP, ARP, RARP, TFTP, DNS, NTP Client, DHCP Server, DHCP Client, 802.1X, QoS, HTTPS, Telnet, SNMP, SNMPv1/v2c/v3, RMON, Syslog."],
    ["MIB", "P-BRIDGE MIB, Q-BRIDGE MIB, IF-MIB, IEEE8021-PAE-MIB, IEEE8021-SPANNING-TREE-MIB, IEEE8023-LAG-MIB, IEEE8021-QBRIDGE-MIB, LLDP-EXT-DOT3-MIB, SNMPv2-MIB, RMON MIB Groups 1, 2, 3, 9."],
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function row(family, label, value) {
    return `
      <div class="model-spec-row" role="row">
        <div class="model-spec-family">${esc(family)}</div>
        <div class="model-spec-label">${esc(label)}</div>
        <div class="model-spec-value">${value}</div>
      </div>`;
  }

  function renderSpecSection(id, eyebrow, title, intro, rows, component) {
    return `
      <section class="model-spec-section" id="${id}" data-sitecore-component="${component}">
        <div class="model-spec-head">
          <p class="model-section-eyebrow">${eyebrow}</p>
          <h2>${title}</h2>
          ${intro ? `<p>${intro}</p>` : ""}
        </div>
        <div class="model-spec-table" role="table" aria-label="${esc(title)} specifications">
          ${rows.join("")}
        </div>
      </section>`;
  }

  function buildPage(model) {
    return `
      <div class="model-layout">
        <aside class="model-sidebar" aria-label="${esc(model.name)} page navigation">
          <nav class="model-toc" aria-label="On this page">
            <p class="model-toc-title">On this page</p>
            ${toc.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}
          </nav>
          <div class="model-actions" data-sitecore-component="ModelActions">
            <p class="model-actions-title">Technical actions</p>
            <a class="model-action" href="${datasheetUrl}" download data-model-action="download-datasheet" data-model="${esc(model.name)}">
              <span>Download datasheet</span><span class="model-action-icon">PDF</span>
            </a>
            <button class="model-action" type="button" data-print-page data-model="${esc(model.name)}">
              <span>Print this page</span><span class="model-action-icon">⌘P</span>
            </button>
          </div>
        </aside>

        <article class="model-content">
          <section class="model-summary-card" id="model-summary" data-sitecore-component="ModelSummary">
            <p class="model-section-eyebrow">Model summary</p>
            <h2>${esc(model.name)} specifications in one structured view.</h2>
            <p>${esc(model.intro)} The original model-page information is preserved, with the dense specification table reorganized into a readable engineering layout.</p>
            <div class="model-summary-grid">
              <div class="model-summary-item"><span>Model</span><strong>${esc(model.name)}</strong></div>
              <div class="model-summary-item"><span>Power input</span><strong>${esc(model.powerInput)}</strong></div>
              <div class="model-summary-item"><span>Temperature</span><strong>${esc(model.temperatureShort)}</strong></div>
            </div>
          </section>

          ${renderSpecSection("ethernet-interface", "Ethernet interface", "Interface and Ethernet standards", "Core port count and standards from the original Moxa model page.", [
            row("Ethernet Interface", "10/100BaseT(X) Ports (RJ45 connector)", "8 ports; auto negotiation speed; full/half duplex mode; auto MDI/MDI-X connection."),
            row("Ethernet Interface", "Standards", "<ul><li>IEEE 802.3 for 10BaseT</li><li>IEEE 802.3u for 100BaseT(X) and 100BaseFX</li><li>IEEE 802.3ab for 1000BaseT(X); IEEE 802.3z for 1000BaseSX/LX</li><li>IEEE 802.3x for flow control; IEEE 802.1D-2004 for Spanning Tree Protocol</li><li>IEEE 802.1w Rapid Spanning Tree; IEEE 802.1Q VLAN Tagging; IEEE 802.1p Class of Service; IEEE 802.1X authentication</li></ul>"),
            row("Ethernet Interface", "Optical Fiber", '<a class="model-link" href="product-series-eds-4008.html#all-models">Read more in the model selector</a>'),
          ], "StructuredSpecifications")}

          <section class="model-spec-section" id="software-features" data-sitecore-component="SoftwareFeatureGroups">
            <div class="model-spec-head">
              <p class="model-section-eyebrow">Ethernet software features</p>
              <h2>Industrial protocols, management, redundancy, and security</h2>
              <p>Long protocol lists are grouped into readable cards instead of one crowded table.</p>
            </div>
            <div class="model-software-grid">
              ${softwareCards.map(([title, copy]) => `<div class="model-software-card"><h3>${esc(title)}</h3><p>${esc(copy)}</p></div>`).join("")}
            </div>
          </section>

          ${renderSpecSection("switch-io", "Switch, LED, serial, USB, and I/O", "Device properties and local interfaces", "", [
            row("Switch Properties", "MAC Table Size", "16 K"),
            row("Switch Properties", "Jumbo Frame Size", "9.216 KB"),
            row("Switch Properties", "VLAN / IGMP", "Max. 256 VLANs; VLAN ID range VID 1 to 4094; 512 IGMP groups; 4 priority queues; 1 MB packet buffer."),
            row("LED Interface", "LED Indicators", "PWR1, PWR2, STATE, FAULT, MSTR/HEAD, CPLR/TAIL, SYNC."),
            row("Serial Interface", "Console Port", "RS-232 (TxD, RxD, GND), 8-pin RJ45 (115200, n, 8, 1)."),
            row("USB Interface", "USB Connector", "USB Type A (Reserved)."),
            row("Input/Output Interface", "Alarm and digital input", "1 relay output alarm contact channel with 1 A @ 24 VDC carrying capacity. 1 digital input channel; +13 to +30 V for state 1, −30 to +3 V for state 0; max. input current 8 mA."),
            row("DIP Switch Configuration", "DIP Switches", "Turbo Ring, Master, Coupler, Reserve."),
          ], "SwitchIoSpecifications")}

          ${renderSpecSection("power", "Power parameters", `${esc(model.powerType)} power module`, "", [
            row("Power Parameters", "Connection", "2 removable 4-contact terminal block(s)."),
            row("Power Parameters", "Pre-installed Power Module", esc(model.powerModule)),
            row("Power Parameters", "Note", "The EDS-4008 Series supports modular power supplies. Installed power and power parameters are determined by the installed power module. If you install a different power module, refer to the specifications of the corresponding model."),
            row("Power Parameters", "Input Voltage", esc(model.inputVoltage)),
            row("Power Parameters", "Operating Voltage", esc(model.operatingVoltage)),
            row("Power Parameters", "Input Current", esc(model.inputCurrent)),
            row("Power Parameters", "Power Consumption (Max.)", esc(model.powerConsumption)),
            row("Power Parameters", "Protection", "Overload current protection supported; reverse polarity protection supported."),
          ], "PowerSpecifications")}

          ${renderSpecSection("physical", "Physical characteristics & environmental limits", "Installation, housing, and operating limits", "", [
            row("Physical Characteristics", "IP Rating", "IP40."),
            row("Physical Characteristics", "Dimensions", "55 x 140 x 120 mm (2.17 x 5.51 x 4.72 in)."),
            row("Physical Characteristics", "Weight", "857 g (1.89 lb)."),
            row("Physical Characteristics", "Installation / Housing", "DIN-rail mounting; wall mounting with optional kit. Metal housing."),
            row("Environmental Limits", "Operating Temperature", esc(model.temperature)),
            row("Environmental Limits", "Storage Temperature", "−40 to 85°C (−40 to 185°F), package included."),
            row("Environmental Limits", "Ambient Relative Humidity", "5 to 95% non-condensing."),
          ], "PhysicalEnvironmentalSpecifications")}

          ${renderSpecSection("certifications", "Standards, certifications, MTBF, and warranty", "Industrial certifications carried forward from the original page", "", [
            row("Standards and Certifications", "Cybersecurity", "IEC 62443-4-2 Security Level 2; IEC 61162-460 switch role."),
            row("Standards and Certifications", "Safety / EMC / EMI", "UL 61010-2-201; EN 62368-1 (LVD); EN 55032/35; EN 61000-6-2/6-4; CISPR 32, FCC Part 15B Class A."),
            row("Standards and Certifications", "EMS", "IEC 61000-4-2 ESD contact 8 kV / air 15 kV; IEC 61000-4-3 RS 80 MHz to 1 GHz 20 V/m; IEC 61000-4-5 surge power 4 kV / signal 4 kV; IEC 61000-4-6 CS 10 V; IEC 61000-4-8 PFMF / PMF."),
            row("Standards and Certifications", "Industry certifications", "Maritime NK, LR, ABS, DNV; vibration IEC 60068-2-6; shock IEC 60068-2-27; freefall IEC 60068-2-32; railway EN 50121-4; traffic control NEMA TS2; power substation IEC 61850-3 and IEEE 1613 Class 1; hazardous locations ATEX Zone 2, Class I Division 2, IECEx."),
            row("MTBF", "Time / Standards", `${esc(model.mtbf)}; Telcordia Standard SR-332.`),
            row("Warranty", "Warranty Period", '5 years. Details: <a class="model-link" href="https://www.moxa.com/warranty">www.moxa.com/warranty</a>.'),
          ], "CertificationsAndWarranty")}

          <section class="model-cta" id="cta" data-sitecore-component="ModelConversionCTA">
            <h2>Ready to validate ${esc(model.name)}?</h2>
            <p>Continue to the LV/HV comparison, request a quote, or return to the full EDS-4008 Series page with this model context preserved.</p>
            <div class="model-cta-actions">
              <a class="btn btn-primary" href="compare-lv-hv.html?model=${encodeURIComponent(model.name)}">Compare LV/HV</a>
              <a class="btn btn-secondary" href="compare-quote.html#quoteWorkflow" data-model-action="add-to-quote" data-model="${esc(model.name)}">Add to quote</a>
              <a class="btn btn-secondary" href="product-series-eds-4008.html#all-models">Back to series</a>
            </div>
          </section>
        </article>
      </div>`;
  }

  function initActions(model) {
    document.querySelectorAll("[data-print-page]").forEach((button) => {
      button.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("moxa:model:printpage", { detail: { model: model.name, source: "model-page" } }));
        window.print();
      });
    });

    document.querySelectorAll("[data-model-action='download-datasheet']").forEach((link) => {
      link.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("moxa:model:download", { detail: { model: model.name, asset: datasheetUrl } }));
      });
    });

    document.querySelectorAll("[data-model-action='add-to-quote']").forEach((link) => {
      link.addEventListener("click", () => {
        const quote = JSON.parse(localStorage.getItem("moxaQuoteCart") || "[]");
        if (!quote.some((item) => item.sku === model.name)) quote.push({ sku: model.name, quantity: 1, source: "model-page" });
        localStorage.setItem("moxaQuoteCart", JSON.stringify(quote));
        window.dispatchEvent(new CustomEvent("moxa:quote:add", { detail: { sku: model.name, quantity: 1, source: "model-page" } }));
      });
    });
  }

  const pageId = document.body?.dataset?.moxaPage;
  const model = models[pageId];
  const app = document.querySelector("[data-eds-model-app]");
  if (!model || !app) return;

  app.innerHTML = buildPage(model);
  initActions(model);
}());
