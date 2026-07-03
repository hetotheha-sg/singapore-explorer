class Passport {
  constructor() {
    this.name = '';
    this.number = '';
    this.stamps = [];
    this.missions = {};
    this.createdDate = new Date();
    this.rank = 'Tourist';
  }

  setName(name) {
    this.name = name;
  }

  generateNumber() {
    this.number = 'SQ' + Math.random().toString(36).substring(2, 11).toUpperCase();
  }

  addStamp(destination) {
    if (!this.stamps.includes(destination)) {
      this.stamps.push(destination);
      this.updateRank();
    }
  }

  completeMission(destinationId, missionId) {
    if (!this.missions[destinationId]) {
      this.missions[destinationId] = [];
    }
    if (!this.missions[destinationId].includes(missionId)) {
      this.missions[destinationId].push(missionId);
    }
  }

  getMissionProgress(destinationId) {
    return this.missions[destinationId] || [];
  }

  isMissionCompleted(destinationId, missionId) {
    const missions = this.missions[destinationId] || [];
    return missions.includes(missionId);
  }

  updateRank() {
    const stampCount = this.stamps.length;
    if (stampCount === 0) {
      this.rank = 'Tourist';
    } else if (stampCount === 1) {
      this.rank = 'Explorer';
    } else if (stampCount === 2) {
      this.rank = 'Local Friend';
    } else if (stampCount === 3) {
      this.rank = 'Honorary Singaporean';
    } else {
      this.rank = 'Singapore Explorer';
    }
  }

  toJSON() {
    return {
      name: this.name,
      number: this.number,
      stamps: this.stamps,
      missions: this.missions,
      createdDate: this.createdDate,
      rank: this.rank
    };
  }

  fromJSON(data) {
    this.name = data.name;
    this.number = data.number;
    this.stamps = data.stamps || [];
    this.missions = data.missions || {};
    this.createdDate = new Date(data.createdDate);
    this.rank = data.rank;
  }
}

const passport = new Passport();