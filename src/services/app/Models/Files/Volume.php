<?php
/******************************************************************************\
|                                                                              |
|                                  Volume.php                                  |
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

use Illuminate\Filesystem\FilesystemAdapter;
use League\Flysystem\Filesystem;
use App\Models\Files\File;
use App\Models\Files\Traits\ItemContainable;
use App\Utilities\Strings\StringUtils;

// ftp adapters
//
use League\Flysystem\Ftp\FtpAdapter;
use League\Flysystem\Ftp\FtpConnectionOptions;

// sftp adapters
//
use League\Flysystem\PhpseclibV3\SftpAdapter;
use League\Flysystem\PhpseclibV3\SftpConnectionProvider;
use League\Flysystem\UnixVisibility\PortableVisibilityConverter;

// s3 adapters
//
use Aws\S3\S3Client as S3Client;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter as S3Adapter;

// dropbox adapters
//
use Spatie\Dropbox\Client as DropboxClient;
use Spatie\FlysystemDropbox\DropboxAdapter;

// google adapters
//
use Google_Service_Drive as GoogleServiceDrive;
use \Google\Client as GoogleClient;
use \Masbug\Flysystem\GoogleDriveAdapter;

class Volume extends File
{
	use ItemContainable;

	//
	// constants
	//

	public const EXTENSIONS = [
		's3',
		'gdrv',
		'dpbx'
	];

	//
	// attributes
	//

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
		'num_files',
		'num_directories',
		'place',

		// access control
		//
		'permissions',

		// sharing
		//
		'link_id',
		'share_id',
		'owner',
		'num_links',
		'num_shares',
		
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
		'num_files',
		'num_directories',
		'place',

		// access control
		//
		'permissions',

		// sharing
		//
		'owner',
		'num_links',
		'num_shares',

		// timestamps
		//
		'created_at',
		'modified_at',
		'accessed_at'
	];

	//
	// counts accessor methods
	//

	/**
	 * Get this directory's files count attribute.
	 *
	 * @return int
	 */
	public function getNumFilesAttribute(): array {
		return [
			'all' => null,
			'audio' => null,
			'image' => null,
			'video' => null,
			'hidden' => null
		];
	}

	/**
	 * Get this directory's directories count attribute.
	 *
	 * @return int
	 */
	public function getNumDirectoriesAttribute(): array {
		return [
			'all' => null,
			'hidden' => null
		];
	}

	//
	// file system driver methods
	//

	/**
	 * Get an FTP file system adapter
	 *
	 * @return bool
	 */
	public function getFtpAdapter($volumeData) {
		return new FtpAdapter(FtpConnectionOptions::fromArray([
			'host' => $volumeData['host'], 				// required
			'root' => $volumeData['root'], 				// required
			'username' => $volumeData['username'], 		// required
			'password' => $volumeData['password'], 		// required
			'port' => 21,
			'ssl' => false,
			'timeout' => 90,
			'utf8' => false,
			'passive' => true,
			'transferMode' => FTP_BINARY,
			'systemType' => null, 						// 'windows' or 'unix'
			'ignorePassiveAddress' => null, 			// true or false
			'timestampsOnUnixListingsEnabled' => false, // true or false
			'recurseManually' => true 					// true 
			])
		);
	}

	/**
	 * Get an SFTP file system adapter
	 *
	 * @return bool
	 */
	public function getSftpAdapter($volumeData) {
		return new SftpAdapter(
			new SftpConnectionProvider(
				$volumeData['host'],
				$volumeData['username'],
				$volumeData['password'], 			
				null, 
				null, 
				$volumeData['port'], 
				false, 
				60, 
				10, 
				null, 
				null,
			),
			$volumeData['root'],
			PortableVisibilityConverter::fromArray([
				'file' => [
					'public' => 0777,
					'private' => 0755,
				],
				'dir' => [
					'public' => 0777,
					'private' => 0755,
				],
			])
		);
	}

	/**
	 * Get an S3 file system adapter
	 *
	 * @return bool
	 */
	public function getS3Adapter($volumeData) {
		$config = [
			'version' => 'latest',
			'region' => $volumeData['region'],
			'credentials' => [
				'key' => $volumeData['key'],
				'secret' => $volumeData['secret']
			]
		];

		// create client
		//
		$client = S3Client::factory($config);

		return new S3Adapter($client, $volumeData['bucket']);
	}

	/**
	 * Get a Dropbox file system adapter
	 *
	 * @return bool
	 */
	public function getDropboxAdapter($volumeData) {

		// create Dropbox Client
		//
		$client = new DropboxClient($volumeData['access_token']);

		// create Dropbox Driver
		//
		return new DropboxAdapter($client);
	}

	/**
	 * Get storage from a volume path.
	 *
	 * @return Illuminate\Filesystem\FilesystemAdapter
	 */
	public function getStorage() {

		// check cached results
		//
		if (array_key_exists($this->path, self::$storage)) {
			return self::$storage[$this->path];
		}

		// read and parse volume data
		//
		$file = new File([
			'path' => $this->path,
			'link_id' => $this->link_id
		]);
		$volumeData = (array)json_decode($file->readContents());

		if (!$this->link_id) {
			$extension = $this->getExtension();
		} else {
			$linkPath = $file->link->path;
			$extension = pathinfo($linkPath, PATHINFO_EXTENSION);
		}

		// create new client
		//
		switch ($extension) {
			case 'ftp':
				$adapter = $this->getFtpAdapter($volumeData);
				break;
			case 'sftp':
				$adapter = $this->getSftpAdapter($volumeData);
				break;
			case 's3':
				$adapter = $this->getS3Adapter($volumeData);
				break;
			case 'dpbx':
				$adapter = $this->getDropboxAdapter($volumeData);
				break;
			default:
				$adapter = null;
		}
		if ($adapter) {
			$filesystem = new Filesystem($adapter, ['case_sensitive' => true]);
			$storage = new FilesystemAdapter($filesystem, $adapter);
		} else {
			$storage = null;
		}

		// save storage for later
		//
		self::$storage[$this->path] = $storage;

		// create new file system and adapter
		//
		return $storage;
	}

	/**
	 * Get the paths of files contained in this directory.
	 *
	 * @param bool $recursive - whether or not to include subdirectories.
	 * @return string[]
	 */
	public function getFilePaths(bool $recursive = false, $filter = null): array {
		$paths = [];

		// get cached value
		//
		if ($recursive) {
			if ($this->allFilePaths) {
				$paths = $this->allFilePaths;
			}
		} else {
			if ($this->filePaths) {
				$paths = $this->filePaths;
			}		
		}

		// get items relative to path
		//
		if (!$paths) {
			if ($recursive) {
				$paths = $this->getStorage()->allFiles('');
			} else {
				$paths = $this->getStorage()->files('');
			}

			// cache value
			//
			if ($recursive) {
				$this->allFilePaths = $paths;
			} else {
				$this->filePaths = $paths;
			}
		}

		// filter paths
		//
		if ($filter) {
			$paths = $this->filterPaths($paths, $filter);
		}

		return $paths;
	}

	/**
	 * Get the paths of directories contained in this directory.
	 *
	 * @param bool $recursive - whether or not to include subdirectories.
	 * @return string[]
	 */
	public function getDirectoryPaths(bool $recursive = false, $filter = null): array {
		$paths = [];

		// get cached value
		//
		if ($recursive) {
			if ($this->allDirectoryPaths) {
				$paths = $this->allDirectoryPaths;
			}
		} else {
			if ($this->directoryPaths) {
				$paths = $this->directoryPaths;
			}		
		}

		// get items relative to path
		//
		if (!$paths) {
			if ($recursive) {
				$paths = $this->getStorage()->allDirectories('');
			} else {
				$paths = $this->getStorage()->directories('');
			}

			// cache value
			//
			if ($recursive) {
				$this->allDirectoryPaths = $paths;
			} else {
				$this->directoryPaths = $paths;
			}
		}

		// filter paths
		//
		if ($filter) {
			$paths = $this->filterPaths($paths, $filter);
		}

		return $paths;
	}

	//
	// static methods
	//

	/**
	 * Check if a path is valid for volumes.
	 *
	 * @param string $path - the video file path to query.
	 * @return bool
	 */
	static public function isValidPath(?string $path): bool {
		$extension = pathinfo($path, PATHINFO_EXTENSION);
		return in_array(strtolower($extension), self::EXTENSIONS);
	}
}
