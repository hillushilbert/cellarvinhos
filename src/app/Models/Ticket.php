<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    //
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'category_id',
        'created_by',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class,'created_by','id');
    }
}
