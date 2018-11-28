<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Validator;


class UserController extends Controller{

    public $successStatus = 200;

    /*  Login API
    *   @return \Illuminate\Http\Response
    */
    public function login(Request $request){
        if (
            Auth::attempt([
            'email'=> request('email'),
            'password'=> request('password')
        ], true
        )){
            $user = Auth::user();
            $user['token'] = $user->createToken('MyApp')->accessToken;

            $request->session()->regenerate();

            return response()->json( $user, $this->successStatus );
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->regenerate();
    }

    /*  Register API
    *   @return \Illuminate\Http\Response
    */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
        return response()->json(['success'=>$success], $this->successStatus);
    }

    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }
}