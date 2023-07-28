/******************************************************************************\
|                                                                              |
|                                timer-view.js                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an app used for performing timing.                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import AppView from '../../../views/apps/common/app-view.js';
import FaceView from '../../../views/apps/timer/panels/face-view.js';
import ButtonsView from '../../../views/apps/timer/panels/buttons-view.js';
import TimeUtils from '../../../utilities/time/time-utils.js';

export default AppView.extend({

	//
	// attributes
	//

	name: 'timer',

	template: template(`
		<div class="body last">
			<div class="face"></div>
			<div class="buttons"></div>
		</div>
	`),

	regions: {
		face: {
			el: '.face',
			replaceElement: true
		},
		buttons: {
			el: '.buttons',
			replaceElement: true
		}
	},

	//
	// dialog attributes
	//
	
	size: [300, 300],
	resizable: false,
	maximizable: false,

	events: _.extend({}, AppView.prototype.events, {

		// basic events
		//
		'click .start': 'onClickStart',
		'click .stop': 'onClickStop',
		'click .reset': 'onClickReset'
	}),

	// animation attributes
	//
	ticking: true,
	updateInterval: 100,

	//
	// constructor
	//

	initialize: function() {

		// call superclass constructor
		//
		AppView.prototype.initialize.call(this);

		// set attributes
		//
		this.seconds = 0;
		this.count = 0;
	},

	//
	// timing methods
	//

	start: function() {

		// set start time
		//
		if (!this.interval) {
			this.startTime = new Date();
		}

		// start updating at regular intervals
		//
		this.setInterval(() => {
			this.update();
		}, this.updateInterval);
		
		this.getChildView('buttons').start();
	},

	toggle: function() {
		if (this.interval) {
			this.stop();
		} else {
			this.start();
		}
	},

	stop: function() {
		this.clearInterval();
		this.seconds += TimeUtils.getElapsedSeconds(this.startTime, new Date());
		this.getChildView('buttons').stop();
	},

	reset: function() {
		this.stop();
		this.seconds = 0;

		// reset time
		//
		this.setTime(0);
		this.getChildView('face').setAngle(0);
	},

	//
	// rendering methods
	//

	setTime: function(seconds) {
		this.getChildView('face').setTime(TimeUtils.secondsToTime(seconds));
	},

	//
	// rendering methods
	//

	onRender: function() {
		this.showChildView('face', new FaceView());
		this.showChildView('buttons', new ButtonsView());
	},

	update: function() {
		let seconds = this.seconds + TimeUtils.getElapsedSeconds(this.startTime, new Date());
		this.setTime(seconds);
		this.count++;

		// update analog display
		//
		if (!this.ticking || this.count % 10 == 0) {
			this.getChildView('face').setAngle(360 * seconds / 60);
		}
	}
});