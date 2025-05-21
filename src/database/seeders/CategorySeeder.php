<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;

class CategorySeeder extends Seeder
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

        $categories = [
            'Category 1',
            'Category 2',
            'Category 3',
            'Category 4',
        ];
        
        foreach($categories as $category_name)
        {
            $category = Category::firstOrNew([
                'name' => $category_name
            ]);

            $category->fill([
                'created_by' => $userAdmin->id
            ]);
            $category->save();

        }
    }
}
