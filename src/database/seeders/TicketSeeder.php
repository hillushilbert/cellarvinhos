<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Ticket;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $userAdmin = User::where('email','admin@cellarvinhos.com.br')->first();
        
        if(!$userAdmin)
        return;

        $tickets = [
            [
                'title' => 'Ticket 1',
                'description' => 'Description ticket 1',
                'status' => 'resolvido',
                'category' => 'Category 1'
            ],
            [
                'title' => 'Ticket 2',
                'description' => 'Description ticket 2',
                'status' => 'em progresso',
                'category' => 'Category 2'
            ]
        ];
        
        Ticket::truncate();
        foreach($tickets as $aTicket)
        {
            $category = Category::where(['name' => $aTicket['category']])->first();
            $aTicket = array_merge($aTicket, [
                'category_id' => $category->id,
                'created_by' => $userAdmin->id
            ]);
            unset($aTicket['category']);
            Ticket::create($aTicket);

        }
    }
}
