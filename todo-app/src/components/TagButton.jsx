export default function TagButton({ tag }) {
    return (
        <span className="bg-slate-600 hover:bg-slate-900 text-white font-bold px-2 py-1 m-1 rounded-2">
            {tag}
        </span>
    )
}