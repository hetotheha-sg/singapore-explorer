class Game {
  constructor() {
    this.state = 'loading';
    this.currentDestination = null;
    this.currentMission = null;
    this.currentScene = null;
    this.answeredQuestions = [];\n    this.missionProgress = {};\n    this.destinationOrder = [];
    this.sessionStats = {\n      totalQuestions: 0,\n      correctAnswers: 0,\n      stampsEarned: 0,\n      missionsCompleted: 0\n    };
    this.currentQuestion = null;
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
    
    window.game = this;
    this.renderOpeningScreen();
  }

  loadGame(savedData) {
    passport.fromJSON(savedData.passport);
    this.state = 'airport';
    this.currentDestination = 'changi';
    this.answeredQuestions = savedData.answeredQuestions || [];
    this.missionProgress = savedData.missionProgress || {};
    
    window.game = this;
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
    const destination = this.currentDestination || 'changi';
    const missions = getMissionsByDestination(destination);
    const missionData = missions.map(m => ({
      ...m,
      completed: this.isMissionCompleted(destination, m.id)
    }));
    
    uiManager.renderAirportScreen(
      missionData,
      (idx) => {
        window.game.selectMission(missions[idx].id);
      },
      () => this.proceedFromCurrentDestination()
    );
    
    this.updateAudioControl();
  }

  isMissionCompleted(destination, missionId) {
    if (!this.missionProgress[destination]) return false;
    return this.missionProgress[destination].includes(missionId);
  }

  selectMission(missionId) {
    const missions = getMissionsByDestination(this.currentDestination);
    const mission = missions.find(m => m.id === missionId);
    
    if (mission) {
      this.currentMission = mission;
      this.showQuestion(mission.question);
    }
  }

  showQuestion(questionId) {
    const question = getQuestionById(questionId);
    if (!question) return;
    
    this.currentQuestion = question;
    this.state = 'question';
    uiManager.renderQuestionScreen(question, (selectedIdx) => {
      window.game.handleAnswer(selectedIdx);
    });
  }

  handleAnswer(selectedIdx) {
    const question = this.currentQuestion;
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
      this.completeMission();
    }, 2500);
  }

  completeMission() {
    const destination = this.currentDestination;
    
    if (!this.missionProgress[destination]) {
      this.missionProgress[destination] = [];
    }
    
    if (!this.missionProgress[destination].includes(this.currentMission.id)) {
      this.missionProgress[destination].push(this.currentMission.id);
      this.sessionStats.missionsCompleted++;
    }
    
    // Check if all missions done
    const allMissions = getMissionsByDestination(destination);
    const allComplete = allMissions.every(m => 
      this.missionProgress[destination].includes(m.id)
    );
    
    if (allComplete) {
      passport.addStamp(destination);
      this.sessionStats.stampsEarned++;
      
      if (destination === 'changi') {
        this.proceedToHawker();
      } else if (destination === 'hawker') {
        this.showResults();
      }
    } else {
      // Return to mission screen
      this.renderAirportScreen();
    }
  }

  proceedFromCurrentDestination() {
    const destination = this.currentDestination;
    const allMissions = getMissionsByDestination(destination);
    const allComplete = allMissions.every(m => 
      this.isMissionCompleted(destination, m.id)
    );
    
    if (allComplete) {
      if (destination === 'changi') {
        this.proceedToHawker();
      } else if (destination === 'hawker') {
        this.showResults();
      }
    }
  }

  proceedFromAirport() {
    this.proceedFromCurrentDestination();
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
      window.game.renderHawkerSequence(sceneIndex + 1);
    });
    
    this.updateAudioControl();
  }

  enterHawkerMissions() {
    this.renderAirportScreen();
  }

  proceedFromHawker() {
    this.proceedFromCurrentDestination();
  }

  showResults() {
    this.state = 'results';
    
    const stats = {
      rank: passport.rank,
      stamps: passport.stamps.length,
      missionsCompleted: this.sessionStats.missionsCompleted,
      questionsAnswered: this.sessionStats.totalQuestions,
      accuracy: this.sessionStats.totalQuestions > 0 
        ? Math.round((this.sessionStats.correctAnswers / this.sessionStats.totalQuestions) * 100)
        : 0,
      destinations: passport.stamps.length
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