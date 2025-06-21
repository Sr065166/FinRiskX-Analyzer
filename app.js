document.getElementById("riskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const income = parseInt(document.getElementById("income").value);
  const investment = parseInt(document.getElementById("investment").value);
  const appetite = document.getElementById("riskAppetite").value;
  const stocks = parseInt(document.getElementById("stocks").value);
  const crypto = parseInt(document.getElementById("crypto").value);
  const bonds = parseInt(document.getElementById("bonds").value);

  if ((stocks + crypto + bonds) !== 100) {
    alert("Investment allocation must total 100%");
    return;
  }

  // 🧠 Simple Risk Logic
  let score = 0;
  score += (stocks * 0.6);
  score += (crypto * 0.8);
  score += (bonds * 0.2);

  if (appetite === "low") score -= 15;
  if (appetite === "high") score += 10;
  if (age < 25) score += 5;
  else if (age > 45) score -= 10;

  score = Math.max(0, Math.min(100, Math.round(score)));

  // ✅ Show Result
  document.getElementById("riskScore").innerText = '${score}/100';
  const suggestion = document.getElementById("suggestion");

  if (score < 40) suggestion.innerText = "🟢 Low risk – Good stability.";
  else if (score < 70) suggestion.innerText = "🟡 Medium risk – Consider adjusting allocations.";
  else suggestion.innerText = "🔴 High risk – Too aggressive. Consider safer options.";

  document.getElementById("resultBox").classList.remove("hidden");

  // 📊 Render Chart
  renderPieChart(stocks, crypto, bonds);
});

// 📈 Chart.js Drawing Function
let chartInstance = null;
function renderPieChart(stocks, crypto, bonds) {
  const ctx = document.getElementById("riskChart").getContext("2d");

  // Destroy existing chart if any (to avoid overlap)
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Stocks", "Crypto", "Bonds"],
      datasets: [{
        label: "Portfolio Allocation",
        data: [stocks, crypto, bonds],
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",  // Indigo
          "rgba(251, 191, 36, 0.7)",  // Amber
          "rgba(52, 211, 153, 0.7)"   // Green
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(52, 211, 153, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      animation: {
        animateScale: true
      }
    }
  });
}