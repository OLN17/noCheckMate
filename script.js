if ("NDEFReader" in window) {
  // Solicita permissão ao usuário para acessar a NFC
  const reader = new NDEFReader();
  const scanButton = document.getElementById("scanButton");
  const studentInfo = document.getElementById("studentInfo");

  scanButton.addEventListener("click", async () => {
    try {
      await reader.scan();
      console.log("NFC leitura iniciada!");
    } catch (error) {
      console.error("Erro ao iniciar a leitura NFC:", error);
    }
  });

  // Captura os dados da NFC quando uma tag é detectada e exibe na área studentInfo
  reader.addEventListener("reading", event => {
    studentInfo.innerHTML = ""; // Limpa o conteúdo anterior
    for (const record of event.message.records) {
      console.log("Record:", record);
      // Exibe os dados da tag NFC na área studentInfo
      studentInfo.innerHTML += `<p>Record: ${record.data}</p>`;
    }
  });
} else {
  console.log("A API Web NFC não é suportada neste navegador.");
}
/*document.getElementById("startButton").addEventListener("click", function() {
    // Simulação de leitura de tag NFC
    const studentInfo = [
      { name: "João", RA: "123456" },
      { name: "Maria", RA: "654321" }
    ];
 
    displayStudentInfo(studentInfo);
});*/
  
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

  document.getElementById("settingsButton").addEventListener("click", function() {
    // Redirecionar para a página de configurações
    window.location.href = "config.html";
  });

// Botão "Salvar Configurações"
document.querySelector(".saveButton").addEventListener("click", function() {
  // Obter os valores dos campos de configuração
  const googleSheetURL = document.getElementById("googleSheet").value;
  const intervalo = document.getElementById("interval").value;

  // Simular salvamento das configurações
  // Aqui você pode implementar a lógica para realmente salvar as configurações (por exemplo, enviar para um servidor)
  // Neste exemplo, apenas exibimos os valores em um alerta
  alert(`Configurações salvas com sucesso!\nPlanilha do Google Sheets: ${googleSheetURL}\nIntervalo de Verificação Automática: ${intervalo} segundos`);
});

// Botão "Excluir Configurações"
document.querySelector(".deleteButton").addEventListener("click", function() {
  // Confirmar a exclusão das configurações
  if (confirm("Tem certeza de que deseja excluir as configurações?")) {
    // Simular exclusão das configurações
    // Aqui você pode implementar a lógica para realmente excluir as configurações
    alert("Configurações excluídas com sucesso!");
  }
});

// Botão "Voltar"
document.querySelector(".goBackButton").addEventListener("click", function() {
  // Redirecionar para a página anterior
  window.history.back();
});
