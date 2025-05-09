@extends('layouts.app')

@section('content')
    <h1>Themes</h1>
    
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <a href="{{ route('themes.create') }}" class="btn btn-primary">Create New Theme</a>
    
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Active</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($themes as $theme)
                <tr>
                    <td>{{ $theme->name }}</td>
                    <td>{{ $theme->description }}</td>
                    <td>{{ $theme->active ? 'Yes' : 'No' }}</td>
                    <td>
                        <a href="{{ route('themes.show', $theme) }}" class="btn btn-info">View</a>
                        <a href="{{ route('themes.edit', $theme) }}" class="btn btn-warning">Edit</a>
                        <form action="{{ route('themes.destroy', $theme) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection