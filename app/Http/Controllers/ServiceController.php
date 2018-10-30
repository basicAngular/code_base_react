<?php

namespace App\Http\Controllers;

use App\Service;
use App\ShopItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ShopItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        //return "hi";
        if (Auth::user()->role !== "customer") {
            abort(403, 'Unauthorized action.');
        }
        return Service::where("customer_id", Auth::user()->id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userData = $request->all();
        $userData["customer_id"] = Auth::user()->id;
        return Service::create($userData);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Service  $service
     * @return ShopItem
     */
    public function show(Service $service)
    {
        return $service;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        $service->update($request->all());

        return $service;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        $service->delete();
        return $service;
    }
}
