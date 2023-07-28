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
		return application.session.user && this.parent.app.model != undefined && 
			this.parent.app.model.isSaved() && !this.parent.app.model.hasBeenShared();
	},

	//
	// mouse event handling methods
	//

	onClickShareWithConnections: function() {
		this.parent.app.shareModelWithConnections();
	},

	onClickShareByPost: function() {
		this.parent.app.shareModelByPost();
	},
	
	onClickShareByMessage: function() {
		this.parent.app.shareModelByMessage();
	},

	onClickShareByLink: function() {
		this.parent.app.shareModelByLink();
	},

	onClickShareByEmail: function() {
		this.parent.app.shareModelByEmail();
	}
});