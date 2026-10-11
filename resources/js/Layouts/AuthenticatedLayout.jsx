import { Link, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function Flash() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(true);
    const msg = flash?.success || flash?.error;
    useEffect(() => {
        setShow(true);
        const t = setTimeout(() => setShow(false), 4000);
        return () => clearTimeout(t);
    }, [msg]);
    if (!msg || !show) return null;
    const color = flash.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    return (
        <div className={`mx-auto mt-4 flex max-w-5xl justify-between rounded px-4 py-3 ${color}`}>
            <span>{msg}</span>
            <button onClick={() => setShow(false)}>×</button>
        </div>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3">
                    <Link href={route('dashboard')} className="font-semibold">Dashboard</Link>
                    <Link href={route('tickets.index')} className="font-semibold">Tickets</Link>
                    <Link href={route('tickets.create')} className="rounded bg-indigo-600 px-3 py-1 text-white">New Ticket</Link>
                    <span className="ml-auto text-gray-600">{auth.user.name}</span>
                    <button onClick={() => router.post(route('logout'))} className="text-red-600">Logout</button>
                </div>
            </nav>
            <Flash />
            {header && <header className="mx-auto max-w-5xl px-4 pt-6 text-xl font-bold">{header}</header>}
            <main className="mx-auto max-w-5xl p-4">{children}</main>
        </div>
    );
}
