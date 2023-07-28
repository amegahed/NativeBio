/******************************************************************************\
|                                                                              |
|                           topic-info-panel-view.js                           |
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

import UserPreferences from '../../../../../models/preferences/user-preferences.js';
import Topics from '../../../../../collections/topics/topics.js';
import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import TopicsView from '../../../../../views/apps/topic-browser/mainbar/topics/topics-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'topic-info panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-info-circle"></i>Topic</label>
		
			<div class="buttons">
				<button type="button" class="show-info success btn btn-sm" data-toggle="tooltip" title="Show Info">
					<i class="fa fa-info-circle"></i>
				</button>
			</div>
		</div>
		
		<div class="item-info">
			<div class="item"></div>
		
			<% if (typeof description != 'undefined') { %>
			<div class="description form-group" style="display:none">
				<label class="control-label"><i class="fa fa-quote-left"></i>Description</label>
				<div class="controls">
					<div class="well"><%= description || 'None' %></div>
				</div>
			</div>
			<% } %>
		</div>
	`),

	regions: {
		item: '.item'
	},

	events: {
		'click .show-info': 'onClickShowInfo'
	},

	//
	// setting methods
	//

	setTopic: function(topic) {
		this.model = topic;
		this.showItem();
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		SideBarPanelView.prototype.onRender.call(this);
		
		// show child views
		//
		this.showItem();
	},

	showItem: function() {
		this.showChildView('item', new TopicsView({
			collection: new Topics([this.model], {
				parse: false
			}),

			// options
			//
			preferences: UserPreferences.create('topic_viewer', {
				view_kind: 'icons'
			}),

			// capabilities
			//
			selectable: false
		}));
	},

	//
	// mouse event handling methods
	//

	onClickShowInfo: function() {
		this.getParentView('app').showInfoDialog();
	}
});