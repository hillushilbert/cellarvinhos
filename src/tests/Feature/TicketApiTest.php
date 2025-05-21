<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TicketApiTest extends TestCase
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
    public function test_list_all_tickets(): void
    {
        
        $headers = [
            "Accept" => "application/json"
        ];
        $response = $this->actingAs($this->user)->get('/api/tickets',$headers);
        $response->assertStatus(200);

    }

    /**
     * testando retorno da primeira categoria
     */
    public function test_list_one_ticket(): void
    {
        $headers = [
            "Accept" => "application/json"
        ];
        $category_id = Category::min('id');

        $ticket = Ticket::create([
            'title' => 'Ticket test',
            'description' => 'Ticket test',
            'category_id' => $category_id,
            'created_by' => $this->user->id,
        ]);

        $response = $this->actingAs($this->user)->get("/api/tickets/{$ticket->id}",$headers);

        $response->assertStatus(200);
        $response->assertSee('Ticket test');
    }

    public function test_update_ticket(): void
    {
        $data = [
            'title' => 'Editing ticket title',
            'status' => 'resolvido'
        ];

        $category_id = Category::min('id');
        $ticket = Ticket::create([
            'title' => 'Ticket test',
            'description' => 'Ticket test',
            'category_id' => $category_id,
            'created_by' => $this->user->id,
        ]);

        $response = $this->actingAs($this->user)->putJson("/api/tickets/{$ticket->id}",$data);

        $response->assertStatus(200);
        $response->assertSee('Editing ticket title');
    }

    public function test_delete_ticket(): void
    {
        $category_id = Category::min('id');
        $ticket = Ticket::create([
            'title' => 'Ticket test',
            'description' => 'Ticket test',
            'category_id' => $category_id,
            'created_by' => $this->user->id,
        ]);

        $response = $this->actingAs($this->user)->deleteJson("/api/tickets/{$ticket->id}");

        $response->assertStatus(204);
    }
    
}
