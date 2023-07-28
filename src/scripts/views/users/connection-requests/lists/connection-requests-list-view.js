/******************************************************************************\
|                                                                              |
|                       connection-requests-list-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a view for displaying a list of connection requests.          |
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
import CollectionView from '../../../../views/collections/collection-view.js';
import ConnectionRequestsListItemView from '../../../../views/users/connection-requests/lists/connection-requests-list-item-view.js';

export default CollectionView.extend({

	//
	// attributes
	//

	tagName: 'ul',
	className: 'connection-requests panels',

	// views
	//
	childView: ConnectionRequestsListItemView,
	emptyView: BaseView.extend({
		className: 'empty panel',
		template: template("No connection requests.")
	}),

	//
	// constructor
	//

	initialize: function() {

		// set optional parameter defaults
		//
		if (this.options.collapsed == undefined) {
			this.options.collapsed = true;
		}
	},

	//
	// rendering methods
	//

	onRender: function() {
		if (this.options.multicolumn) {
			this.$el.addClass('multi-column');
		}
	},
	
	childViewOptions: function() {
		return {
			collapsed: this.options.collapsed
		}; 
	}
});
