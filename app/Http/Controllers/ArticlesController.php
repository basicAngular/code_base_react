<?php

namespace App\Http\Controllers;

use App\Articles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ShopItem[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $userRole = Auth::user()->role;
        return Articles::where("consumer_role", $userRole)->get();
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
        $userData['title']= $request->title;
        $userData['creation_date']= $request->creation_date;
        $userData['content']= $request->content;
        $userData['consumer_role']= $request->consumer_role;
        return Articles::create($userData);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Articles  $article
     */
    public function show(Articles $article)
    {
        return $article;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Articles $article)
    {
        $article->update($request->all());
        return $article;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Articles  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Articles $article)
    {
        $article->delete();
        return $article;
    }
}
