<?php

namespace App\Http\Controllers;

use App\Krempler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class KremplerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $krempler = Krempler::all();
        return response()->json($krempler);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $krempler = (new Krempler())->fill($request->all());
        $krempler->password = bcrypt('test');
        $number = Krempler::all()->max("number");
        if ($number == 0)
            $number = 1000;
        $krempler->number = $number + 1;
        $krempler->save();
        return response()->json($krempler);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Krempler::findOrFail($id);
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
        $krempler = Krempler::findOrFail($id);
        $krempler = $krempler->fill($request->all());
        $krempler->save();
        return response()->json($krempler);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(Krempler::findOrFail($id)->delete());
    }
}
