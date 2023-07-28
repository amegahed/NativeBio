/******************************************************************************\
|                                                                              |
|                                face-view.js                                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an a view used for the face of a timer.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../../views/base-view.js';
import PieView from '../../../../views/forms/outputs/pie-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'face',

	template: template(`
		<div class="pie"></div>
		
		<div class="digital lcd display">
			<div class="digits">
				<div class="hours">00</div>
				<div class="middle">
					<div class="minutes">00</div>
					<div class="colons">:</div>
					<div class="seconds">00</div>
				</div>
				<div class="hundredths">00</div>
			</div>
		</div>
	`),

	regions: {
		'pie': {
			el: '.pie',
			replaceElement: true
		}
	},

	//
	// timer methods
	//

	setTime: function(time) {
		let hours = time.hours;
		let minutes = time.minutes;
		let wholeSeconds = Math.floor(time.seconds);
		let hundredths = Math.floor((time.seconds - wholeSeconds) * 100);

		function pad(string) {
			return string.length == 1? '0' + string : string;
		}

		this.$el.find('.hours').html(pad(hours.toString()));
		this.$el.find('.minutes').html(pad(minutes.toString()));
		this.$el.find('.seconds').html(pad(wholeSeconds.toString()));
		this.$el.find('.hundredths').html(pad(hundredths.toString()));
	},

	setAngle: function(angle) {
		this.getChildView('pie').setAngle(angle);
	},

	//
	// rendering methods
	//

	onRender: function() {
		this.showChildView('pie', new PieView({
			className: 'lcd pie',
			angle: 0
		}));
	}
});