<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Document;
use App\Krempler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class CustomerController extends Controller
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
                $customers = Customer::all();
                break;
            case "kressist":
                $customers = Customer::where("krempler_id", Auth::user()->krempler_id)->get();
                break;
            case "krempler":
                $customers = Customer::where("krempler_id", Auth::user()->id)->get();
                break;
            default:
                throw new AccessDeniedHttpException();
        }
        foreach ($customers as &$customer) {
            $customer->has_locker_documents = Document::where("customer_id", $customer->id)->where("is_locker", true)->count() > 0;
        }
        return response()->json($customers);
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
        $customer = (new Customer())->fill($request->except(["krempler"]));
        $customer->krempler()->associate($krempler);
        $number = Customer::where("krempler_id", $krempler->id)->max("number");
        if ($number == 0)
            $number = $krempler->number."1000";
        $customer->number = $number + 1;
        $customer->password = bcrypt('test');
        $customer->save();
        return response()->json($customer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Customer::findOrFail($id);
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
        $customer = Customer::findOrFail($id);
        $customer = $customer->fill($request->except(["krempler"]));
        $krempler = Krempler::findOrFail($request->get("krempler"));
        $customer->krempler()->associate($krempler);
        $customer->save();
        return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json(Customer::findOrFail($id)->delete());
    }
}
