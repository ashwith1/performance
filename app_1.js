// Application data
const applicationData = {
  "models": [
    {
      "name": "GPT-4o mini",
      "scores": {
        "hallucination": 0,
        "outOfScope": 0,
        "compliance": 0,
        "robustness": 0,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 0
      },
      "performance": {
        "responseTime": "fast",
        "chatLimit": "short",
        "cost": "medium",
        "apiErrors": "medium"
      },
      "remarks": "Well-balanced performance across all metrics",
      "color": "#2563eb"
    },
    {
      "name": "GPT-4.1 mini",
      "scores": {
        "hallucination": 0,
        "outOfScope": 0,
        "compliance": 0,
        "robustness": 1,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 1
      },
      "performance": {
        "responseTime": "fast",
        "chatLimit": "short",
        "cost": "low",
        "apiErrors": "high"
      },
      "remarks": "Good overall performance with minor robustness issues",
      "color": "#7c3aed"
    },
    {
      "name": "GPT-4o",
      "scores": {
        "hallucination": 1,
        "outOfScope": 3,
        "compliance": 0,
        "robustness": 1,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 1
      },
      "performance": {
        "responseTime": "normal",
        "chatLimit": "long",
        "cost": "high",
        "apiErrors": "medium"
      },
      "remarks": "Struggles with out-of-scope queries, otherwise decent",
      "color": "#dc2626"
    },
    {
      "name": "GPT-4.1",
      "scores": {
        "hallucination": 0,
        "outOfScope": 1,
        "compliance": 0,
        "robustness": 2,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 1
      },
      "performance": {
        "responseTime": "fast",
        "chatLimit": "short",
        "cost": "medium",
        "apiErrors": "low"
      },
      "remarks": "Strong performance with some robustness challenges",
      "color": "#059669"
    },
    {
      "name": "03-mini",
      "scores": {
        "hallucination": 0,
        "outOfScope": 0,
        "compliance": 0,
        "robustness": 2,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 1
      },
      "performance": {
        "responseTime": "slow",
        "chatLimit": "long",
        "cost": "medium",
        "apiErrors": "medium"
      },
      "remarks": "Good understanding but assumes questions are answered, slow response",
      "color": "#ea580c"
    },
    {
      "name": "Claude 4 Sonnet",
      "scores": {
        "hallucination": 0,
        "outOfScope": 0,
        "compliance": 0,
        "robustness": 2,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 2
      },
      "performance": {
        "responseTime": "fast",
        "chatLimit": "long",
        "cost": "medium",
        "apiErrors": "low"
      },
      "remarks": "Most accurate, reliable, fast, no cost tracing in langfuse",
      "color": "#0891b2"
    },
    {
      "name": "Claude 3.7 Sonnet",
      "scores": {
        "hallucination": 2,
        "outOfScope": 0,
        "compliance": 0,
        "robustness": 1,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 1
      },
      "performance": {
        "responseTime": "slow",
        "chatLimit": "short",
        "cost": "high",
        "apiErrors": "low"
      },
      "remarks": "High unfinished answers, high cost consumer",
      "color": "#be185d"
    },
    {
      "name": "Claude 3.5 Sonnet",
      "scores": {
        "hallucination": 1,
        "outOfScope": 0,
        "compliance": 0,
        "robustness": 1,
        "ambiguity": 0,
        "adversarial": 0,
        "accuracy": 2
      },
      "performance": {
        "responseTime": "fast",
        "chatLimit": "long",
        "cost": "high",
        "apiErrors": "high"
      },
      "remarks": "Long unnecessary answers, asks something output points to something else",
      "color": "#7c2d12"
    }
  ],
  "metrics": {
    "hallucination": {
      "name": "Hallucination Testing",
      "description": "Tests the model's tendency to fabricate information. Lower scores indicate better factual accuracy.",
      "scale": "0 = No hallucinations, 3 = Frequent hallucinations"
    },
    "outOfScope": {
      "name": "Out-of-Scope Query Testing", 
      "description": "Measures how well models handle questions outside their operational domain.",
      "scale": "0 = Perfect boundary recognition, 6 = Poor out-of-scope handling"
    },
    "compliance": {
      "name": "Compliance Testing",
      "description": "Tests adherence to ethical guidelines, privacy rules, and organizational policies.",
      "scale": "0 = Poor compliance, 3 = Perfect compliance (inverted)"
    },
    "robustness": {
      "name": "Robustness to Errors",
      "description": "Tests how models handle typos, grammar mistakes, or incomplete inputs.",
      "scale": "0 = Very robust, 2 = Poor error handling"
    },
    "ambiguity": {
      "name": "Ambiguity Testing",
      "description": "Tests how models respond to vague or unclear queries.",
      "scale": "0 = Perfect clarification requests, 6 = Poor ambiguity handling"
    },
    "adversarial": {
      "name": "Adversarial Testing",
      "description": "Tests resistance to malicious or confusing prompts designed to break the system.",
      "scale": "0 = Perfect adversarial resistance, 3 = Vulnerable to attacks"
    },
    "accuracy": {
      "name": "Accuracy Testing",
      "description": "Overall accuracy of responses and task completion.",
      "scale": "0 = Very high accuracy, 2 = Poor accuracy"
    }
  }
};

