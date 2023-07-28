/******************************************************************************\
|                                                                              |
|                            audio-file-info-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing information about an audio file.      |
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
import AudioInfoPaneView from '../../../../../views/apps/file-browser/forms/info/panes/audio-files/audio-info-pane-view.js';

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
			
			<% if (typeof id3 != 'undefined' && id3) { %>
			<li role="presentation" class="audio tab<% if (tab == 'audio') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".audio.tab-pane">
					<i class="fa fa-volume-up"></i>
					<label>Audio</label>
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
			<li role="presentation" class="place tab<% if (tab == 'place') { %> active<% } %>">
				<a role="tab" data-toggle="tab" href=".place.tab-pane">
					<i class="fa fa-map-pin"></i>
					<label>Place</label>
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
			
			<div role="tabpanel" class="audio tab-pane<% if (tab == 'audio') { %> active<% } %>">
			</div>
			
			<div role="tabpanel" class="history tab-pane<% if (tab == 'history') { %> active<% } %>">
			</div>
			
			<div role="tabpanel" class="permissions tab-pane<% if (tab == 'permissions') { %> active<% } %>">
			</div>
			
			<div role="tabpanel" class="place tab-pane<% if (tab == 'place') { %> active<% } %>">
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
		audio: '.audio.tab-pane',
		history: '.history.tab-pane',
		permissions: '.permissions.tab-pane',
		place: '.place.tab-pane',
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

		// show audio info
		//
		if (this.$el.find('.audio.tab').length > 0) {
			this.showAudioInfo();
		}
	},

	showAudioInfo: function() {
		this.showChildView('audio', new AudioInfoPaneView({
			model: this.model
		}));
	}
});