<?php

namespace Tests\Unit;

use App\Models\Ticket;
use PHPUnit\Framework\TestCase;

class TicketTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }

    public function test_invalid_ticket_status(): void
    {
        $ticket = new Ticket();
        try{
            $ticket->changeStatus('abacaxi');
            $this->fail('Validação de enum não funcionou');
        }catch(\Exception $e){
            $this->assertEquals('Status é invalido!',$e->getMessage());
        }

    }

    public function test_valid_ticket_status(): void
    {
        $ticket = new Ticket();
        try{
            $ticket->changeStatus('resolvido');
            $this->assertTrue(true);
        }catch(\Exception $e){
            $this->fail($e->getMessage());
        }

    }
}
