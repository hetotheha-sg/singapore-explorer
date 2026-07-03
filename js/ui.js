class UIManager {
  constructor() {
    this.app = document.getElementById('app');
  }

  clear() {
    this.app.innerHTML = '';
  }

  renderLoadingScreen() {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-loading">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <div class="loading-text">Boarding...</div>
        </div>
      </div>
    `;
  }

  renderOpeningScreen(onStart) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-opening">
        <div class="opening-content">
          <div class="opening-title">✈ Singapore Explorer</div>
          <div class="opening-subtitle">
            Welcome to Changi Airport.
            <br><br>
            Your journey through Singapore begins now.
          </div>
          <div class="opening-action">
            <button class="btn-primary btn-large" onclick="window.gameUI.handleStart()">Start Your Journey</button>
          </div>
        </div>
      </div>
    `;
    window.gameUI.handleStart = onStart;
  }

  renderPassportCreation(onSubmit) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-opening">
        <div class="opening-content">
          <div class="opening-title">Welcome to Singapore</div>
          <div class="opening-subtitle">Before we issue your passport, what's your name?</div>
          <div class="opening-action" style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 400px; margin: 0 auto;">
            <input type="text" id="passengerName" placeholder="Your name" style="padding: 0.875rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.2); color: white; font-size: 1rem; text-align: center;" autofocus>
            <button class="btn-primary btn-large" onclick="window.gameUI.submitName()">Issue Passport</button>
          </div>
        </div>
      </div>
    `;
    
    const input = document.getElementById('passengerName');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') window.gameUI.submitName();
    });
    
    window.gameUI.submitName = () => {
      const name = input.value.trim();
      if (name.length > 0) onSubmit(name);
    };
  }

  renderPassportScreen(passportData) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-passport">
        <div class="passport-container">
          <div class="passport-book">
            <div class="passport-header">
              <div class="passport-country">SINGAPORE</div>
              <div class="passport-title">Passport</div>
            </div>
            <div class="passport-content">
              <div class="passport-field">
                <div class="passport-label">Passport Holder</div>
                <div class="passport-value">${passportData.name}</div>
              </div>
              <div class="passport-field">
                <div class="passport-label">Passport Number</div>
                <div class="passport-value">${passportData.number}</div>
              </div>
              <div class="passport-field">
                <div class="passport-label">Date Issued</div>
                <div class="passport-value">${new Date().toLocaleDateString()}</div>
              </div>
            </div>
            <div class="passport-footer">Singapore Tourism Board</div>
          </div>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      audioManager.playPassportStamp();
    }, 800);
  }

  renderBoardingPassScreen(passportData) {
    this.clear();
    
    const boardingGroups = ['A', 'B', 'C', 'D'];
    const boardingGroup = boardingGroups[Math.floor(Math.random() * boardingGroups.length)];
    const seat = Math.floor(Math.random() * 70) + 1;
    
    this.app.innerHTML = `
      <div class="screen screen-boarding-pass">
        <div class="boarding-pass-container">
          <div class="boarding-pass">
            <div class="boarding-pass-header">
              <div class="boarding-pass-airline">SINGAPORE AIRLINES</div>
              <div class="boarding-pass-flight">SQ 101 - SINGAPORE</div>
            </div>
            <div class="boarding-pass-content">
              <div class="boarding-pass-row">
                <div class="boarding-pass-field">
                  <div class="boarding-pass-label">Passenger Name</div>
                  <div class="boarding-pass-value">${passportData.name.toUpperCase()}</div>
                </div>
                <div class="boarding-pass-field">
                  <div class="boarding-pass-label">Boarding Pass</div>
                  <div class="boarding-pass-value">${passportData.number}</div>
                </div>
              </div>
              <div class="boarding-pass-row">
                <div class="boarding-pass-field">
                  <div class="boarding-pass-label">Boarding Group</div>
                  <div class="boarding-pass-value">${boardingGroup}</div>
                </div>
                <div class="boarding-pass-field">
                  <div class="boarding-pass-label">Seat</div>
                  <div class="boarding-pass-value">1${String(seat).padStart(2, '0')}</div>
                </div>
              </div>
              <div class="boarding-pass-row full">
                <div class="boarding-pass-field">
                  <div class="boarding-pass-label">Destination</div>
                  <div class="boarding-pass-value">Singapore Explorer</div>
                </div>
              </div>
              <div class="boarding-pass-divider"></div>
              <div class="boarding-pass-barcode">||| ||||| ||| ||||</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderAirportScreen(missions, onMissionClick, onProceed) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-airport">
        <div class="airport-container">
          <div class="airport-header">
            <h2 class="airport-title">Changi Airport</h2>
            <p>Complete missions to earn your first passport stamp.</p>
          </div>
          <div class="airport-content" id="missionsList"></div>
          <div class="airport-footer">
            <button class="btn-secondary" onclick="window.gameUI.currentOnProceed()">Back</button>
            <button class="btn-primary" id="proceedBtn" disabled>Ready to Explore Singapore</button>
          </div>
        </div>
      </div>
    `;
    
    const missionsList = document.getElementById('missionsList');
    missions.forEach((mission, idx) => {
      const isCompleted = mission.completed;
      missionsList.innerHTML += `
        <div class="mission-card ${isCompleted ? 'mission-completed' : 'glass-panel'}" onclick="window.gameUI.onMissionClick(${idx})" style="cursor: ${isCompleted ? 'default' : 'pointer'};">
          <div class="mission-icon">${mission.icon}</div>
          <div class="mission-info">
            <div class="mission-title">${mission.title}</div>
            <div class="mission-desc">${mission.description}</div>
          </div>
          <div class="mission-status">${isCompleted ? '✓' : '○'}</div>
        </div>
      `;
    });
    
    const proceedBtn = document.getElementById('proceedBtn');
    const allComplete = missions.every(m => m.completed);
    proceedBtn.disabled = !allComplete;
    
    window.gameUI.onMissionClick = onMissionClick;
    window.gameUI.currentOnProceed = onProceed;
  }

  renderHawkerScreen(sceneData, onChoiceClick) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-hawker">
        <div class="hawker-container">
          <div class="hawker-scene">
            <div class="hawker-dialogue">
              <div class="hawker-speaker">${sceneData.speaker}</div>
              <div class="hawker-text">${sceneData.dialogue}</div>
            </div>
            <div class="hawker-options">
              ${sceneData.options.map((opt, idx) => `
                <button class="hawker-option" onclick="window.gameUI.onChoice(${idx})">${opt}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    window.gameUI.onChoice = onChoiceClick;
  }

  renderQuestionScreen(question, onAnswer) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-question">
        <div class="question-container">
          <div class="question-card">
            <div style="margin-bottom: 1rem; font-size: 0.875rem; color: #666;">${question.context}</div>
            <div class="question-text">${question.text}</div>
            <div class="question-options" id="optionsList"></div>
          </div>
        </div>
      </div>
    `;
    
    const optionsList = document.getElementById('optionsList');
    question.options.forEach((opt, idx) => {
      optionsList.innerHTML += `
        <button class="question-option" onclick="window.gameUI.onAnswer(${idx})">${opt.text}</button>
      `;
    });
    
    window.gameUI.onAnswer = onAnswer;
  }

  renderQuestionFeedback(question, selectedIdx, isCorrect) {
    const optionsList = document.getElementById('optionsList');
    const options = optionsList.querySelectorAll('.question-option');
    
    options.forEach((opt, idx) => {
      opt.disabled = true;
      opt.classList.add('disabled');
      if (idx === selectedIdx) {
        opt.classList.add(isCorrect ? 'correct' : 'incorrect');
      } else if (question.options[idx].correct && !isCorrect) {
        opt.classList.add('correct');
      }
    });
    
    const card = document.querySelector('.question-card');
    const feedback = document.createElement('div');
    feedback.className = `question-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = isCorrect 
      ? `✓ Correct! ${question.insight}`
      : `✗ Not quite. ${question.insight}`;
    card.appendChild(feedback);
    
    if (isCorrect) {
      audioManager.playSuccess();
    } else {
      audioManager.playError();
    }
  }

  renderResultsScreen(stats, onRestart) {
    this.clear();
    this.app.innerHTML = `
      <div class="screen screen-results">
        <div class="results-container">
          <div class="results-card">
            <h2 class="results-title">Journey Complete</h2>
            <div class="results-rank">${stats.rank}</div>
            <p style="font-size: 1.125rem; margin-bottom: 2rem;">You've earned <strong>${stats.stamps}</strong> passport stamp(s)</p>
            
            <div class="results-stats">
              <div class="results-stat">
                <div class="results-stat-label">Missions Completed</div>
                <div class="results-stat-value">${stats.missionsCompleted}</div>
              </div>
              <div class="results-stat">
                <div class="results-stat-label">Questions Answered</div>
                <div class="results-stat-value">${stats.questionsAnswered}</div>
              </div>
              <div class="results-stat">
                <div class="results-stat-label">Accuracy</div>
                <div class="results-stat-value">${stats.accuracy}%</div>
              </div>
              <div class="results-stat">
                <div class="results-stat-label">Destinations</div>
                <div class="results-stat-value">${stats.destinations}</div>
              </div>
            </div>
            
            <div class="results-actions">
              <button class="btn-primary btn-large" onclick="window.gameUI.onRestart()">Start New Journey</button>
              <button class="btn-secondary btn-large">View Passport</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    window.gameUI.onRestart = onRestart;
  }

  renderAudioControl(enabled, onChange) {
    let control = document.querySelector('.audio-control');
    if (!control) {
      const container = document.createElement('div');
      container.innerHTML = '<button class="audio-control" id="audioControlBtn"></button>';
      document.body.appendChild(container.firstChild);
      control = document.getElementById('audioControlBtn');
    }
    
    control.textContent = enabled ? '🔊' : '🔇';
    control.className = `audio-control ${enabled ? '' : 'muted'}`;
    control.onclick = onChange;
  }
}

const uiManager = new UIManager();