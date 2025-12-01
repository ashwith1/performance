# Chatbot Model Evaluation Dashboard
## Interactive Performance Analysis and Visualization Tool

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

A comprehensive web-based dashboard for evaluating and comparing chatbot model performance across multiple evaluation metrics. This interactive tool provides visual analysis through radar charts, bar charts, and tabular views, enabling data-driven model selection and performance optimization.

## Live Demo

Open `index.html` in your browser or visit the live demo to explore the dashboard functionality.

## Overview

The Chatbot Model Evaluation Dashboard is designed for AI researchers, machine learning engineers, and product managers to evaluate and compare chatbot models across seven critical performance dimensions.

### Key Features

- **Multi-Model Comparison**: Compare multiple chatbot models simultaneously
- **7 Evaluation Metrics**: Comprehensive assessment across key performance areas
- **3 Visualization Types**: Radar charts, bar charts, and data tables
- **Interactive Controls**: Real-time model selection and metric weighting
- **Export Functionality**: Download visualizations for presentations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Zero Setup**: Pure client-side application, no backend required

## Evaluation Metrics

All metrics use a **lower is better** scoring system:

### 1. Hallucination Testing (0-3)
Tests the model's tendency to fabricate information.
- **0** = No hallucinations
- **3** = Frequent hallucinations

### 2. Out-of-Scope Query Testing (0-6)
Measures how well models handle questions outside their operational domain.
- **0** = Perfect boundary recognition
- **6** = Poor out-of-scope handling

### 3. Compliance Testing (0-3, Inverted)
Tests adherence to ethical guidelines and privacy rules.
- **0** = Poor compliance
- **3** = Perfect compliance

### 4. Robustness to Errors (0-2)
Tests how models handle typos and incomplete inputs.
- **0** = Very robust
- **2** = Poor error handling

### 5. Ambiguity Testing (0-6)
Tests how models respond to vague or unclear queries.
- **0** = Perfect clarification requests
- **6** = Poor ambiguity handling

### 6. Adversarial Testing (0-3)
Tests resistance to malicious prompts designed to break the system.
- **0** = Perfect resistance
- **3** = Vulnerable to attacks

### 7. Accuracy Testing (0-2)
Overall accuracy of responses and task completion.
- **0** = Very high accuracy
- **2** = Poor accuracy

## Quick Start

### Installation

No installation required! Simply clone and open:

```bash
git clone https://github.com/ashwith1/performance.git
cd performance
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

### Local Server (Optional)

For better development experience:

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

## Usage Guide

### 1. Model Selection
- Check/uncheck models in the left control panel
- Use "Select All" or "Deselect All" for bulk actions
- Click legend items to toggle individual models

### 2. Choose Visualization
- **Radar Chart**: Multi-dimensional comparison
- **Bar Chart**: Side-by-side metric comparison
- **Table View**: Detailed numerical data

### 3. Adjust Metric Weights
- Use sliders to adjust metric importance (0.0 - 2.0)
- Default weight is 1.0 (equal importance)
- Overall scores update automatically

### 4. Export Results
- Click "Export View" to download current visualization
- Saves as PNG image with timestamp
- Suitable for presentations and reports

## Dashboard Components

### Control Panel (Left)
- **Model Selection**: Checkboxes for each model
- **View Mode**: Toggle between chart types
- **Metric Weights**: Sliders for custom weighting
- **Export Button**: Download functionality

### Visualization Area (Center)
- **Chart Container**: Dynamic chart rendering
- **Table View**: Sortable data table
- **Interactive Tooltips**: Hover for details

### Details Panel (Right)
- **Model Details**: Selected model information
- **Metric Explanations**: Description of each metric
- **Performance Ranking**: Models ranked by overall score

## File Structure

```
performance/
├── index.html          # Main HTML structure
├── style.css           # Stylesheet and responsive design
├── app.js              # Main JavaScript logic
├── app_1.js            # Alternative version
└── README.md           # This file
```

## Customization

### Adding New Models

Edit `app.js` and add your model data:

```javascript
const modelData = {
    "Your Model Name": {
        "Hallucination Testing": 0.5,
        "Out-of-Scope Query Testing": 1.2,
        "Compliance Testing": 2.8,
        "Robustness to Errors": 0.3,
        "Ambiguity Testing": 1.5,
        "Adversarial Testing": 0.8,
        "Accuracy Testing": 0.4
    }
};
```

### Changing Colors

Modify the color scheme in `app.js`:

```javascript
const modelColors = {
    "Model Name": "#FF6384",  // Your preferred color
};
```

### Styling

Edit `style.css` to customize:
- Layout and spacing
- Color scheme
- Typography
- Responsive breakpoints

## Technical Details

### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: Core application logic
- **Chart.js**: Visualization library (CDN)

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- Initial load: < 1 second
- Chart updates: ~50-100ms
- Real-time weight adjustments
- Smooth transitions

## Use Cases

### AI Research
- Compare experimental models
- Benchmark against baselines
- Track improvements over iterations

### Product Management
- Evaluate vendor solutions
- Select best model for use cases
- Present findings to stakeholders

### Quality Assurance
- Monitor model performance
- Detect regressions
- Document test results

### Sales & Marketing
- Demonstrate model superiority
- Create competitive analysis
- Generate marketing materials

## Model Comparison Methodology

**Overall Score Calculation**:
```
Overall Score = Σ(metric_score × metric_weight) / Σ(metric_weights)
```

**Interpretation**:
- Lower overall score = Better model
- Consistent low scores = Well-rounded model
- Specialized models excel in specific metrics

## Future Enhancements

- [ ] Data import from CSV/JSON
- [ ] Historical performance tracking
- [ ] Custom metric definitions
- [ ] Confidence intervals
- [ ] Advanced filtering
- [ ] Multi-dashboard support
- [ ] API integration for live data
- [ ] Automated report generation

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in multiple browsers
5. Submit a pull request

## License

MIT License - feel free to use and modify for your projects.

## Contact

For questions or feedback:
- GitHub: [@ashwith1](https://github.com/ashwith1)
- Repository: [performance](https://github.com/ashwith1/performance)

## Acknowledgments

- **Chart.js**: Excellent charting library
- **AI Community**: Insights on evaluation metrics
- **Web Standards**: HTML5, CSS3, ES6

---

**Status**: Active Development

**Version**: 1.0.0

**Last Updated**: December 2025
