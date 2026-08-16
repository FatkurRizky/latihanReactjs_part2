import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function CustomAlertModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Notifikasi", 
  message = "", 
  type = "info", // "success" | "warning" | "error" | "info" | "confirm"
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal"
}) {
  if (!isOpen) return null;

  const isConfirm = type === "confirm";

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-8 h-8 text-emerald-400" />;
      case "warning":
      case "confirm":
        return <AlertTriangle className="w-8 h-8 text-amber-400" />;
      case "error":
        return <XCircle className="w-8 h-8 text-rose-400" />;
      default:
        return <Info className="w-8 h-8 text-indigo-400" />;
    }
  };

  const getBadgeStyle = () => {
    switch (type) {
      case "success":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
      case "warning":
      case "confirm":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
      case "error":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]";
      default:
        return "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 transition-all duration-300">
      <div className="bg-[#121215] border border-zinc-800 p-6 rounded-2xl w-full max-w-sm text-center shadow-2xl relative overflow-hidden transform transition-all scale-100">
        
        {/* Glow Ambient Effect */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3.5 right-3.5 text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
        >
          <X size={16} />
        </button>

        {/* Icon Circle */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${getBadgeStyle()}`}>
          {getIcon()}
        </div>

        {/* Title & Message */}
        <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed px-2">{message}</p>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-6 pt-2">
          {isConfirm && (
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 rounded-xl text-xs transition border border-zinc-700"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={() => {
              if (isConfirm && onConfirm) {
                onConfirm();
              }
              onClose();
            }}
            className={`flex-1 font-bold py-2.5 rounded-xl text-xs transition shadow-lg ${
              type === "error" 
                ? "bg-rose-600 hover:bg-rose-500 text-white" 
                : isConfirm 
                ? "bg-amber-500 hover:bg-amber-400 text-zinc-950" 
                : "bg-white hover:bg-zinc-200 text-zinc-950"
            }`}
          >
            {isConfirm ? confirmText : "Mengerti"}
          </button>
        </div>

      </div>
    </div>
  );
}
