function Field({ label, error, children }) {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
const input = 'w-full rounded border-gray-300';

export default function TicketForm({ form, onSubmit, options, submitLabel }) {
    const { data, setData, errors, processing } = form;
    const select = (name, list) => (
        <select className={input} value={data[name]} onChange={(e) => setData(name, e.target.value)}>
            <option value="">Select...</option>
            {list.map((v) => <option key={v}>{v}</option>)}
        </select>
    );
    return (
        <form onSubmit={onSubmit} className="rounded bg-white p-6 shadow">
            <Field label="Title" error={errors.title}>
                <input className={input} value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </Field>
            <Field label="Description" error={errors.description}>
                <textarea rows="4" className={input} value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </Field>
            <Field label="Priority" error={errors.priority}>{select('priority', options.priorities)}</Field>
            <Field label="Status" error={errors.status}>{select('status', options.statuses)}</Field>
            <Field label="Category" error={errors.category}>{select('category', options.categories)}</Field>
            <button disabled={processing} className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50">
                {processing ? 'Saving...' : submitLabel}
            </button>
        </form>
    );
}
