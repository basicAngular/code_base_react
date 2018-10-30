<?php

namespace App\Console\Commands;

use App\Customer;
use App\Document;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Routing\Exception\InvalidParameterException;

class ImportLegacyDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'legacy:import {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function findUser($userId) {
        return DB::connection('mysql_legacy')->table("user")->where('id', $userId)->first();
    }

    private function importUser($user) {
        $customer = Customer::where("email", $user->email)->first();
        if ($customer) return $customer;
        $customer = new Customer();
        $customer->first_name = $user->first_name;
        $customer->last_name = $user->last_name;
        $customer->password = Hash::make("test");
        $customer->email = $user->email;
        $customer->street = $user->street;
        $customer->city = $user->city;
        $customer->postal_code = $user->postalcode;
        $customer->gender = $user->sex == 0 ? "male" : "female";
        $customer->phone = $user->phone;
        $customer->account_iban = $user->iban;
        $customer->account_bic = $user->bic;
        $customer->number = $user->number;
        $customer->birthday = $user->birthday;
        $customer->account_holder = $user->accountHolder;
        $customer->tax_number= $user->taxnumber;
        $customer->is_turnover_tax_subject = $user->turnover_tax;
        $customer->save();
        return $customer;
    }

    private function importDocuments($user, $legacyDocument) {
        $document = new Document();
        $document->folder = "";
        $document->company = "";
        $document->is_visible = true;
        $document->is_sos = false;
        $document->is_tax_relevant = false;
        $document->is_encrypted = false;
        $document->is_machine_readable = false;
        $document->customer_id = $user->id;
        $document->name = $legacyDocument->filename;
        $document->tags = "[".$legacyDocument->tags."]";
        $document->is_sos = $legacyDocument->is_sos;
        $document->is_favorite = $legacyDocument->is_favorite;

        $path = Storage::putFile('documents/'.$user->id, "/usr/local/www/apache24/noexec/papierkrempel.de/web/uploads/documents/".$legacyDocument->path);
        $document->path = $path;
        $document->size = Storage::size($path);
        switch (strlen($legacyDocument->date)) {
            case 10: //02.05.2014
                $date = \DateTime::createFromFormat("d.m.Y", $legacyDocument->date);
                break;
            case 7: //05.2014
                $date = \DateTime::createFromFormat("m.Y", $legacyDocument->date);
                break;
            case 8: //3.7.2012
                $date = \DateTime::createFromFormat("j.n.Y", $legacyDocument->date);
                break;
            case 4: //2012
                $date = \DateTime::createFromFormat("Y", $legacyDocument->date);
                break;
            default:
                $date = null;
                break;
        }
        $document->date = $date;
        $document->mime_type = $legacyDocument->mime_type;
        $document->extension = $legacyDocument->extension;
        dd($document);
        $document->save();

    }

    private function findUserDocuments($user) {
        return DB::connection('mysql_legacy')->table("document")->where('customer_id', $user)->get();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::beginTransaction();
        $legacyUser = $this->findUser($this->argument('user'));
        if (!$legacyUser)
            throw new InvalidParameterException();
        $user = $this->importUser($legacyUser);
        $documents = $this->findUserDocuments($legacyUser);
        foreach ($documents as $document) {
            $this->importDocument($user, $document);
        }
        DB::commit();
    }
}