// Application state
let state = {
  selectedModels: new Set(applicationData.models.map(m => m.name)),
  currentView: 'radar',
  selectedModel: null,
  metricWeights: {
    hallucination: 1,
    outOfScope: 1,
    compliance: 1,
    robustness: 1,
    ambiguity: 1,
    adversarial: 1,
    accuracy: 1
  }
};

// Chart instance
let chart = null;

// DOM elements
const elements = {};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupEventListeners();
  createModelCheckboxes();
  createMetricWeights();
  updateVisualization();
  updatePerformanceRanking();
});

function initializeElements() {
  elements.selectAllBtn = document.getElementById('selectAllBtn');
  elements.deselectAllBtn = document.getElementById('deselectAllBtn');
  elements.modelCheckboxes = document.getElementById('modelCheckboxes');
  elements.radarView = document.getElementById('radarView');
  elements.barView = document.getElementById('barView');
  elements.tableViewBtn = document.getElementById('tableView');
  elements.metricWeights = document.getElementById('metricWeights');
  elements.exportBtn = document.getElementById('exportBtn');
  elements.chartContainer = document.getElementById('chartContainer');
  elements.mainChart = document.getElementById('mainChart');
  elements.tableViewDiv = document.getElementById('tableView');
  elements.selectedModelInfo = document.getElementById('selectedModelInfo');
  elements.performanceRanking = document.getElementById('performanceRanking');
  elements.tableBody = document.getElementById('tableBody');
}

function setupEventListeners() {
  // Model selection buttons
  elements.selectAllBtn.addEventListener('click', selectAllModels);
  elements.deselectAllBtn.addEventListener('click', deselectAllModels);

  // View mode buttons
  elements.radarView.addEventListener('click', () => setViewMode('radar'));
  elements.barView.addEventListener('click', () => setViewMode('bar'));
  elements.tableViewBtn.addEventListener('click', () => setViewMode('table'));

  // Export button
  elements.exportBtn.addEventListener('click', exportChart);
}

function createModelCheckboxes() {
  elements.modelCheckboxes.innerHTML = '';
  
  applicationData.models.forEach(model => {
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'model-checkbox';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `model-${model.name.replace(/\s+/g, '-')}`;
    checkbox.checked = state.selectedModels.has(model.name);
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      toggleModel(model.name);
    });
    
    const label = document.createElement('label');
    label.className = 'model-checkbox-label';
    label.htmlFor = checkbox.id;
    label.addEventListener('click', (e) => {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      toggleModel(model.name);
    });
    
    const colorIndicator = document.createElement('span');
    colorIndicator.className = 'model-color-indicator';
    colorIndicator.style.backgroundColor = model.color;
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = model.name;
    
    label.appendChild(colorIndicator);
    label.appendChild(nameSpan);
    
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    elements.modelCheckboxes.appendChild(checkboxDiv);
  });
}

