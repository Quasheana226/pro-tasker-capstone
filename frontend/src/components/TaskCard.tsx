export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done";
    projectId: string;
    createdAt: string;
    updatedAt: string;
}

interface TaskCardProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
    onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, onStatusChange, onDelete }: TaskCardProps) => (
    <div className="bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-xl p-4 group transition cursor-default">
        <p className="text-sm font-medium text-white leading-snug">{task.title}</p>
        {task.description && (
            <p className="text-xs text-white/40 mt-1 leading-relaxed">{task.description}</p>
        )}

        <div className="mt-3 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition">
            {task.status === "To Do" && (
                <button
                    onClick={() => onStatusChange(task._id, "In Progress")}
                    className="text-[10px] text-white/40 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-2 py-0.5 transition"
                >
                    → In Progress
                </button>
            )}
            {task.status === "In Progress" && (
                <button
                    onClick={() => onStatusChange(task._id, "Done")}
                    className="text-[10px] text-white/40 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-2 py-0.5 transition"
                >
                    → Done
                </button>
            )}
            {task.status !== "To Do" && (
                <button
                    onClick={() => onDelete(task._id)}
                    className="text-[10px] text-red-400/50 hover:text-red-400 border border-red-500/10 hover:border-red-500/40 rounded-md px-2 py-0.5 transition ml-auto"
                >
                    Delete
                </button>
            )}
        </div>
    </div>
);

export default TaskCard;
