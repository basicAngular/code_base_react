<?php

namespace App\Http\Controllers;

use App\ShopItem;
use Illuminate\Http\Request;

class ShopItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ShopItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return ShopItem::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return ShopItem::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ShopItem  $shopItem
     * @return ShopItem
     */
    public function show(ShopItem $shopItem)
    {
        return $shopItem;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ShopItem  $shopItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShopItem $shopItem)
    {
        $shopItem->update($request->all());

        return $shopItem;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ShopItem  $shopItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShopItem $shopItem)
    {
        $shopItem->delete();
        return $shopItem;
    }
}
