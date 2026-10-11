import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ tickets }) {
    const remove = (id) => {
        if (confirm('Delete this ticket?')) router.delete(route('tickets.destroy', id));
    };
    return (
        <AuthenticatedLayout header="My Tickets">
            <Head title="Tickets" />
            {tickets.data.length === 0 ? (
                <div className="rounded bg-white p-10 text-center shadow">
                    <p className="mb-3 text-gray-600">You have no tickets yet.</p>
                    <Link href={route('tickets.create')} className="text-indigo-600">Create your first ticket</Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {tickets.data.map((t) => (
                        <div key={t.id} className="flex flex-col gap-2 rounded bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <Link href={route('tickets.show', t.id)} className="font-semibold text-indigo-700">{t.title}</Link>
                                <div className="mt-1 flex gap-2"><Badge value={t.priority} /><Badge value={t.status} />
                                    <span className="text-sm text-gray-500">{t.category}</span></div>
                            </div>
                            <div className="flex gap-3 text-sm">
                                <Link href={route('tickets.edit', t.id)} className="text-indigo-600">Edit</Link>
                                <button onClick={() => remove(t.id)} className="text-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {tickets.links.map((l, i) => (
                            <Link key={i} href={l.url || '#'} preserveScroll
                                className={`rounded px-3 py-1 text-sm ${l.active ? 'bg-indigo-600 text-white' : 'bg-white'} ${!l.url && 'opacity-40'}`}
                               >{l.label.replace('&laquo;', '«').replace('&raquo;', '»')}</Link>
                        ))}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
