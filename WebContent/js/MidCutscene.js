/**
 *MidCutscene state.
 */
function MidCutscene() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
MidCutscene.prototype = proto;


MidCutscene.prototype.create = function() {
	var a = this.add.sound("ost",0.5,true,true);
	a.play();
	
		var p1 = this.add.button(this.world.centerX, this.world.centerY,
	"MID1",this.PG2, this);
p1.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
}

MidCutscene.prototype.PG2 = function() {
	var p2 = this.add.button(this.world.centerX, this.world.centerY,
	"MID2",this.PG3, this);
p2.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

MidCutscene.prototype.PG3 = function() {
	var p3 = this.add.button(this.world.centerX, this.world.centerY,
	"MID3",this.PG4, this);
p3.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};

MidCutscene.prototype.PG4 = function() {
	var p4 = this.add.button(this.world.centerX, this.world.centerY,
	"MID4",this.startGame, this);
p4.anchor.set(0.5, 0.5);
var text = this.add.text(10, this.world.height-30, "Alpha Version", {fill: 'white'});
text.scale.set(1);
};


MidCutscene.prototype.startGame = function() {
	this.cache.removeSound("ost");
	this.game.state.start("Level5");
};


