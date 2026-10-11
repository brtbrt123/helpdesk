<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();
            $t->string('title', 255);
            $t->text('description');
            $t->string('priority');
            $t->string('status')->default('Open');
            $t->string('category');
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('tickets'); }
};
