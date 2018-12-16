<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */




    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(){
        return Item::with('item')->get();

    }

}
