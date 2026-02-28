<?php

namespace App\Policies;

use App\Models\User;

class EnquiryPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewAny(User $user): bool { 
        return $user->hasRole('super-admin'); 
    } 
    
    public function create(User $user): bool { 
        return $user->hasRole('user'); 
    }
}
