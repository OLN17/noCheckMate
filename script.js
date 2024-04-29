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
    reader.addEventListener("reading", event => {
      studentInfo.innerHTML = ""; // Limpa o conteúdo anterior
      for (const record of event.message.records) {
        console.log("Record:", record);
        // Exibe os dados da tag NFC na área studentInfo
        const textDecoder = new TextDecoder();
        const recordData = textDecoder.decode(record.data);
        studentInfo.innerHTML += `<p>Dados da Tag NFC: ${recordData}</p>`;
      }
    });
  } else {
    console.log("A API Web NFC não é suportada neste navegador.");
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

  // Event listener para o botão de configurações
  document.getElementById("settingsButton").addEventListener("click", function() {
    // Redirecionar para a página de configurações
    window.location.href = "config.html";
  });
});
