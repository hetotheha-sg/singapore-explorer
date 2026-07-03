class Game {
  constructor() {
    this.state = 'loading';
    this.currentDestination = null;
    this.currentMission = null;
    this.currentScene = null;
    this.answeredQuestions = [];
    this.missionProgress = {};
    this.destinationOrder = [];
    this.sessionStats = {
      totalQuestions: 0,
      correctAnswers: 0,
      stampsEarned: 0,
      missionsCompleted: 0
    };
    this.init();
  }

  async init() {
    audioManager.init();
    
    // Check for saved game
    const saved = saveManager.getLastGame();
    
    if (saved) {
      this.loadGame(saved);
    } else {
      this.startNewGame();
    }
  }

  startNewGame() {
    this.state = 'opening';
    this.currentDestination = null;
    this.answeredQuestions = [];
    this.missionProgress = {};
    this.destinationOrder = ['changi', 'hawker'];
    this.sessionStats = {
      totalQuestions: 0,
      correctAnswers: 0,
      stampsEarned: 0,
      missionsCompleted: 0
    };
    
    window.gameUI = uiManager;
    this.renderOpeningScreen();
  }

  loadGame(savedData) {
    passport.fromJSON(savedData.passport);
    this.state = 'airport';
    this.currentDestination = 'changi';
    this.answeredQuestions = savedData.answeredQuestions || [];
    this.missionProgress = savedData.missionProgress || {};
    
    window.gameUI = uiManager;
    this.renderAirportScreen();
  }

  renderOpeningScreen() {
    uiManager.renderOpeningScreen(() => this.requestPassengerName());
  }

  requestPassengerName() {
    uiManager.renderPassportCreation((name) => {
      passport.setName(name);
      passport.generateNumber();
      this.state = 'passport_created';
      this.showPassport();
    });
  }

  showPassport() {
    uiManager.renderPassportScreen(passport.toJSON());
    setTimeout(() => this.showBoardingPass(), 2000);
  }

  showBoardingPass() {
    uiManager.renderBoardingPassScreen(passport.toJSON());
    setTimeout(() => this.enterAirport(), 3000);
  }

  enterAirport() {
    this.state = 'airport';
    this.currentDestination = 'changi';
    this.renderAirportScreen();
  }

  renderAirportScreen() {
    const missions = getMissionsByDestination('changi');
    const missionData = missions.map(m => ({
      ...m,
      completed: this.isMissionCompleted('changi', m.id)
    }));
    
    uiManager.renderAirportScreen(
      missionData,
      (idx) => this.selectMission(missions[idx].id),
      () => this.proceedFromAirport()
    );
    
    this.updateAudioControl();
  }

  isMissionCompleted(destination, missionId) {
    if (!this.missionProgress[destination]) return false;
    return this.missionProgress[destination].includes(missionId);
  }

  selectMission(missionId) {
    const missions = getMissionsByDestination('changi');
    const mission = missions.find(m => m.id === missionId);
    
    if (mission) {
      this.currentMission = mission;
      this.showQuestion(mission.question);
    }
  }

  showQuestion(questionId) {
    const question = getQuestionById(questionId);
    if (!question) return;
    
    this.state = 'question';
    uiManager.renderQuestionScreen(question, (selectedIdx) => {
      this.handleAnswer(question, selectedIdx);
    });
  }

  handleAnswer(question, selectedIdx) {
    const isCorrect = question.options[selectedIdx].correct;
    
    this.sessionStats.totalQuestions++;
    if (isCorrect) this.sessionStats.correctAnswers++;
    
    this.answeredQuestions.push({
      questionId: question.id,
      correct: isCorrect,
      timestamp: new Date().toISOString()
    });
    
    uiManager.renderQuestionFeedback(question, selectedIdx, isCorrect);
    
    setTimeout(() => {
      if (isCorrect) {
        this.completeMission();
      } else {
        this.renderAirportScreen();
      }
    }, 3000);
  }

  completeMission() {
    if (!this.missionProgress['changi']) {
      this.missionProgress['changi'] = [];
    }
    this.missionProgress['changi'].push(this.currentMission.id);
    this.sessionStats.missionsCompleted++;
    
    // Check if all missions done
    const allMissions = getMissionsByDestination('changi');
    const allComplete = allMissions.every(m => 
      this.missionProgress['changi'].includes(m.id)
    );
    
    if (allComplete) {
      passport.addStamp('changi');
      this.sessionStats.stampsEarned++;
      this.proceedToHawker();
    } else {
      this.renderAirportScreen();
    }
  }

  proceedFromAirport() {
    const allMissions = getMissionsByDestination('changi');
    const allComplete = allMissions.every(m => 
      this.isMissionCompleted('changi', m.id)
    );
    
    if (allComplete) {
      this.proceedToHawker();
    }
  }

  proceedToHawker() {
    this.state = 'hawker';
    this.currentDestination = 'hawker';
    this.renderHawkerSequence(0);
  }

  renderHawkerSequence(sceneIndex) {
    if (sceneIndex >= HAWKER_SCENES.length) {
      this.enterHawkerMissions();
      return;
    }
    
    const scene = getHawkerScene(sceneIndex);
    uiManager.renderHawkerScreen(scene, (optionIdx) => {
      this.renderHawkerSequence(sceneIndex + 1);
    });
    
    this.updateAudioControl();
  }

  enterHawkerMissions() {
    const missions = getMissionsByDestination('hawker');
    const missionData = missions.map(m => ({
      ...m,
      completed: this.isMissionCompleted('hawker', m.id)
    }));
    
    uiManager.renderAirportScreen(
      missionData,
      (idx) => this.selectHawkerMission(missions[idx].id),
      () => this.proceedFromHawker()
    );
    
    this.updateAudioControl();
  }

  selectHawkerMission(missionId) {
    const missions = getMissionsByDestination('hawker');
    const mission = missions.find(m => m.id === missionId);
    
    if (mission) {
      this.currentMission = mission;
      this.showQuestion(mission.question);
    }
  }

  proceedFromHawker() {
    const allMissions = getMissionsByDestination('hawker');
    const allComplete = allMissions.every(m => 
      this.isMissionCompleted('hawker', m.id)
    );
    
    if (allComplete) {
      passport.addStamp('hawker');
      this.sessionStats.stampsEarned++;
      this.showResults();
    }
  }

  showResults() {
    this.state = 'results';
    
    const stats = {
      rank: passport.rank,
      stamps: passport.stamps.length,
      missionsCompleted: this.sessionStats.missionsCompleted,
      questionsAnswered: this.sessionStats.totalQuestions,
      accuracy: Math.round((this.sessionStats.correctAnswers / this.sessionStats.totalQuestions) * 100),
      destinations: this.currentDestination === 'hawker' ? 2 : 1
    };
    
    saveManager.saveStats(stats);
    uiManager.renderResultsScreen(stats, () => this.startNewGame());
    this.updateAudioControl();
  }

  updateAudioControl() {
    uiManager.renderAudioControl(audioManager.enabled, () => {
      audioManager.toggle();
      this.updateAudioControl();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});