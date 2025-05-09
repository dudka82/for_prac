@extends('layouts.app')

@section('content')
    <h1>Create New Meeting</h1>

    <form action="{{ route('meetings.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="place">Place:</label>
            <input type="text" name="place" id="place" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="date">Date:</label>
            <input type="date" name="date" id="date" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="time">Time:</label>
            <input type="time" name="time" id="time" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="description">Description:</label>
            <textarea name="description" id="description" class="form-control" rows="3"></textarea>
        </div>

        <div class="form-group">
            <label for="theme_id">Theme:</label>
            <select name="theme_id" id="theme_id" class="form-control" required>
                @foreach($themes as $theme)
                    <option value="{{ $theme->id }}">{{ $theme->name }}</option>
                @endforeach
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Create Meeting</button>
    </form>
@endsection