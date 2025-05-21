<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\TicketStoreRequest;
use App\Http\Requests\TicketUpdateRequest;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    //

    public function index(Request $request)
    {
        $build = new Ticket();
        
        if($request->input('category_id')){
            $build = $build->where('category_id',$request->category_id);
        }
        
        if($request->input('status')){
            $build = $build->where('status',$request->status);
        }

        $tickets = $build->paginate(25);

        return response()->json($tickets,200);
    }

    public function show(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        return response()->json($ticket,200);
    }

    public function store(TicketStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $ticket = Ticket::create($data);

        return response()->json($ticket,201);
    }

    public function update(TicketUpdateRequest $request, $id)
    {
       $data = $request->validated();
       $ticket = Ticket::findOrFail($id);
       $ticket->update($data);

       return response()->json($ticket,200);
    }

    public function destroy(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
       
        Ticket::destroy($id);
        return response()->json(null,204);
    }
}
