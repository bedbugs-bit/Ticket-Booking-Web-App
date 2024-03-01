<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['event_id', 'user_email', 'number_of_tickets', 'booking_reference'];

    public function eventType()
    {
        return $this->belongsTo(EventType::class);
    }
}
