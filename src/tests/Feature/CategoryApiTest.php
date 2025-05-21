<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user; 
    public function setUp(): void
    {
        parent::setUp();
        $this->seed();
        $this->user = User::first();
    }
    
    /**
     * Teste do retorno da lista de categorias
     */
    public function test_list_all_categories(): void
    {
        
        $headers = [
            "Accept" => "application/json"
        ];
        $response = $this->actingAs($this->user)->get('/api/categories',$headers);
        $response->assertStatus(200);
        $response->assertSee('Category 1');
        $response->assertSee('Category 1');
        $this->assertEquals(4,count($response->json()['data']));
    }

    /**
     * testando retorno da primeira categoria
     */
    public function test_list_one_category(): void
    {
        $headers = [
            "Accept" => "application/json"
        ];
        $id = Category::min('id');
        $response = $this->actingAs($this->user)->get("/api/categories/{$id}",$headers);

        $response->assertStatus(200);
        $response->assertSee('Category 1');
    }

    public function test_update_category(): void
    {
        $data = [
            'name' => 'Editing Category'
        ];

        $category = Category::latest()->first();
        $response = $this->actingAs($this->user)->putJson("/api/categories/{$category->id}",$data);

        $response->assertStatus(200);
        $response->assertSee('Editing Category');
    }

    public function test_delete_category(): void
    {
        $category = Category::latest()->first();
        $response = $this->actingAs($this->user)->deleteJson("/api/categories/{$category->id}");

        $response->assertStatus(204);
    }

    public function test_cant_delete_category(): void
    {
        $category = Category::create([
            'name' => 'Dont Remove Category',
            'created_by' => $this->user->id
        ]);

        Ticket::create([
            'title' => 'Ticket test',
            'description' => 'Ticket test',
            'category_id' => $category->id,
            'created_by' => $this->user->id,
        ]);

        $response = $this->actingAs($this->user)->deleteJson("/api/categories/{$category->id}");

        $response->assertStatus(422);
    }
}
