<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    //

    public function index(Request $request)
    {
        Log::info(__METHOD__);
        $categories = Category::paginate(25);
        return response()->json($categories,200);
    }

    public function show(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category,200);
    }

    public function store(CategoryStoreRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $category = Category::create($data);

        return response()->json($category,201);
    }

    public function update(CategoryUpdateRequest $request, $id)
    {
       $data = $request->validated();
       $category = Category::findOrFail($id);
       $category->update($data);

       return response()->json($category,200);
    }

    public function destroy(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        if($category->tickets()->exists()){
            return response()->json(['errors'=>['Esta categoria não pode ser removida pois existem tickets associados']],422);
        }
       
        Category::destroy($id);
        return response()->json(null,204);
    }
}
