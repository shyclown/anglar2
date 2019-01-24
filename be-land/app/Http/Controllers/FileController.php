<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Folder;

class FileController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function upload(Request $request){
        $file = $request->file;

        $path = Storage::putFile('avatars', $request->file('file'));
    }



}