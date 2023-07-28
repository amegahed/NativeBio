/******************************************************************************\
|                                                                              |
|                              window-bar-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view or adding window size controls to apps.           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2023, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import BaseView from '../../../../../views/base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	className: 'window-size toolbar visible-desktop-only',

	template: template(`
		<div class="shrink-window button btn-sm" data-toggle="tooltip" title="Shrink" data-placement="top"><i class="fa fa-minus"></i></div>
		<div class="grow-window button btn-sm" data-toggle="tooltip" title="Grow" data-placement="top"><i class="fa fa-plus"></i></div>
		<div class="expand-window button btn-sm" data-toggle="tooltip" title="Expand" data-placement="top"><i class="fa fa-expand"></i></div>`)
});