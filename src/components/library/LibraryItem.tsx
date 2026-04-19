// // src/components/library/LibraryItem.tsx

// export default function LibraryItem({
//   job,
//   onOpen,
// }: {
//   job: any;
//   onOpen: (id: string) => void;
// }) {
//   return (
//     <div
//       onClick={() => onOpen(job.id)}
//       className="p-3 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
//     >
//       <div className="text-sm font-medium truncate">{job.url}</div>

//       <div className="text-xs text-white/40">{job.status}</div>
//     </div>
//   );
// }

export default function LibraryItem({ job }: { job: any }) {
  return (
    <div className="p-3 rounded bg-white/5 hover:bg-white/10 cursor-pointer">
      <div className="text-sm font-medium truncate">{job.url}</div>

      <div className="text-xs text-white/40 mt-1">
        {job.status === "completed" ? "Completed" : "Processing"}
      </div>
    </div>
  );
}
