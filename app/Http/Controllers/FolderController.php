<?php

namespace App\Http\Controllers;

use App\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (Auth::user()->role == "customer") {
            $folders = Folder::where("customer_id", Auth::user()->id);
        } else {
            $folders = Folder::where("customer_id", $request->get("customer_id"));
        }

        if ($nameLike = $request->get('name_like')) {
            $folders = $folders->andWhere('name', 'like', $nameLike);
        }

        // $folders = $folders->orderBy("name")->get();
        $folders = $folders->get();
        return response()->json($folders);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Folder $folder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Folder $folder)
    {
        //
    }
}
