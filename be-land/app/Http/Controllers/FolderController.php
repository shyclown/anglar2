<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    /* Show users folders */

    public function all(){

    }
}