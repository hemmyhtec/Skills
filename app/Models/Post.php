<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Laravel\Passport\HasApiTokens;

class Post extends Model
{
    use HasApiTokens, HasFactory;
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'productsname',
        'description',
        'prize',
        'offerclose',
        'photo',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
