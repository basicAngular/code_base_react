<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function show() {
        return response()->json(Auth::user());
    }

    public function update(Request $request) {
        $user = Auth::user();
        $user->update($request->only([
            'last_name',
            'first_name',
            'email',
            'gender',
            'birthday',
            'street',
            'postal_code',
            'city',
            'phone',
            'account_holder',
            'account_iban',
            'account_bic',
        ]));
        return response()->json($user);
    }

    public function changePassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'oldPassword' => [
                'required',
                function($attribute, $value, $fail) {
                    if (!Hash::check($value, auth()->user()->password)) {
                        return $fail($attribute.' is not correct.');
                    }
                }],
           'newPassword' => 'required|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $newPassword = $request->get("newPassword");

        $user = auth()->user();
        $user->password = bcrypt($newPassword);
        //dd($user->password);
        $user->save();

        return response()->json();
    }
}
