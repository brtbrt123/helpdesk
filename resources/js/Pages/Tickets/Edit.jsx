import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ ticket, ...options }) {
    const form = useForm({
        title: ticket.title, description: ticket.description,
        priority: ticket.priority, status: ticket.status, category: ticket.category,
    });
    return (
        <AuthenticatedLayout header="Edit Ticket">
            <Head title="Edit Ticket" />
            <TicketForm form={form} options={options} submitLabel="Update"
                onSubmit={(e) => { e.preventDefault(); form.put(route('tickets.update', ticket.id)); }} />
        </AuthenticatedLayout>
    );
}
