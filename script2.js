document.addEventListener("DOMContentLoaded", function() {
    // Event listener para o botão "Salvar Configurações"
    document.querySelector(".saveButton").addEventListener("click", function() {
      // Obter os valores dos campos de configuração
      const googleSheetURL = document.getElementById("googleSheet").value;
      const intervalo = document.getElementById("interval").value;
  
      // Simular salvamento das configurações
      // Aqui você pode implementar a lógica para realmente salvar as configurações (por exemplo, enviar para um servidor)
      // Neste exemplo, apenas exibimos os valores em um alerta
      alert(`Configurações salvas com sucesso!\nPlanilha do Google Sheets: ${googleSheetURL}\nIntervalo de Verificação Automática: ${intervalo} segundos`);
    });
  
    // Event listener para o botão "Excluir Configurações"
    document.querySelector(".deleteButton").addEventListener("click", function() {
      // Confirmar a exclusão das configurações
      if (confirm("Tem certeza de que deseja excluir as configurações?")) {
        // Simular exclusão das configurações
        // Aqui você pode implementar a lógica para realmente excluir as configurações
        alert("Configurações excluídas com sucesso!");
      }
    });
  
    // Event listener para o botão "Voltar"
    document.querySelector(".goBackButton").addEventListener("click", function() {
      // Redirecionar para a página anterior
      window.history.back();
    });
  });
