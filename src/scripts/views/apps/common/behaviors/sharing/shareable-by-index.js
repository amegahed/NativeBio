/******************************************************************************\
|                                                                              |
|                             shareable-by-index.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a behavior that allows sharing by link.                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import File from '../../../../../models/storage/files/file.js';
import Items from '../../../../../collections/storage/items.js';
import Directory from '../../../../../models/storage/directories/directory.js';
import ProgressDialogView from '../../../../../views/dialogs/monitoring/progress-dialog-view.js';
import FileIndex from '../../../../../utilities/files/file-index.js';

export default {

	//
	// sharing methods
	//

	shareItemByIndex: function(item, options) {

		// check if item can be shared
		//
		/*
		if (!this.checkItemShareable(item)) {
			return;
		}
		*/

		// share item by index
		//
		if (item instanceof File) {
			this.showShareFileByIndexDialog(item, options);
		} else if (item instanceof Directory) {
			this.showShareDirectoryByIndexDialog(item, options);
		}
	},

	shareSelectedByIndex: function(options) {
		this.shareItemByIndex(this.getSelectedModels()[0], _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));
	},

	shareModelByIndex: function(options) {
		this.shareItemByIndex(this.getModel? this.getModel() : this.model, _.extend({}, options, {
			message: config.apps.file_browser.share_invitation_message
		}));
	},

	shareByIndex: function(options) {
		if (this.hasSelected()) {
			this.shareSelectedByIndex(options);
		} else {
			this.shareModelByIndex(options);
		}
	},

	shareFileByIndex: function(file, options) {
		FileIndex.add(file, {

			// callbacks
			//
			success: (attributes) => {

				// update view
				//
				file.set('index_id', attributes.id);

				// perform callback
				//
				if (options && options.success) {
					options.success(file);
				}
			}
		});
	},

	shareDirectoryByIndex: function(directory, options) {
		let cancelled = false;

		directory.fetchIndexableFiles({
			recursive: true,

			// callbacks
			//
			success: (data) => {
				let items = new Items(data);
				let count = 0;
				let progressBar = this.showProgressBar({
					cancelable: true,

					// callbacks
					//
					cancel: function() {
						cancelled = true;
					}
				});

				for (let i = 0; i < items.length; i++) {
					let file = items.at(i);
					if (cancelled) {
						return;
					}
					this.shareFileByIndex(file, {

						// callbacks
						//
						success: () => {
							count++;

							// update progress bar
							//
							if (progressBar) {
								progressBar.setPercent(count / items.length * 100);
							}

							// check if done
							//
							if (count == items.length) {

								// close progress bar, if it exists
								//
								if (progressBar) {
									progressBar.close();
								}

								// update view
								//
								directory.set('num_indices', items.length);

								// perform callback
								//
								if (options.success) {
									options.success();
								}
							}
						},

						error: () => {
							count++;

							// update progress bar
							//
							if (progressBar) {
								progressBar.setPercent(count / items.length * 100);
							}

							// check if done
							//
							if (count == items.length) {

								// close progress bar, if it exists
								//
								if (progressBar) {
									progressBar.close();
								}

								// update view
								//
								directory.set('num_indices', items.length);

								// perform callback
								//
								if (options.success) {
									options.success();
								}
							}
						}
					});
				}
			}
		});
	},

	//
	// dialog rendering methods
	//

	showProgressBar: function(options) {
		return application.show(new ProgressDialogView(_.extend({
			icon: '<i class="fa fa-list"></i>',
			title: "Indexing Files",
			message: "Indexed",
			percent: 0
		}, options)));
	},

	showShareFileByIndexDialog: function(file) {
		application.confirm({
			icon: '<i class="fa fa fa-plus"></i>',
			title: "Add To Search Index",
			message: "Would you like to add the file " + '"' + file.getName() + '"' + " to the search index?",

			// callbacks
			//
			accept: () => {
				this.shareFileByIndex(file, {

					// callbacks
					//
					success: () => {

						// play add sound
						//
						application.play('add');
					}
				});
			}
		});
	},

	showShareDirectoryByIndexDialog: function(item) {
		item.fetchNumIndexableFiles({
			recursive: true,

			// callbacks
			//
			success: (num) => {
				if (num > 0) {
					application.confirm({
						message: "The directory " + '"' + item.getName() + '"' + " contains " + num + " unindexed searchable " + (num == 1? "file" : "files") + ".  Would you like to add " + (num == 1? "it" : "them") + " to the search index?",

						// callbacks
						//
						accept: () => {
							this.shareDirectoryByIndex(item, {

								// callbacks
								//
								success: () => {

									// play add sound
									//
									application.play('add');
								}
							});
						}
					});
				} else if (item.has('index')) {

					// show notification
					//
					application.notify({
						message: "The file " + '"' + item.getName() + '"' + " has already been added to the search index."
					});
				} else if (item.get('num_indices') > 0) {

					// show notification
					//
					application.notify({
						message: "All searchable files in " + '"' + item.getName() + '"' + " have already been added to the search index."
					});
				} else {

					// show notification
					//
					application.notify({
						message: "Found no searchable files in " + '"' + item.getName() + '"' + " to add to the search index."
					});
				}
			}
		});
	}
};