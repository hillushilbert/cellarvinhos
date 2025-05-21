<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Ticket extends Model
{
    const statusList = [
        'em aberto',
        'em progresso',
        'resolvido'
    ];
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

    /**
     * Set the user's first name.
     *
     * @param  string  $value
     * @return void
     */
    public function changeStatus($value)
    {
        if(!in_array($value,Ticket::statusList)){
            throw new \Exception("Status é invalido!");
        }
        $this->status = $value;
    }
}
