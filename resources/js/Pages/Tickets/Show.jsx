import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import { Head, Link } from '@inertiajs/react';

export default function Show({ ticket }) {
    return (
        <AuthenticatedLayout header={ticket.title}>
            <Head title={ticket.title} />
            <div className="rounded bg-white p-6 shadow">
                <div className="mb-3 flex gap-2">
                    <Badge value={ticket.priority} /><Badge value={ticket.status} />
                    <span className="text-sm text-gray-500">{ticket.category}</span>
                </div>
                <p className="whitespace-pre-wrap">{ticket.description}</p>
                <div className="mt-4 flex gap-4">
                    <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600">Edit</Link>
                    <Link href={route('tickets.index')} className="text-gray-600">Back</Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
