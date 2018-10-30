<?php

namespace App\Http\Controllers;

use App\Vaccination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VaccinationStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return DB::table('vaccinations')
            ->select('vaccinations.id', 'vaccinations.title', 'vaccinations.interval', 'vaccinations.priority', 'vaccination_status.vaccinated_on')
            ->leftJoin('vaccination_status', 'vaccinations.id', '=', 'vaccination_status.vaccination_id')
            ->where('vaccination_status.user_id', Auth::user()->id)
            ->orWhere('vaccination_status.user_id', null)
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Vaccination::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vaccination  $vaccination
     * @return \Illuminate\Http\Response
     */
    public function show(Vaccination $vaccination)
    {
        return $vaccination;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vaccination  $vaccination
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $vaccination = Vaccination::findOrFail($request->get('id'));
        $vaccination->users()->syncWithoutDetaching([Auth::user()->id => ["vaccinated_on" => $request->get('vaccinated_on')]]);

        return  response()->json(DB::table('vaccinations')
        ->select('vaccinations.id', 'vaccinations.title', 'vaccinations.interval', 'vaccinations.priority', 'vaccination_status.vaccinated_on')
        ->leftJoin('vaccination_status', 'vaccinations.id', '=', 'vaccination_status.vaccination_id')
        ->where('vaccination_status.user_id', Auth::user()->id)
        ->where('vaccinations.id', $vaccination->id)
        ->first());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vaccination $vaccination
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaccination $vaccination)
    {
        $vaccination->delete();
        return $vaccination;
    }
}
