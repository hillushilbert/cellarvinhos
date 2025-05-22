<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    //

    public function create(Request $request)
    {
        $categories = Category::get();
        return view('admin.tickets.create',compact('categories'));
    }
}
