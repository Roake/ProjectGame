/**
 * Level4 state.
 */
function Level4() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level4.prototype = proto;


Level4.prototype.create = function() {
	background = this.add.tileSprite(0, 0, 1024, 768, "BB");
	background.scale.set(1);
	background.fixedToCamera = true;
	this.lift = this.add.audio("lift");
	this.lift.play();
	this.music = this.add.audio("0039",0.5);
	this.music.loopFull()
	this.map = this.game.add.tilemap("c1-4");
	this.map.addTilesetImage('industrial.v1');

//	this.cache.removeSound('c1-1bgm');
	this.game.sound.remove('c1-1bgm');



	this.gun = this.add.audio("gun");
	this.gun.allowMultiple=true;
	this.maplayer = this.map.createLayer("TL1");
	this.maplayer1 = this.map.createLayer("TL2");

	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0,1000,true,this.maplayer);
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;

//if(this.game.character==1){
	this.enemies = this.add.group();
	this.goal=this.add.group();
	for (x  in this.map.objects.object) {
	var obj = this.map.objects.object[x];
	if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_PLATFORMER);
		}

		if (obj.type == "bot") {
			var a = this.addSGT(obj.x, obj.y);
			this.enemies.add(a);
		} if (obj.type == "goal") {
			// เพิ่ม sprite goal
			var g = this.addGoal(obj.x,obj.y);
			this.goal.add(g);
		}
	
//	var text = this.add.text(10, this.world.height-30, "Alpha Version C:1-4", {fill: 'white'});
//	text.scale.set(1);
	
	this.createWeapon();
	this.createText();
	}
//}
};

Level4.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(100, "bullet",10);	
	this.weapon2 = this.add.weapon(100, "bullet",10);	
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player, 75, -10);
	this.weapon1.bulletSpeed = 700;
	this.weapon1.fireAngle = 0;
	this.weapon1.rate = 500;
	
	this.weapon1.bulletAngleOffset=90;
	this.weapon1.bulletGravity.y = -1000;
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon2.trackSprite(this.player, -75,-10);
	this.weapon2.bulletSpeed = 700;
	this.weapon2.fireAngle = 180;
	this.weapon2.bulletAngleOffset=-270;
	this.weapon2.rate = 500;
	this.weapon2.bulletGravity.y = -1000;
	}

Level4.prototype.update = function() {
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemies,this.maplayer);
	this.game.physics.arcade.collide(this.goal,this.maplayer);
	this.physics.arcade.collide(this.player,this.goal,this.Next,null,this);
	/*if (input.keyboard.isDown) {
		var dx = (pointer.worldX - this.player.x) * 2;
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			if (dx > 0){
				dx = 0.4;}
			else{
				dx = -0.4;}
			this.player.scale.x = dx;
			this.player.body.velocity.x = 250 * dx;
			}
	}	*/
		
		 if(this.input.keyboard.isDown(Phaser.Keyboard.UP)){
				if(this.player.body.velocity.y==0){
					this.player.body.velocity.y=-500;
					this.player.play("jump");
					if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.player.play("ffb");}} 
		 }else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.player.body.velocity.x = -200;
			this.player.scale.x = -0.2;
			this.player.play("walk");
	
		}else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.player.body.velocity.x = 200;
			this.player.scale.x = 0.2;
			this.player.play("walk");
			
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			if(this.player.scale.x == -0.2){
			this.player.play("attack");
			this.fireWeaponback();}
			if(this.player.scale.x == 0.2){
				this.player.play("attack");
				this.fireWeapon();}
		}else {
			this.player.body.velocity.x = 0;
			this.player.play("idle");
		}
};
Level4.prototype.createText = function (){
	msgTxt  = this.add.button(this.world.centerX, this.world.centerY+300,
	"GEN2-1");
	msgTxt.scale.set(1);
	msgTxt.anchor.set(0.5,0.5);
	this.input.onDown.add(this.WIN1, this);

	}
Level4.prototype.WIN1 = function() {
	msgTxt.loadTexture("WIN2-1",0);
			this.input.onDown.add(this.SGT2, this);
		}
Level4.prototype.SGT2 = function() {
	msgTxt.loadTexture("GEN2-2",0);
			this.input.onDown.add(this.SGT3, this);
		}
Level4.prototype.SGT3 = function() {
	msgTxt.loadTexture("GEN2-3",0);
			this.input.onDown.add(this.SGT4, this);
		}	
Level4.prototype.SGT4 = function() {
	msgTxt.loadTexture("WIN2-2",0);
			this.input.onDown.add(this.SGT5, this);
		}
Level4.prototype.SGT5 = function() {
	msgTxt.loadTexture("GEN2-4",0);
			this.input.onDown.add(this.WIN2, this);
		}
Level4.prototype.WIN2 = function() {
	msgTxt.loadTexture("GEN2-5",0);
	this.input.onDown.add(this.WIN3, this);
		}
Level4.prototype.WIN3 = function() {
	msgTxt.loadTexture("GEN2-6",0);
		this.input.onDown.add(fade, this);
		if(this.input.onDown){
		this.time.events.add(Phaser.Timer.SECOND * 4, resetFade, this);
		this.time.events.add(Phaser.Timer.SECOND * 4, this.Next, this);}
		};

		function fade() {
		//  You can set your own fade color and duration
			this.game.camera.fade(0x000000, 2000);
		}

		function resetFade() {
			this.game.camera.resetFX();

		}

Level4.prototype.addPlayer = function(x, y) {
	
	var t = this.add.sprite(x, y, "Winston");
	t.animations.add("idle", gframes("Winston-True-Idle", 2),2, true);
	t.animations.add("walk", gframes("Winston-Walk", 5), 5, true);
	t.animations.add("jump", gframes("Winston-Jump", 5), 5, true);
	t.animations.add("attack", kframes("Winston-Fire", 5), 10, true);
	t.animations.add("ffb", gframes("Winston-Fire-From-Above", 5), 20, true);
	t.anchor.set(0.5, 0.5);
	t.scale.set (0.2);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	t.body.collideWorldBounds = true;
	return t;
	
	
};
Level4.prototype.fireWeaponback = function (){
	if(this.weapon2.fire()!=false){
		this.gun.play();
	}
	
	this.weapon2.fire();
};
Level4.prototype.fireWeapon = function (){
	if(this.weapon1.fire()!=false){
		this.gun.play();
	}
	this.weapon1.fire();
};

Level4.prototype.addSGT = function(x, y) {
		var a = this.add.sprite(x, y,
	"GenDragur");
		a.anchor.set(-1, 0.5);
a.scale.set(0.2);
a.animations.add("idle").play(1,true);
a.smoothed=false;
this.game.physics.arcade.enable(a);
return a;
};

Level4.prototype.Next = function(player,goal){ 
	this.music.stop();
	this.cache.removeSound('c1-1bgm');
	this.game.state.start("MidCutscenew");
	
}

Level4.prototype.addGoal = function(x, y) {
	var c = this.add.sprite(x, y, "go");
	c.anchor.set(0,0);
	c.scale.set(0.5);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};

function gframes(key, n) {
	f = [];
	for (var i = 0; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
};
function kframes(key, n) {
	f = [];
	for (var i = 1; i <= n; i++) {
		f.push(key + "_" + "00" + i);
	}
	return f;
};
//}