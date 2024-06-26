 // Função para extrair as informações do aluno dos dados da tag NFC
function extractStudentInfo(recordData) {
    try {
        const { name, id } = JSON.parse(recordData);
        return { studentName: name, studentID: id };
    } catch (error) {
        console.error("Erro ao extrair informações do aluno:", error);
        return null;
    }
}

// Função para salvar as informações do aluno na planilha do Google Sheets
async function saveStudentInfo(studentName, studentID) {
    try {
        // Substitua pelos detalhes de autenticação e autorização obtidos ao configurar a API do Google Sheets
        const accessToken = "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";
        const spreadsheetId = "1g4aOxy9DJOhzSGvjbbtA9sS318slt-rtMcwaI3gZDOk";

        // Objeto com os dados do aluno
        const studentData = {
            values: [
                [studentName, studentID]
            ]
        };

        // Requisição POST para a API do Google Sheets para inserir os dados na planilha
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=RAW&access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        // Verifica se a inserção foi bem-sucedida
        if (response.ok) {
            console.log('Informações do aluno salvas com sucesso na planilha.');
        } else {
            console.error('Erro ao salvar informações do aluno na planilha:', response.statusText);
        }
    } catch (error) {
        console.error("Erro ao salvar informações do aluno na planilha:", error);
    }
}
if ("NDEFReader" in window) {
    // Defina a variável reader antes de adicionar o evento de leitura NFC
const reader = new NDEFReader(); // Cria uma instância do leitor NFC

// Event listener para capturar dados da NFC quando uma tag é detectada
reader.addEventListener("reading", async event => {
    studentInfo.innerHTML = ""; // Limpa o conteúdo anterior
    for (const record of event.message.records) {
        console.log("Record:", record);
        // Exibe os dados da tag NFC na área studentInfo
        const textDecoder = new TextDecoder();
        const recordData = textDecoder.decode(record.data);
        studentInfo.innerHTML += `<p>Dados da Tag NFC: ${recordData}</p>`;

        // Extrai as informações do aluno dos dados da tag NFC
        const { studentName, studentID } = extractStudentInfo(recordData);

        // Salva as informações do aluno na planilha do Google Sheets
        await saveStudentInfo(studentName, studentID);
    }
        try {
            await reader.scan();
            console.log("NFC leitura iniciada!");
        } catch (error) {
            console.error("Erro ao iniciar a leitura NFC:", error);
        }
    });}
