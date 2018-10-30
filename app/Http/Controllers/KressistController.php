<?php

namespace App\Http\Controllers;

use App\Kressist;
use App\Krempler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class KressistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        switch (Auth::user()->role) {
            case "admin":
                $kressist = Kressist::all();
                break;
            case "krempler":
                $kressist = Kressist::where("krempler_id", Auth::user()->id)->get();
                break;
            default:
                throw new AccessDeniedHttpException();
        }
        return response()->json($kressist);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $krempler = Krempler::findOrFail($request->get("krempler"));
        $kressist = (new Kressist())->fill($request->except(["krempler"]));
        $kressist->krempler()->associate($krempler);
        $kressist->password = bcrypt('test');
        $kressist->save();
        return response()->json($kressist);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Kressist::findOrFail($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $kressist = Kressist::findOrFail($id);
        $kressist = $kressist->fill($request->except(["krempler"]));
        $krempler = Krempler::findOrFail($request->get("krempler"));
        $kressist->krempler()->associate($krempler);
        $kressist->save();
        return response()->json($kressist);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(Kressist::findOrFail($id)->delete());
    }
}
