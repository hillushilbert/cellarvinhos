<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //

    public function index(Request $request)
    {
        $categories = Category::paginate(25);
        return response()->json($categories,200);
    }

    public function show(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category,200);
    }
}
