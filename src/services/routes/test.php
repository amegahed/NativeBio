<?php

use Illuminate\Http\Request;
use App\Utilities\Mapping\SRTMGeoTIFFReader;
use Intervention\Image\Image;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('environment', function() {
	return App::environment();
});

Route::get('test', function() {
	$dirname = '/Users/tribble/Sites/user-data/amegahed';
	$filename = 'MTE_AOI_epsg26916_Final_Classification_Map.tif';
	// $filename = 'Pictures/Boeing 747.jpeg';

	// create image from data
	//
	$image = \Image::make($dirname . '/' . $filename);

	// extract exif data from image
	//
	return $image->exif();

	// return exif_read_data($dirname . '/' . $filename);
	/*
	$reader = new SRTMGeoTIFFReader($dirname);
	// return exif_read_data($dirname . '/' . $filename);
	return $reader->checkSRTMfile($filename);
	*/
});