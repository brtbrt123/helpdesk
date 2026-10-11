const colors = {
    Low: 'bg-gray-200 text-gray-800', Medium: 'bg-blue-100 text-blue-800',
    High: 'bg-orange-100 text-orange-800', Urgent: 'bg-red-100 text-red-800',
    Open: 'bg-green-100 text-green-800', 'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-purple-100 text-purple-800', Closed: 'bg-gray-300 text-gray-700',
};
export default function Badge({ value }) {
    return <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[value]}`}>{value}</span>;
}
