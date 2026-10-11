<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class TicketController extends Controller
{
    use AuthorizesRequests;

    private function options(): array
    {
        return ['priorities' => Ticket::PRIORITIES, 'statuses' => Ticket::STATUSES, 'categories' => Ticket::CATEGORIES];
    }

    public function index()
    {
        $tickets = Ticket::where('user_id', auth()->id())->latest()->paginate(10);
        return Inertia::render('Tickets/Index', ['tickets' => $tickets]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create', $this->options());
    }

    public function store(StoreTicketRequest $request)
    {
        $ticket = new Ticket($request->validated());
        $ticket->user_id = auth()->id();
        $ticket->save();
        return redirect()->route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);
        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        return Inertia::render('Tickets/Edit', ['ticket' => $ticket] + $this->options());
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        $ticket->update($request->validated());
        return redirect()->route('tickets.index')->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket)
    {
        $this->authorize('delete', $ticket);
        $ticket->delete();
        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }
}
