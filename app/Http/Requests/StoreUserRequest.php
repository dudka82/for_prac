<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Или проверка прав доступа
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'phone' => 'required|string|max:12',
           
        ];
    }
    
    public function messages()
    {
        return [
            'name.required' => 'Поле имени обязательно для заполнения',
            'email.unique' => 'Этот email уже занят'
        ];
    }
    
    public function attributes()
    {
        return [
            'password' => 'пароль'
        ];
    }
}
