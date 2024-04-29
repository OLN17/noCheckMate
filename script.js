document.addEventListener("DOMContentLoaded", function() {
  // Verifica se a API Web NFC é suportada no navegador
  if ("NDEFReader" in window) {
      const reader = new NDEFReader(); // Cria uma instância do leitor NFC
      const scanButton = document.getElementById("scanButton"); // Botão para iniciar a leitura NFC
      const studentInfo = document.getElementById("studentInfo"); // Área para exibir informações do estudante

      // Event listener para iniciar a leitura NFC quando o botão é clicado
      scanButton.addEventListener("click", async () => {
          try {
              await reader.scan();
              console.log("NFC leitura iniciada!");
          } catch (error) {
              console.error("Erro ao iniciar a leitura NFC:", error);
          }
      });

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
              const { studentName, studentRA } = extractStudentInfo(recordData);
              
              // Salva as informações do aluno na planilha do Google Sheets
              await saveStudentInfo(studentName, studentRA);
          }
      });
  } else {
      console.log("A API Web NFC não é suportada neste navegador.");
  }
// Função para extrair as informações do aluno dos dados da tag NFC
function extractStudentInfo(recordData) {
  // Suponha que os dados da tag NFC estejam no formato JSON
  try {
      const { name, RA } = JSON.parse(recordData);
      return { studentName: name, studentRA: RA };
  } catch (error) {
      console.error("Erro ao extrair informações do aluno:", error);
      return null; // Retorna null se houver um erro ao extrair as informações
  }
}

// Função para salvar as informações do aluno na planilha do Google Sheets
async function saveStudentInfo(studentName, studentRA) {
  try {
      const response = await fetch('URL_DA_SUA_API', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: studentName, RA: studentRA })
      });

      if (response.ok) {
          console.log("Informações do aluno salvas com sucesso na planilha do Google Sheets.");
      } else {
          console.error("Erro ao salvar informações do aluno na planilha do Google Sheets:", response.statusText);
      }
  } catch (error) {
      console.error("Erro ao salvar informações do aluno na planilha do Google Sheets:", error);
  }
}

  // Função para exibir informações do estudante
  function displayStudentInfo(studentInfo) {
      const studentInfoDiv = document.getElementById("studentInfo");
      studentInfoDiv.innerHTML = "";

      studentInfo.forEach(student => {
          const studentDiv = document.createElement("div");
          studentDiv.classList.add("studentCard");
          studentDiv.innerHTML = `
              <div class="studentName">${student.name}</div>
              <div class="studentRA">RA: ${student.RA}</div>
          `;
          studentInfoDiv.appendChild(studentDiv);
      });
  }
});

// Event listener para o botão de configurações
document.getElementById("settingsButton").addEventListener("click", function() {
  // Redirecionar para a página de configurações
  window.location.href = "config.html";
});
