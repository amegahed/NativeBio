/******************************************************************************\
|                                                                              |
|                              post-info-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for viewing a post's information.                 |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Directory from '../../../../models/files/directory.js';
import File from '../../../../models/files/file.js';
import UserPreferences from '../../../../models/preferences/user-preferences.js';
import Posts from '../../../../collections/topics/posts.js';
import BaseView from '../../../../views/base-view.js';
import Openable from '../../../../views/apps/common/behaviors/launching/openable.js';
import PostsListView from '../../../../views/apps/topic-viewer/mainbar/topics/posts/posts-list-view.js';

export default BaseView.extend(_.extend({}, Openable, {


	//
	// attributes
	//

	template: template(`
		<h1><i class="fa fa-newspaper"></i>Post</h1>
		
		<div class="content"></div>
	`),

	regions: {
		content: '.content'
	},

	//
	// constructor
	//

	initialize: function() {
		this.preferences = UserPreferences.create(config.apps.topic_viewer.preferences);
	},

	//
	// rendering methods
	//

	onRender: function() {
		/*
		if (application.isSignedIn()) {
			this.showPost();
		} else {
			application.signIn(() => this.showPost());
		}
		*/
		this.showContent();
	},

	showPost: function() {
		this.preferences.fetch({

			// callbacks
			//
			success: () => {

				// fetch user profile
				//
				this.model.fetch({

					// callbacks
					//
					success: () => {

						// show child views
						//
						this.showContent();
					},

					error: (model, response) => {

						// show error message
						//
						application.error({
							message: "Could not find post.",
							response: response
						});
					}
				});
			},

			error: (model, response) => {

				// show error message
				//
				application.error({
					message: "Could not find preferences.",
					response: response
				});
			}
		});
	},

	showContent: function() {
		this.showChildView('content', new PostsListView({
			collection: new Posts([this.model]),

			// options
			//
			preferences: this.preferences,
			collapsed: false,

			// capabilities
			//
			editable: application.isSignedIn(),

			// callbacks
			//
			onopen: (item) => {
				this.onOpen(item);
			}
		}));
	},

	//
	// file event handling methods
	//

	onOpen: function(item) {
		if (item.model instanceof Directory) {
			this.openDirectory(item.model);
		} else if (item.model instanceof File) {
			this.openFile(item.model);
		}
	}
}));