function createMetricWeights() {
  elements.metricWeights.innerHTML = '';
  
  Object.keys(state.metricWeights).forEach(metric => {
    const sliderDiv = document.createElement('div');
    sliderDiv.className = 'weight-slider';
    
    const label = document.createElement('label');
    label.htmlFor = `weight-${metric}`;
    
    const metricName = applicationData.metrics[metric].name;
    const valueSpan = document.createElement('span');
    valueSpan.className = 'weight-value';
    valueSpan.textContent = state.metricWeights[metric].toFixed(1);
    
    label.innerHTML = `${metricName} `;
    label.appendChild(valueSpan);
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.id = `weight-${metric}`;
    slider.min = '0.1';
    slider.max = '3.0';
    slider.step = '0.1';
    slider.value = state.metricWeights[metric];
    
    slider.addEventListener('input', (e) => {
      const newWeight = parseFloat(e.target.value);
      state.metricWeights[metric] = newWeight;
      valueSpan.textContent = newWeight.toFixed(1);
      updatePerformanceRanking();
      if (state.currentView === 'table') {
        updateTableView();
      }
    });
    
    sliderDiv.appendChild(label);
    sliderDiv.appendChild(slider);
    elements.metricWeights.appendChild(sliderDiv);
  });
}

function toggleModel(modelName) {
  console.log('Toggling model:', modelName); // Debug log
  if (state.selectedModels.has(modelName)) {
    state.selectedModels.delete(modelName);
  } else {
    state.selectedModels.add(modelName);
  }
  
  // Update the visualization immediately
  updateVisualization();
  updatePerformanceRanking();
  console.log('Selected models:', Array.from(state.selectedModels)); // Debug log
}

function selectAllModels() {
  console.log('Selecting all models'); // Debug log
  state.selectedModels = new Set(applicationData.models.map(m => m.name));
  updateCheckboxes();
  updateVisualization();
  updatePerformanceRanking();
}

function deselectAllModels() {
  console.log('Deselecting all models'); // Debug log
  state.selectedModels.clear();
  updateCheckboxes();
  updateVisualization();
  updatePerformanceRanking();
}

function updateCheckboxes() {
  applicationData.models.forEach(model => {
    const checkbox = document.getElementById(`model-${model.name.replace(/\s+/g, '-')}`);
    if (checkbox) {
      checkbox.checked = state.selectedModels.has(model.name);
    }
  });
}

function setViewMode(mode) {
  console.log('Setting view mode to:', mode); // Debug log
  state.currentView = mode;
  
  // Update button states
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('btn--outline');
    btn.classList.remove('btn--primary');
  });
  
  const activeBtn = document.getElementById(`${mode}View`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.classList.remove('btn--outline');
    activeBtn.classList.add('btn--primary');
  }
  
  updateVisualization();
}

function updateVisualization() {
  console.log('Updating visualization, current view:', state.currentView); // Debug log
  
  if (state.currentView === 'table') {
    elements.chartContainer.style.display = 'none';
    elements.tableViewDiv.classList.remove('hidden');
    updateTableView();
  } else {
    elements.chartContainer.style.display = 'block';
    elements.tableViewDiv.classList.add('hidden');
    
    if (state.currentView === 'radar') {
      createRadarChart();
    } else if (state.currentView === 'bar') {
      createBarChart();
    }
  }
}

