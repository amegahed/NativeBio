/******************************************************************************\
|                                                                              |
|                           track-info-panel-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing a type of sidebar panel.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import TrackInfoView from '../../../../../views/apps/audio-player/sidebar/lists/track-info-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'track-info panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-table"></i>Track Info</label>
		</div>
		
		<div class="info"></div>
	`),

	regions: {
		'info': '.info'
	},	

	//
	// rendering methods
	//

	onRender: function() {

		// show child views
		//
		this.showChildView('info', new TrackInfoView({
			model: this.model
		}));
	}
});