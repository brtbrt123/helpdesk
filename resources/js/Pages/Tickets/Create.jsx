import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, useForm } from '@inertiajs/react';

export default function Create(options) {
    const form = useForm({ title: '', description: '', priority: '', status: 'Open', category: '' });
    return (
        <AuthenticatedLayout header="New Ticket">
            <Head title="New Ticket" />
            <TicketForm form={form} options={options} submitLabel="Create"
                onSubmit={(e) => { e.preventDefault(); form.post(route('tickets.store')); }} />
        </AuthenticatedLayout>
    );
}
