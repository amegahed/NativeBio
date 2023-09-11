/******************************************************************************\
|                                                                              |
|                               item-shareable.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a behavior for views that deal with sharable items       |
|        (files and directories).                                              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import Browser from '../../../../../utilities/web/browser.js';

export default {

	//
	// checking methods
	//

	checkItemShareable: function(item) {

		// check if item has been saved
		//
		if (item.isSaved && !item.isSaved()) {

			// show notification
			//
			application.notify({
				icon: '<i class="fa fa-share"></i>',
				title: 'Sharing Error',
				message: "You must save these items before they can be shared by invitation."
			});
			
			return false;

		// check if item is owned
		//
		} else if (item.isOwned && item.isOwned()) {

			// show notification
			//
			application.notify({
				icon: '<i class="fa fa-share"></i>',
				title: 'Sharing Error',
				message: "You must own items to be shared by invitation.  If you want to share an item has been shared with you, then you can make a copy of it to share. "
			});
			
			return false;				
		}

		return true;
	},

	//
	// item sharing methods
	//

	shareItemByInvitation: function(item, options) {

		// check if item can be shared
		//
		if (item && !this.checkItemShareable(item)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog([item], null, options);
		} else {
			this.showShareItemsDialog([item], null, options);
		}
	},

	shareItemWithConnections: function(item, connections, options) {

		// check if item can be shared
		//
		if (item && !this.checkItemShareable(item)) {
			return;
		}

		if (Browser.device == 'phone') {
			this.showShareItemsWithConnectionsDialog([item], connections, options);
		} else {
			this.showShareItemsDialog([item], connections, options);
		}
	},

	//
	// item post sharing methods
	//

	shareItemByPost: function(item) {
		import(
			'../../../../../views/apps/messenger/messenger-view.js'
		).then((MessengerView) => {

			// show default topic
			//
			application.showTopic(MessengerView.default.defaultTopic, {
				items: [item],
				message: config.apps.file_browser.share_invitation_message
			});
		});
	},

	//
	// item chat message sharing methods
	//

	shareItemByMessage: function(item) {
		import(
			'../../../../../collections/chats/chats.js'
		).then((Chats) => {
			new Chats.default().fetch({

				// callbacks
				//
				success: (collection)=> {
					if (collection.length > 0) {

						// show first chat
						//
						application.showChat(collection.at(0), {
							items: [item],
							message: config.apps.file_browser.share_invitation_message
						});
					} else {

						// show notify dialog
						//
						application.notify({
							message: "You have no current chats."
						});
					}
				}
			});
		});
	},

	//
	// item link sharing methods
	//

	shareItemByLink: function(item, options) {

		// check if item can be shared
		//
		if (!this.checkItemShareable(item)) {
			return;
		}

		// share item by link
		//
		if (item.get('num_links') > 0) {
			this.showShareByLinkDialog(item, options);
		} else {
			this.showNewLinkDialog(item, options);
		}
	},

	//
	// item email sharing methods
	//

	shareItemByEmail: function(item, options) {

		// check if item can be shared
		//
		if (!this.checkItemShareable(item)) {
			return;
		}

		this.showShareByEmailDialog(item, options);
	},

	//
	// dialog rendering methods
	//

	showShareItemsDialog: function(items, connections, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/share-requests/dialogs/share-items-dialog-view.js'
		).then((ShareItemsDialogView) => {

			// show share items dialog
			//
			this.show(new ShareItemsDialogView.default(_.extend({
				items: items,
				connections: connections,
				message: config.apps.file_browser.share_invitation_message
			}, options)));
		});
	},

	showShareItemsWithConnectionsDialog: function(items, connections, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/share-requests/dialogs/share-items-with-connections-dialog-view.js'
		).then((ShareItemsWithConnectionsDialogView) => {

			// show share items with connections dialog
			//
			this.show(new ShareItemsWithConnectionsDialogView.default(_.extend({
				items: items,
				connections: connections,
				message: config.apps.file_browser.share_invitation_message
			}, options)));
		});
	},

	showShareByLinkDialog: function(item, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/links/dialogs/share-by-link-dialog-view.js'
		).then((ShareByLinkDialogView) => {

			// show share by link dialog
			//
			this.show(new ShareByLinkDialogView.default(_.extend({
				model: item
			}, options)));
		});
	},

	showNewLinkDialog: function(item, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/links/dialogs/new-link-dialog-view.js'
		).then((NewLinkDialogView) => {

			// show new link dialog
			//
			this.show(new NewLinkDialogView.default(_.extend({
				target: item
			}, options)));
		});
	},

	showShareByEmailDialog: function(item, options) {
		import(
			'../../../../../views/apps/file-browser/sharing/mail/dialogs/share-by-email-dialog-view.js'
		).then((ShareByEmailDialogView) => {

			// show share by email dialog
			//
			this.show(new ShareByEmailDialogView.default(_.extend({
				model: item
			}, options)));
		});
	}
};