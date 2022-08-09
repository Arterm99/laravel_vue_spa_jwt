<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::where('email', $data['email'])->first();

        // Проверка на дублирование email
        if ($user) {
            return response(['error' => 'User with this email already exists'], 403);
        }

        $user = User::create($data);

        // При регистрации добавляем пользователю Токен
        $token = auth()->tokenById($user->id);
        return response(['access_token' => $token]);
    }
}
