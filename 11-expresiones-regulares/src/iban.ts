import * as ibantools from 'ibantools';

function processIBAN(iban: string): string {
    const ibanRegex = /^(ES)(\d{2})[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{2})[ -]?(\d{10})$/;

    const matches = iban.match(ibanRegex);

    if (matches) {
        // const ibanControlDigits = matches[2];
        const bankCode = matches[3];
        const branchCode = matches[4];
        const accountControl = matches[5];
        const accountNumber = matches[6];

        if (ibantools.validateIBAN(iban)) {
            const bankName = getBankName(bankCode);

            const result = `
                <p>Banco: ${bankName}</p>
                <p>Código sucursal: ${branchCode}</p>
                <p>Dígito de control: ${accountControl}</p>
                <p>Número de cuenta: ${accountNumber}</p>
            `;

            return "<p>El IBAN es válido</p>" + result;
            
        } else {
            return "<p>El IBAN no es válido</p>";
        }
    } else {
        return "<p>El formato del IBAN no es válido</p>";
    }
}

function getBankName(bankCode: string): string {
    const bankCodes: { [key: string]: string } = {
        "2080": "Abanca Corporación Bancaria",
        "0061": "Banca March",
        "0188": "Banco Alcalá",
        "0182": "Banco Bilbao Vizcaya Argentaria",
        "0130": "Banco Caixa Geral",
        "0234": "Banco Caminos",
        "2105": "Banco Castilla-La Mancha",
        "0240": "Banco de Crédito Social Cooperativo",
        "0081": "Banco de Sabadell",
        "0487": "Banco Mare Nostrum",
        "0186": "Banco Mediolanum",
        "0238": "Banco Pastor",
        "0075": "Banco Popular Español",
        "0049": "Banco Santander",
        "3873": "Banco Santander Totta",
        "2038": "Bankia",
        "0128": "Bankinter",
        "0138": "Bankoa",
        "0152": "Barclays Bank PLC",
        "3842": "BNP Paribas Paris",
        "3025": "Caixa de Credit del Enginyers",
        "2100": "Caixabank",
        "2045": "Caja de Ahorros y Monte de Piedad de Ontinyent",
        "3035": "Caja Laboral Popular CC",
        "3081": "Caja Rural Castilla-La Mancha",
        "3058": "Cajamar Caja Rural",
        "2000": "Cecabank",
        "1474": "Citibank Europe PLC",
        "3821": "Commerzbank AG",
        "3877": "Danske Bank A/S",
        "0019": "Deutsche Bank SAE",
        "0239": "EVO Banco",
        "2085": "Ibercaja Banco",
        "1465": "ING Bank NV",
        "2095": "Kutxabank",
        "2048": "Liberbank",
        "0131": "Novo Banco",
        "0073": "Open Bank",
        "0108": "Société Générale",
        "2103": "Unicaja Banco",
    };

    return bankCodes[bankCode] || "Desconocido";
}


const ibanForm = document.getElementById('ibanForm');

if (ibanForm !== null && ibanForm !== undefined) {
    ibanForm.addEventListener("submit", (e) => handleFormSubmit(e));
}

function handleFormSubmit(e: Event) {
    e.preventDefault();

    const ibanInput = document.getElementById('ibanInput');
    
    if (ibanInput instanceof HTMLInputElement) {
        const ibanValue = ibanInput.value.trim();
        const result = processIBAN(ibanValue);
        displayResult(result, ibanValue);
    }
}

function displayResult(result: string, iban: string):void {
    const ibanInfo = document.getElementById('ibanInfo');

    const ibanRegex = /^(ES)(\d{2})[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{2})[ -]?(\d{10})$/;
    if (ibanInfo) {
        ibanInfo.innerHTML = '';

        if (ibanRegex.test(iban)) {
            console.log("El IBAN está bien formado.");
            ibanInfo.innerHTML = "<p>El IBAN está bien formado.</p>";
        }
        if (result) {
            ibanInfo.innerHTML += result;
        }
    } 
}