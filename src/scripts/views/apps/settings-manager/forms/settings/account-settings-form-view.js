/******************************************************************************\
|                                                                              |
|                          account-settings-form-view.js                       |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing an account settings form.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../views/forms/form-view.js';
import UserAccountView from '../../../../../views/users/accounts/user-account-view.js';
import UserAccountHistoryView from '../../../../../views/users/accounts/user-account-history-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="settings icon-grid">
			<div class="item">
				<div class="row">
					<div class="icon colored grey">
						<img src="images/icons/settings/account.svg" />
						<i class="fa fa-key"></i>
					</div>
				</div>
				<div class="row">
					<div class="name">Account</div>
				</div>
			</div>
		</div>
		
		<h3><i class="fa fa-key"></i>Account Info</h3>
		<p>The following is your account information which you entered when you initially created or previously edited your account.</p>
		
		<div class="account well">
			<div style="text-align:center">
				<i class="fa fa-spinner spinning" style="margin-right: 5px"></i>
				<span>Loading...</span>
			</div>
		</div>
		
		<div class="buttons" style="text-align:center">
			<button class="edit-account btn btn-primary">
				<i class="fa fa-pencil-alt"></i>Edit Account
			</button>
			<button class="change-password btn">
				<i class="fa fa-key"></i>Change Password
			</button>
		</div>
		
		<h3><i class="fa fa-calendar"></i>Account History</h3>
		<p>The following is a history of your account.</p>
		
		<div class="account-history well">
			<div style="text-align:center">
				<i class="fa fa-spinner spinning" style="margin-right: 5px"></i>
				<span>Loading...</span>
			</div>
		</div>
		
		<h3><i class="fa fa-trash-alt"></i>Delete Account</h3>
		<p>Note: This will permanantly delete your account, your files and all of your data.   See our <a href="#policies/user-data-policy">User Data Policy</a> for details. </p>
		
		<div class="well buttons" style="text-align:center">
			<button class="delete-account btn colored red" style="margin:0">
				<i class="fa fa-trash-alt"></i>Delete Account
			</button>
		</div>
	`),

	events: {
		'click .edit-account': 'onClickEditAccount',
		'click .change-password': 'onClickChangePassword',
		'click .delete-account': 'onClickDeleteAccount',
		'click a': 'onClickLink'
	},

	regions: {
		'account': '.account',
		'history': '.account-history'
	},

	//
	// deleting methods
	//

	destroyAccount: function() {

		// delete user
		//
		application.session.user.destroy({

			// callbacks
			//
			success: () => {
				application.session.user = null;
				
				// show notification
				//
				application.notify({
					icon: '<i class="fa fa-trash-alt"></i>',
					title: "Account Deleted",
					message: "Your user account has been successfuly deleted.",

					// callbacks
					//
					accept: () => application.logout()
				});
			},

			error: (model, response) => {

				// show error message
				//
				application.error({
					message: "Could not delete your user account.",
					response: response
				});
			}
		});
	},

	deleteAccount: function(options) {

		// check if we need to confirm
		//
		if (!options || options.confirm != false) {

			// confirm delete
			//
			application.confirm({
				icon: '<i class="fa fa-trash-alt"></i>',
				title: "Delete My Account",
				message: "Are you sure that you want to delete your user account? " +
					"When you delete an account, all of your user data will be deleted.",

				// callbacks
				//
				accept: () => {
					this.deleteAccount({
						confirm: false
					});
				}
			});
		} else {

			// delete account
			//
			this.destroyAccount();
		}
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show child views
		//
		this.showUserAccount();
		this.showUserAccountHistory();
	},

	showUserAccount: function() {
		this.showChildView('account', new UserAccountView({
			model: this.model
		}));
	},

	showUserAccountHistory: function() {
		this.showChildView('history', new UserAccountHistoryView({
			model: this.model
		}));
	},

	//
	// dialog rendering methods
	//

	showEditAccountDialog: function() {
		import(
			'../../../../../views/users/accounts/dialogs/edit-user-account-dialog-view.js'
		).then((EditUserAccountDialogView) => {
			
			// show edit user account dialog
			//
			application.show(new EditUserAccountDialogView.default({
				model: this.model
			}));
		});
	},

	showChangePasswordDialog: function() {
		import(
			'../../../../../views/users/accounts/dialogs/change-password-dialog-view.js'
		).then((ChangePasswordDialogView) => {
			
			// show change password dialog
			//
			application.show(new ChangePasswordDialogView.default({
				model: this.model
			}));
		});
	},

	//
	// mouse event handling methods
	//

	onClickEditAccount: function() {
		this.showEditAccountDialog();
	},

	onClickChangePassword: function() {
		this.showChangePasswordDialog();
	},

	onClickDeleteAccount: function() {
		this.deleteAccount();
	},

	onClickLink: function(event) {
		application.showUrl(event.target.href);

		// block event from parent
		//
		this.block(event);
	}
});