function createRadarChart() {
  const ctx = elements.mainChart.getContext('2d');
  
  if (chart) {
    chart.destroy();
  }
  
  const selectedModels = applicationData.models.filter(m => state.selectedModels.has(m.name));
  console.log('Creating radar chart for models:', selectedModels.map(m => m.name)); // Debug log
  
  const datasets = selectedModels.map(model => ({
    label: model.name,
    data: [
      model.scores.hallucination,
      model.scores.outOfScope,
      model.scores.compliance,
      model.scores.robustness,
      model.scores.ambiguity,
      model.scores.adversarial,
      model.scores.accuracy
    ],
    borderColor: model.color,
    backgroundColor: model.color + '40',
    borderWidth: 2,
    pointBackgroundColor: model.color,
    pointBorderColor: '#fff',
    pointRadius: 4,
    pointHoverRadius: 6
  }));
  
  chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Hallucination',
        'Out-of-Scope',
        'Compliance',
        'Robustness', 
        'Ambiguity',
        'Adversarial',
        'Accuracy'
      ],
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'point'
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 3,
          ticks: {
            stepSize: 1,
            color: '#626C7C',
            callback: function(value) {
              return value;
            }
          },
          grid: {
            color: 'rgba(98, 108, 113, 0.2)'
          },
          angleLines: {
            color: 'rgba(98, 108, 113, 0.2)'
          },
          pointLabels: {
            color: '#134252',
            font: {
              size: 12,
              weight: '500'
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            color: '#134252'
          },
          onClick: function(e, legendItem) {
            const modelName = legendItem.text;
            selectModel(modelName);
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#134252',
          bodyColor: '#134252',
          borderColor: 'rgba(98, 108, 113, 0.3)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              const modelName = context.dataset.label;
              const metricName = context.label;
              const score = context.raw;
              const description = getScoreDescription(score);
              return `${modelName}: ${score} (${description})`;
            },
            afterBody: function(context) {
              const metricKey = getMetricKey(context[0].label);
              const metricInfo = applicationData.metrics[metricKey];
              return metricInfo ? [`Scale: ${metricInfo.scale}`] : [];
            }
          }
        }
      },
      onHover: function(event, elements) {
        event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const datasetIndex = elements[0].datasetIndex;
          const modelName = selectedModels[datasetIndex].name;
          selectModel(modelName);
        }
      }
    }
  });
}

function createBarChart() {
  const ctx = elements.mainChart.getContext('2d');
  
  if (chart) {
    chart.destroy();
  }
  
  const selectedModels = applicationData.models.filter(m => state.selectedModels.has(m.name));
  const overallScores = selectedModels.map(model => calculateOverallScore(model));
  
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: selectedModels.map(m => m.name),
      datasets: [{
        label: 'Overall Performance Score',
        data: overallScores,
        backgroundColor: selectedModels.map(m => m.color + '80'),
        borderColor: selectedModels.map(m => m.color),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Overall Score (Lower is Better)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#134252',
          bodyColor: '#134252',
          borderColor: 'rgba(98, 108, 113, 0.3)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const score = context.raw.toFixed(2);
              const description = getScoreDescription(parseFloat(score));
              return `Overall Score: ${score} (${description})`;
            }
          }
        }
      },
      onHover: function(event, elements) {
        event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const modelName = selectedModels[index].name;
          selectModel(modelName);
        }
      }
    }
  });
}

function updateTableView() {
  console.log('Updating table view'); // Debug log
  elements.tableBody.innerHTML = '';
  
  const selectedModels = applicationData.models.filter(m => state.selectedModels.has(m.name));
  const modelsWithScores = selectedModels.map(model => ({
    ...model,
    overallScore: calculateOverallScore(model)
  })).sort((a, b) => a.overallScore - b.overallScore);
  
  modelsWithScores.forEach(model => {
    const row = document.createElement('tr');
    row.addEventListener('click', () => selectModel(model.name));
    row.style.cursor = 'pointer';
    
    row.innerHTML = `
      <td>
        <div class="model-name-cell">
          <span class="table-model-color" style="background-color: ${model.color}"></span>
          ${model.name}
        </div>
      </td>
      <td class="score-cell ${getScoreClass(model.overallScore)}">${model.overallScore.toFixed(2)}</td>
      <td class="score-cell ${getScoreClass(model.scores.hallucination)}">${model.scores.hallucination}</td>
      <td class="score-cell ${getScoreClass(model.scores.outOfScope)}">${model.scores.outOfScope}</td>
      <td class="score-cell ${getScoreClass(model.scores.compliance)}">${model.scores.compliance}</td>
      <td class="score-cell ${getScoreClass(model.scores.robustness)}">${model.scores.robustness}</td>
      <td class="score-cell ${getScoreClass(model.scores.ambiguity)}">${model.scores.ambiguity}</td>
      <td class="score-cell ${getScoreClass(model.scores.adversarial)}">${model.scores.adversarial}</td>
      <td class="score-cell ${getScoreClass(model.scores.accuracy)}">${model.scores.accuracy}</td>
    `;
    
    elements.tableBody.appendChild(row);
  });
}

function selectModel(modelName) {
  console.log('Selecting model:', modelName); // Debug log
  state.selectedModel = modelName;
  updateModelDetails();
}

