<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (Auth::user()->role == "customer") {
            $documents = Document::where("customer_id", Auth::user()->id)->where("is_locker", false);
        } else {
            if ($request->get("query"))
                return $this->search($request);
            $documents = Document::where("customer_id", $request->get("customer_id"));
        }

        if ($nameLike = $request->get('name_like')) {
            $documents = $documents->andWhere('name', 'like', $nameLike);
        }

        if ($folder = $request->get('folderId')) {
            $documents = $documents->andWhere('folder_id', $folder);
        }

        $documents = $documents->orderBy("name")->get();

        return response()->json($documents);
    }

    public function search(Request $request)
    {
        $query = $request->get("query");
        $ors = explode(" ", $query);
        for ($i = 0; $i < count($ors); $i++) {
            if ($i == 0) {
                $query = Document::where("tags", "like", "%".$ors[$i]."%")->orWhere("company", "like", "%".$ors[$i]."%");
            } else {
                $query->orWhere("tags", "like", "%".$ors[$i]."%")->orWhere("company", "like", "%".$ors[$i]."%");
            }
        }
        $documents = $query->orderBy("name")->get();
        return response()->json($documents);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->file('file')) {
            return $this->upload($request);
        } else {
            return response()->json("done");
        }
    }

    public function upload(Request $request) {

       $document = new Document();

        if (Auth::user()->role == "customer") {
            $customer = Auth::user();
            $customer_id=Auth::user()->id;
            $document->is_locker = true;
            $document->customer()->associate($customer);
        }else {
            $document->is_locker = false;
        }   
            $file=$request->file('file');
            $filename = $request->file("file")->getClientOriginalName();
            $tempFilename = time().'.'.$request->file("file")->getClientOriginalExtension();
            $destinationPath = base_path('public/documents/');
            $newFile=file_get_contents($file);
            $success = file_put_contents($destinationPath.$tempFilename, $newFile);
            $pathh = $request->file('file')->store(
                'documents/'.$filename
            );
            $document->path ='/documents/'.$tempFilename;
            $document->name = $filename;
            $document->author = "";
            $document->tags = "";
            $document->size = Storage::size($pathh);
            $date = new \DateTime();
            $date=$date->format('Y-m-d H:i:s');
            $document->date_relevance =$date;
            $document->mime_type = $request->file("file")->getClientMimeType();

            $document->extension = $request->file("file")->getClientOriginalExtension();
            $document->is_visible = false;
            $document->is_sos = false;
            $document->is_tax_relevant = false;
            $document->is_favorite = false;
            $document->is_encrypted = false;
            $document->is_machine_readable = false;
            
            $document->save();
            return response()->json($document);
        
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if ($request->get('content')) {
            return $this->receive($id);
        }
        $document = Document::findOrFail($id);
        return response()->json($document);
    }


    public function receive($id)
    {
        $document = Document::findOrFail($id);
        $path = $document->path;
        return response()->download(Storage::path($path), $document->name);
        $pdf = base64_encode(Storage::get($path));

        return response()->json([
            'content' => $pdf,
        ]);
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
        $document = Document::findOrFail($id);
        $document = $document->fill($request->except(["customer_id", "tags", "fileType", "folder" ]));
        if ($request->get("tags"))
            $document->tags = json_encode($request->get("tags"));
        $document->save();
        return response()->json($document);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   $document = Document::findOrFail($id);
        $document->delete();
    }

    public function getDocument()
    {
        return $users = Document::ofType('13')->get();
    }

}
