<?php
/******************************************************************************\
|                                                                              |
|                                   Item.php                                   |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract superclass for file system files and         |
|        directories.                                                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\Files;

use App\Models\Files\BaseItem;
use App\Models\Files\Traits\Linkable;
use App\Models\Files\Traits\Shareable;

class Item extends BaseItem
{
	use Linkable, Shareable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [

		// address
		//
		'path',
		'volume',

		// metadata
		//
		'place',

		// sharing
		//
		'link_id',
		'share_id'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [

		// address
		//
		'path',
		'volume',

		// metadata
		//
		'place',

		// access control
		//
		'permissions',

		// sharing
		//
		'link_id',
		'share_id',

		// timestamps
		//
		'created_at',
		'modified_at',
		'accessed_at'
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [

		// metadata
		//
		'place',

		// access control
		//
		'permissions',

		// timestamps
		//
		'created_at',
		'modified_at',
		'accessed_at'
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'num_shares' => 'integer',
		'num_links' => 'integer',
	];
}