function updateModelDetails() {
  if (!state.selectedModel) {
    elements.selectedModelInfo.innerHTML = '<p>Select a model from the chart or checkboxes to view detailed information.</p>';
    return;
  }
  
  const model = applicationData.models.find(m => m.name === state.selectedModel);
  if (!model) return;
  
  const overallScore = calculateOverallScore(model);
  
  elements.selectedModelInfo.innerHTML = `
    <h4>
      <span class="selected-model-color" style="background-color: ${model.color}"></span>
      ${model.name}
    </h4>
    <div class="model-details">
      <div class="detail-item">
        <div class="detail-label">Overall Score:</div>
        <div class="detail-value">${overallScore.toFixed(2)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Response Time:</div>
        <div class="detail-value status-${model.performance.responseTime}">${model.performance.responseTime}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Chat Limit:</div>
        <div class="detail-value status-${model.performance.chatLimit}">${model.performance.chatLimit}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Cost:</div>
        <div class="detail-value status-${model.performance.cost}">${model.performance.cost}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">API Errors:</div>
        <div class="detail-value status-${model.performance.apiErrors}">${model.performance.apiErrors}</div>
      </div>
    </div>
    <div class="model-remarks">${model.remarks}</div>
  `;
}

function updatePerformanceRanking() {
  const selectedModels = applicationData.models.filter(m => state.selectedModels.has(m.name));
  const modelsWithScores = selectedModels.map(model => ({
    ...model,
    overallScore: calculateOverallScore(model)
  })).sort((a, b) => a.overallScore - b.overallScore);
  
  elements.performanceRanking.innerHTML = '';
  
  modelsWithScores.forEach((model, index) => {
    const rankingItem = document.createElement('div');
    rankingItem.className = 'ranking-item';
    rankingItem.style.cursor = 'pointer';
    rankingItem.addEventListener('click', () => selectModel(model.name));
    
    rankingItem.innerHTML = `
      <div class="ranking-model">
        <span>${index + 1}.</span>
        <span class="ranking-model-color" style="background-color: ${model.color}"></span>
        <span>${model.name}</span>
      </div>
      <span class="ranking-score">${model.overallScore.toFixed(2)}</span>
    `;
    
    elements.performanceRanking.appendChild(rankingItem);
  });
}

function calculateOverallScore(model) {
  const scores = model.scores;
  const weights = state.metricWeights;
  
  const weightedSum = 
    scores.hallucination * weights.hallucination +
    scores.outOfScope * weights.outOfScope +
    scores.compliance * weights.compliance +
    scores.robustness * weights.robustness +
    scores.ambiguity * weights.ambiguity +
    scores.adversarial * weights.adversarial +
    scores.accuracy * weights.accuracy;
  
  const totalWeights = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  
  return weightedSum / totalWeights;
}

function getScoreClass(score) {
  if (score === 0) return 'score-excellent';
  if (score <= 1) return 'score-good';
  if (score <= 2) return 'score-warning';
  return 'score-poor';
}

function getScoreDescription(score) {
  if (score === 0) return 'Excellent';
  if (score <= 1) return 'Good';
  if (score <= 2) return 'Needs Improvement';
  return 'Poor';
}

function getMetricKey(label) {
  const labelMap = {
    'Hallucination': 'hallucination',
    'Out-of-Scope': 'outOfScope',
    'Compliance': 'compliance',
    'Robustness': 'robustness',
    'Ambiguity': 'ambiguity',
    'Adversarial': 'adversarial',
    'Accuracy': 'accuracy'
  };
  return labelMap[label];
}

function exportChart() {
  console.log('Exporting chart'); // Debug log
  
  if (state.currentView === 'table') {
    // For table view, we'll create a simple alert since we can't export the table as image easily
    alert('Table export is not currently supported. Please switch to Radar Chart or Bar Chart view to export.');
    return;
  }
  
  if (!chart) {
    alert('No chart available to export');
    return;
  }
  
  try {
    const link = document.createElement('a');
    link.download = `chatbot-evaluation-${state.currentView}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = chart.toBase64Image('image/png', 1);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Chart exported successfully'); // Debug log
  } catch (error) {
    console.error('Export failed:', error);
    alert('Export failed. Please try again.');
  }
}