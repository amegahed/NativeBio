/******************************************************************************\
|                                                                              |
|                                 video-file.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a video file.                                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import File from '../../models/files/file.js';
import FileUtils from '../../utilities/files/file-utils.js';
import TimeUtils from '../../utilities/time/time-utils.js';

export default File.extend({

	//
	// querying methods
	//

	hasThumbnail: function() {

		// check for path
		//
		if (!this.has('path') || this.get('path').length == 0) {
			return false;
		}

		// check configuration
		//
		return application.session.has('config')? application.session.get('config').video_thumbnails_enabled : false;
	},

	//
	// metadata querying methods
	//

	hasAttribute: function(attributeName) {
		switch (attributeName) {
			case 'resolution':
				return this.has('tags') && this.get('tags').resolution != undefined;
			case 'duration':
				return this.has('tags') && this.get('tags').duration != undefined;
			case 'bitrate':
				return this.has('tags') && this.get('tags').bit_rate != undefined;
			default:

				// call superclass method
				//
				return File.prototype.hastAttribute.call(this, attributeName);
		}
	},

	//
	// getting methods
	//

	getUrl: function(options) {		
		return config.servers.api + '/video?' + this.getQueryString(options);
	},

	getResolution: function() {
		if (this.has('tags')) {
			let resolution = this.get('tags').resolution;
			if (resolution) {
				let width = parseInt(Math.round(resolution.width));
				let height = parseInt(Math.round(resolution.height));
				return width + 'x' + height + ' px';
			}
		}
	},

	getPixelCount: function() {
		if (this.has('tags')) {
			let resolution = this.get('tags').resolution;
			if (resolution) {
				return resolution.width * resolution.height;
			}
		}
	},

	getSeconds: function() {
		if (this.has('tags')) {
			let duration = this.get('tags').duration;
			if (duration) {
				return parseFloat(duration);
			}
		}
	},

	getDuration: function() {
		if (this.has('tags')) {
			let seconds = this.getSeconds();
			if (seconds) {
				let time = TimeUtils.secondsToTime(seconds);
				let digits = TimeUtils.timeToDigits(time);
				return digits;
			}
		}
	},

	getBitRate: function() {
		if (this.has('tags')) {
			let bit_rate = this.get('tags').bit_rate;
			if (bit_rate) {
				return Math.floor(bit_rate / 1000) + ' Kbps';
			}
		}
	},

	//
	// metadata getting methods
	//

	getAttribute: function(attributeName, preferences) {
		switch (attributeName) {
			case 'resolution':
				return this.getResolution();
			case 'duration':
				return this.getDuration();
			case 'bitrate':
				return this.getBitRate();
			default:

				// call superclass method
				//
				return File.prototype.getAttribute.call(this, attributeName, preferences);
		}
	},

	getSortableAttribute: function(attributeName) {
		switch (attributeName) {
			case 'resolution':
				return this.getPixelCount();
			case 'duration':
				return this.getSeconds();
			case 'bitrate':
				return this.get('tags').bit_rate;
			default:

				// call superclass method
				//
				return File.prototype.getSortableAttribute.call(this, attributeName);
		}
	},

	//
	// rendering methods
	//

	showInfo: function(options) {
		import(
			'../../views/apps/file-browser/dialogs/info/video-file-info-dialog-view.js'
		).then((VideoFileInfoDialogView) => {

			// show video file info dialog
			//
			application.show(new VideoFileInfoDialogView.default(_.extend({
				model: this
			}, options)));
		});
	}
}, {

	//
	// static attributes
	//

	extensions: config.files.videos.extensions,

	//
	// static methods
	//

	isValidExtension: function(extension) {
		return extension && this.extensions.contains(extension.toLowerCase());
	},

	isValidPath: function(path) {
		return this.isValidExtension(FileUtils.getFileExtension(path));
	}
});