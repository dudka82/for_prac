<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id(); 
            $table->string('place');
            $table->date('date');
            $table->time('time'); 
            $table->string('name');
            $table->integer('available_seats');
            $table->text('description')->nullable(); 
            $table->foreignId('theme_id')->constrained()->onDelete('cascade'); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('meetings');
    }
};