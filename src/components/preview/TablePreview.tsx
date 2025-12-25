import { type DesignStyle } from '@/lib/designStyles';
import { MoreHorizontal, ArrowUpDown, Filter, Search, Download, Trash2, Edit2, Copy, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface TablePreviewProps {
    style: DesignStyle;
    cardStyle: string;
}

export function TablePreview({ style, cardStyle }: TablePreviewProps) {
    const data = [
        { id: 'TASK-8721', title: 'Implement new auth flow', status: 'In Progress', priority: 'High', assignee: 'Alex M.', due: 'Dec 12' },
        { id: 'TASK-8722', title: 'Refactor mobile navigation', status: 'Done', priority: 'Medium', assignee: 'Sarah J.', due: 'Dec 10' },
        { id: 'TASK-8723', title: 'Update documentation', status: 'Review', priority: 'Low', assignee: 'Mike T.', due: 'Dec 14' },
        { id: 'TASK-8724', title: 'Fix layout shifts on load', status: 'In Progress', priority: 'Critical', assignee: 'Alex M.', due: 'Dec 11' },
        { id: 'TASK-8725', title: 'Optimize image assets', status: 'Todo', priority: 'Medium', assignee: 'Anna K.', due: 'Dec 15' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Done': return style.colors.success;
            case 'Review': return style.colors.accent;
            case 'In Progress': return style.colors.primary;
            case 'Critical': return style.colors.error;
            default: return style.colors.mutedForeground;
        }
    };

    return (
        <div className="mt-20 border-t border-border/30 pt-20 animate-fade-in">
            <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ fontFamily: style.fonts.heading }}>
                    System Logs
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Live Data Stream</p>
            </div>

            <div
                className={`${cardStyle} overflow-hidden`}
                style={{
                    backgroundColor: `hsl(${style.colors.surface})`,
                    borderRadius: style.radius
                }}
            >
                {/* Table Toolbar */}
                <div className="p-4 border-b border-border/50 flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                        <input
                            type="text"
                            placeholder="Filter tasks..."
                            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            style={{ borderRadius: style.radius }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border/50 hover:bg-muted transition-colors text-xs font-medium rounded-lg">
                            <Filter className="w-3 h-3" /> Filter
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-muted/50 border border-border/50 hover:bg-muted transition-colors text-xs font-medium rounded-lg">
                            <Download className="w-3 h-3" /> Export
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 border-b border-border/50 text-xs uppercase font-black tracking-wider opacity-60">
                            <tr>
                                <th className="p-4 w-12"><input type="checkbox" className="rounded border-border" /></th>
                                <th className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">Task ID <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Assignee</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {data.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className="group hover:bg-muted/20 transition-colors"
                                >
                                    <td className="p-4"><input type="checkbox" className="rounded border-border" /></td>
                                    <td className="p-4 font-mono text-xs opacity-60">{row.id}</td>
                                    <td className="p-4 font-medium">{row.title}</td>
                                    <td className="p-4">
                                        <span
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-transparent"
                                            style={{
                                                backgroundColor: `hsl(${getStatusColor(row.status)} / 0.1)`,
                                                color: `hsl(${getStatusColor(row.status)})`,
                                                borderColor: `hsl(${getStatusColor(row.status)} / 0.2)`
                                            }}
                                        >
                                            {row.status === 'Done' && <CheckCircle2 className="w-3 h-3" />}
                                            {row.status === 'Critical' && <AlertCircle className="w-3 h-3" />}
                                            {row.status === 'In Progress' && <Clock className="w-3 h-3" />}
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`text-xs font-medium ${row.priority === 'Critical' ? 'text-error font-bold' :
                                                    row.priority === 'High' ? 'text-warning' :
                                                        'text-muted-foreground'
                                                }`}
                                            style={{ color: row.priority === 'Critical' ? `hsl(${style.colors.error})` : undefined }}
                                        >
                                            {row.priority}
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                            {row.assignee.charAt(0)}
                                        </div>
                                        {row.assignee}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-md transition-colors" title="Edit">
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                            <button className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-md transition-colors" title="Duplicate">
                                                <Copy className="w-3 h-3" />
                                            </button>
                                            <button className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors" title="Delete">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-border/50 flex items-center justify-between text-xs opacity-60">
                    <span>Showing 1-5 of 24 tasks</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-muted/50 rounded hover:bg-muted transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 bg-muted/50 rounded hover:bg-muted transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
