<?php
/******************************************************************************\
|                                                                              |
|                              TarArchiveFile.php                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a storage system file.                        |
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

use App\Models\Files\File;
use App\Models\Files\Directory;
use App\Utilities\Strings\StringUtils;

class TarArchiveFile extends File
{
	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [

		// address
		//
		'path',

		// metadata
		//
		'size', 
		'place',

		// access control
		//
		'permissions',

		// sharing
		//
		'link_id',
		'share_id',
		'owner',
		'num_shares',
		'num_links',

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
		'size',
		'place',

		// access control
		//
		'permissions',

		// sharing
		//
		'owner',
		'num_shares',
		'num_links',

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
	
	//
	// querying methods
	//

	/**
	 * Get this tar archive's contents.
	 *
	 * @param string $dirname - the directory path to include.
	 * @param string $include - the file name prefix to require.
	 * @param string $exclude - the file name prefix to exclude.
	 * @return array
	 */
	public function getContents($dirname = null, $include = null, $exclude = null, $recursive = false): array {
		$contents = [];

		// get file names
		//
		$path = $this->rootPath();
		if (StringUtils::endsWith($path, 'gz')) {
			$script = 'tar -ztf ' . $path;
		} else {
			$script = 'tar -tf ' . $path;
		}
		$names = [];
		exec($script, $names);

		// get root directory name
		//
		if (!$dirname) {
			$dirname = '.';
		}

		// get contents from zip archive
		//
		for ($i = 0; $i < count($names); $i++) {
			$name = $names[$i];

			// find if item is in the target path
			//
			if (dirname($name) == $dirname || 
				dirname($name) . '/' == $dirname || 
				($recursive && ($dirname == '.' || StringUtils::startsWith(dirname($name) . '/', $dirname)))) {

				// find if item is included by filter
				//
				if ($include == null || $include == basename($name)) {

					// find if item is not excluded by filter
					//
					if ($exclude == null || !StringUtils::startsWith($name, $exclude)) {
						if (self::isFileName($name)) {
							array_push($contents, [
								'path' => $name
							]);
						} else {
							array_push($contents, [
								'path' => $name
							]);
						}
					}
				}
			}
		}

		return $contents;
	}

	//
	// methods
	//

	/**
	 * Extract this tar archive to the file system.
	 *
	 * @param string $dest - the destination to extract the archive to.
	 * @return bool
	 */
	public function extractTo(?string $dest = null): bool {
		$path = $this->rootPath();

		// set default destination
		//
		if (!$dest) {
			$dest = dirname($path);
		}

		// extract archive file
		//
		$command = 'tar -C ' . $dest . ' -xvf ' . $path;
		exec($command, $output, $error);

		// check return value
		//
		return !$error;
	}

	//
	// static methods
	//

	/**
	 * Find if a path belongs to a file.
	 *
	 * @param string $path - the file path to query.
	 * @return bool
	 */
	private static function isFileName(string $path): bool {
		return $path[strlen($path) - 1] != '/';
	}

	/**
	 * Find if a path belongs to a directory.
	 *
	 * @param string $path - the file path to query.
	 * @return bool
	 */
	private static function isDirectoryName(string $path): bool {
		return $path[strlen($path) - 1] == '/';
	}
}
