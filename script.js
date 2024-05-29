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
              const { studentName, studentID } = extractStudentInfo(recordData);
              
              if (studentName && studentID) {
                  // Exibe as informações detalhadas do aluno na div studentInfo
                  studentInfo.innerHTML += `
                      <div class="studentCard">
                          <div class="studentName">Nome: ${studentName}</div>
                          <div class="studentID">ID: ${studentID}</div>
                      </div>
                  `;
                  
                  // Salva as informações do aluno na planilha do Google Sheets
                  await saveStudentInfo(studentName, studentID);
              } else {
                  studentInfo.innerHTML += `<p>Erro ao extrair informações do aluno.</p>`;
              }
          }
      });
  } else {
      console.log("A API Web NFC não é suportada neste navegador.");
  }

  // Função para extrair as informações do aluno dos dados da tag NFC
  function extractStudentInfo(recordData) {
      // Suponha que os dados da tag NFC estejam no formato JSON
      try {
          const { name, id } = JSON.parse(recordData);
          return { studentName: name, studentID: id };
      } catch (error) {
          console.error("Erro ao extrair informações do aluno:", error);
          return null; // Retorna null se houver um erro ao extrair as informações
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

  // Event listener para o botão de configurações
  document.getElementById("settingsButton").addEventListener("click", function() {
      // Redirecionar para a página de configurações
      window.location.href = "config.html";
  });
});
