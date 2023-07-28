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
import AddressBarView from '../../../../views/apps/file-browser/footer-bar/address-bar/address-bar-view.js';
import StatusBarView from '../../../../views/apps/file-browser/footer-bar/status-bar/status-bar-view.js';

export default FooterBarView.extend({

	//
	// attributes
	//

	toolbars: ['window', 'address', 'status'],

	//
	// getting methods
	//

	getStatusBarView: function() {
		return new StatusBarView();
	},

	//
	// rendering methods
	//

	showToolbar: function(kind) {
		switch (kind) {
			case 'window':
				this.showWindowBar();
				break;
			case 'address':
				this.showAddressBar();
				break;
			case 'status':
				this.showStatusBar();
				break;
		}
	},

	showAddressBar: function() {
		this.showChildView('address', new AddressBarView({
			model: this.app.model,

			// callbacks
			//
			onclick: (path) => {
				this.parent.setDirectory(application.getDirectory(path));
			}
		}));
	},

	showStatusBar: function() {
		this.showChildView('status', this.getStatusBarView());
	}
});