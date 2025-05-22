<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    //

    public function index(Request $request)
    {
        $status = [
            ''
        ];

        return Inertia::render('Ticket/Index', [
            'status' => $status,
            'filter' => $request->all(),
        ]);
    }
}
