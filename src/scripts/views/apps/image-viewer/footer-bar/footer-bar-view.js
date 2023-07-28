/******************************************************************************\
|                                                                              |
|                              footer-bar-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used to display an app's footer bar.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FooterBarView from '../../../../views/apps/common/footer-bar/footer-bar-view.js';
import NavBarView from '../../../../views/apps/image-viewer/footer-bar/nav-bar/nav-bar-view.js';
import StatusBarView from '../../../../views/apps/image-viewer/footer-bar/status-bar/status-bar-view.js';

export default FooterBarView.extend({

	//
	// attributes
	//

	toolbars: ['window', 'nav', 'status'],

	//
	// getting methods
	//

	getNavBarView: function() {
		return new NavBarView({
			imageNumber: this.collection? this.collection.indexOf(this.model) + 1 : undefined,
			numImages: 	this.collection? this.collection.length : undefined
		});
	},

	getStatusBarView: function() {
		return new StatusBarView();
	}
});