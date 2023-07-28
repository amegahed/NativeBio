/******************************************************************************\
|                                                                              |
|                            video-file-info-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing information about a video file.       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FileInfoView from '../../../../../views/apps/file-browser/forms/info/file-info-view.js';
import VideoInfoPaneView from '../../../../../views/apps/file-browser/forms/info/panes/video-files/video-info-pane-view.js';
import VideoExifPaneView from '../../../../../views/apps/file-browser/forms/info/panes/video-files/video-exif-pane-view.js';

export default FileInfoView.extend({

	//
	// attributes
	//

	className: 'form-vertical',

	template: template(`
		<div class="items">
			<div class="icon-grid"></div>
		</div>
		
		<ul class="nav nav-tabs" role="tablist">
		
			<li role="presentation" class="general tab<% if (tab == 'general') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".general.tab-pane">
					<i class="fa fa-info-circle"></i>
					<label>General</label>
				</a>
			</li>
		
			<% if (typeof tags != 'undefined' && tags) { %>
			<li role="presentation" class="video tab<% if (tab == 'video') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".video.tab-pane">
					<i class="fa fa-video"></i>
					<label>Video</label>
				</a>
			</li>
			<% } %>
		
			<% if (typeof exif != 'undefined') { %>
			<li role="presentation" class="info tab<% if (tab == 'info') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".info.tab-pane">
					<i class="fa fa-table"></i>
					<label>Info</label>
				</a>
			</li>
			<% } %>
		
			<% if (show_meta_info) { %>
			<li role="presentation" class="history tab<% if (tab == 'history') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".history.tab-pane">
					<i class="fa fa-calendar-alt"></i>
					<label>History</label>
				</a>
			</li>
			<% } %>
		
			<% if (show_meta_info) { %>
			<li role="presentation" class="permissions tab<% if (tab == 'permissions') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".permissions.tab-pane">
					<i class="fa fa-lock"></i>
					<label>Permissions</label>
				</a>
			</li>
			<% } %>
		
			<% if (show_meta_info) { %>
			<li role="presentation" class="sharing tab<% if (tab == 'sharing') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".sharing.tab-pane">
					<i class="fa fa-share"></i>
					<label>Sharing</label>
				</a>
			</li>
			<% } %>
		
			<% if (show_meta_info) { %>
			<li role="presentation" class="links tab<% if (tab == 'links') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".links.tab-pane">
					<i class="fa fa-link"></i>
					<label>Links</label>
				</a>
			</li>
			<% } %>
		</ul>
		
		<div class="tab-content">
		
			<div role="tabpanel" class="general tab-pane<% if (tab == 'general') { %> active<% } %>">
			</div>
		
			<div role="tabpanel" class="video tab-pane<% if (tab == 'video') { %> active<% } %>">
			</div>
		
			<div role="tabpanel" class="info tab-pane<% if (tab == 'info') { %> active<% } %>">
			</div>
			
			<div role="tabpanel" class="history tab-pane<% if (tab == 'history') { %> active<% } %>">
			</div>
		
			<div role="tabpanel" class="permissions tab-pane<% if (tab == 'permissions') { %> active<% } %>">
			</div>
		
			<div role="tabpanel" class="sharing tab-pane<% if (tab == 'sharing') { %> active<% } %>">
			</div>
		
			<div role="tabpanel" class="links tab-pane<% if (tab == 'links') { %> active<% } %>">
			</div>
		</div>
	`),

	regions: {
		item: '.icon-grid',
		general: '.general.tab-pane',
		video: '.video.tab-pane',
		info: '.info.tab-pane',
		history: '.history.tab-pane',
		permissions: '.permissions.tab-pane',
		sharing: '.sharing.tab-pane',
		links: '.links.tab-pane'
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		FileInfoView.prototype.onRender.call(this);

		// show video info
		//
		if (this.$el.find('.video.tab').length > 0) {
			this.showVideoInfo();
		}
		if (this.$el.find('.info.tab').length > 0) {
			this.showExifInfo();
		}
	},

	showVideoInfo: function() {
		this.showChildView('video', new VideoInfoPaneView({
			model: this.model
		}));
	},

	showExifInfo: function() {
		this.showChildView('info', new VideoExifPaneView({
			model: this.model
		}));
	},
});
