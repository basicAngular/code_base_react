<?php

namespace App\Http\Controllers;

use App\Scheduler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

class SchedulerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ShopItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        if (Auth::user()->role !== "customer") {
            abort(403, 'Unauthorized action.');
        }
        return Scheduler::where("customer_id", Auth::user()->id)->get();
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
        $userId = Auth::user()->id;
        $userData['customer_id']=$userId;
        return Scheduler::create($userData);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Scheduler  $scheduler
     */
    public function show(Scheduler $scheduler)
    {
        return $scheduler;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Scheduler  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Scheduler $scheduler)
    {
        $scheduler->update($request->all());
        return $scheduler;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Scheduler  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Scheduler $scheduler)
    {
        $scheduler->delete();
        return $scheduler;
    }
}
