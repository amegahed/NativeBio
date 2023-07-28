/******************************************************************************\
|                                                                              |
|                               share-menu-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying share dropdown menus.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import MenuView from '../../../../../../views/apps/common/header-bar/menu-bar/menus/menu-view.js';

export default MenuView.extend({

	//
	// attributes
	//

	template: template(`
		<li role="presentation">
			<a class="share-with-connections"><i class="fa fa-user-friends"></i>With Connections</a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="share-by-post"><i class="fa fa-newspaper"></i>By Post</a>
		</li>
		
		<li role="presentation">
			<a class="share-by-message"><i class="fa fa-comments"></i>By Messsage</a>
		</li>
		
		<li role="separator" class="divider"></li>
		
		<li role="presentation">
			<a class="share-by-link"><i class="fa fa-link"></i>By Link</a>
		</li>
		
		<li role="presentation">
			<a class="share-by-email"><i class="fa fa-envelope"></i>By Email</a>
		</li>
	`),
	
	events: {

		// share with connections
		//
		'click .share-with-connections': 'onClickShareWithConnections',
		'click .share-by-post': 'onClickShareByPost',
		'click .share-by-message': 'onClickShareByMessage',

		// share with anyone
		//
		'click .share-by-link': 'onClickShareByLink',
		'click .share-by-email': 'onClickShareByEmail'
	},
	
	//
	// querying methods
	//

	enabled: function() {
		let hasSelectedItems = this.parent.app.hasSelectedItems();
		let hasSelectedPhotos = this.parent.app.hasSelectedLayerItems('photos');
		let hasSelectedVideos = this.parent.app.hasSelectedLayerItems('videos');
		let hasSelected = hasSelectedItems || hasSelectedPhotos || hasSelectedVideos;
		let isSaved = this.parent.app.hasActiveModel() && this.parent.app.getActiveModel().isSaved();
		let hasShareable = hasSelected || isSaved;

		return {
			'share-with-connections': hasShareable,
			'share-by-post': hasShareable,
			'share-by-message': hasShareable,

			// share with anyone
			//
			'share-by-link': hasShareable,
			'share-by-email': hasShareable		
		};
	},

	//
	// mouse event handling methods
	//

	onClickShareWithConnections: function() {
		this.parent.app.shareWithConnections();
	},

	onClickShareByPost: function() {
		this.parent.app.shareByPost();
	},

	onClickShareByMessage: function() {
		this.parent.app.shareByMessage();
	},

	onClickShareByLink: function() {
		this.parent.app.shareByLink();
	},

	onClickShareByEmail: function() {
		this.parent.app.shareByEmail();
	}
});