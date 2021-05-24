const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  userName: String,
  points: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  //farming
  wheat: { type: Number, default: 0 },
  carrots: { type: Number, default: 0 },
  potatoes: { type: Number, default: 0 },
  wheatPlanted: { type: Number, default: 0 },
  carrotsPlanted: { type: Number, default: 0 },
  potatoesPlanted: { type: Number, default: 0 },
  wheatHarvest: { type: Date, default: Date.now },
  carrotHarvest: { type: Date, default: Date.now },
  potatoHarvest: { type: Date, default: Date.now },
  fertilizer: { type: Number, default: 0 },
  //pub
  barLicense: { type: Boolean, default: false },
  beer: { type: Number, default: 0 },
  bow: { type: Boolean, default: false },
  bowAmmo: { type: Number, default: 3 },
  bowCooldown: { type: Date, default: Date.now },
  gun: { type: Boolean, default: false },
  gunAmmo: { type: Number, default: 3 },
  gunCooldown: { type: Date, default: Date.now },
  rifle: { type: Boolean, default: false },
  rifleAmmo: { type: Number, default: 3 },
  rifleCooldown: { type: Date, default: Date.now },
  currentWeapon: { type: Number, default: 0 },

});

module.exports = new mongoose.model('User', userSchema);